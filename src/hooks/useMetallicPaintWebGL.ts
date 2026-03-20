import { useEffect, useState, useRef, RefObject } from 'react'

export type ShaderParams = {
  patternScale: number
  refraction: number
  edge: number
  patternBlur: number
  liquid: number
  speed: number
}

function createShader(gl: WebGL2RenderingContext, sourceCode: string, type: number) {
  const shader = gl.createShader(type)
  if (!shader) {
    return null
  }

  gl.shaderSource(shader, sourceCode)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }

  return shader
}

function getUniforms(program: WebGLProgram, gl: WebGL2RenderingContext) {
  let uniforms: Record<string, WebGLUniformLocation> = {}
  let uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS)
  for (let i = 0; i < uniformCount; i++) {
    let uniformName = gl.getActiveUniform(program, i)?.name
    if (!uniformName) continue
    uniforms[uniformName] = gl.getUniformLocation(program, uniformName) as WebGLUniformLocation
  }
  return uniforms
}

export function useMetallicPaintWebGL(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  imageData: ImageData | null | undefined,
  params: ShaderParams,
  vertexShaderSource: string,
  liquidFragSource: string
) {
  const [gl, setGl] = useState<WebGL2RenderingContext | null>(null)
  const [uniforms, setUniforms] = useState<Record<string, WebGLUniformLocation>>({})
  const totalAnimationTime = useRef(0)
  const lastRenderTime = useRef(0)

  useEffect(() => {
    function initShader() {
      const canvas = canvasRef.current
      const gl = canvas?.getContext('webgl2', {
        antialias: true,
        alpha: true
      })
      if (!canvas || !gl) {
        return
      }

      const vertexShader = createShader(gl, vertexShaderSource, gl.VERTEX_SHADER)
      const fragmentShader = createShader(gl, liquidFragSource, gl.FRAGMENT_SHADER)
      const program = gl.createProgram()
      if (!program || !vertexShader || !fragmentShader) {
        return
      }

      gl.attachShader(program, vertexShader)
      gl.attachShader(program, fragmentShader)
      gl.linkProgram(program)

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(program))
        return null
      }

      const programUniforms = getUniforms(program, gl)
      setUniforms(programUniforms)

      const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])
      const vertexBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

      gl.useProgram(program)

      const positionLocation = gl.getAttribLocation(program, 'a_position')
      gl.enableVertexAttribArray(positionLocation)

      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

      setGl(gl)
    }

    initShader()
  }, [canvasRef, vertexShaderSource, liquidFragSource])

  useEffect(() => {
    if (!gl || !uniforms || Object.keys(uniforms).length === 0) return

    gl.uniform1f(uniforms.u_edge, params.edge)
    gl.uniform1f(uniforms.u_patternBlur, params.patternBlur)
    gl.uniform1f(uniforms.u_time, 0)
    gl.uniform1f(uniforms.u_patternScale, params.patternScale)
    gl.uniform1f(uniforms.u_refraction, params.refraction)
    gl.uniform1f(uniforms.u_liquid, params.liquid)
  }, [gl, params, uniforms])

  useEffect(() => {
    if (!gl || !uniforms || Object.keys(uniforms).length === 0) return

    let renderId: number

    function render(currentTime: number) {
      const deltaTime = currentTime - lastRenderTime.current
      lastRenderTime.current = currentTime

      totalAnimationTime.current += deltaTime * params.speed
      gl!.uniform1f(uniforms.u_time, totalAnimationTime.current)
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4)
      renderId = requestAnimationFrame(render)
    }

    lastRenderTime.current = performance.now()
    renderId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(renderId)
    }
  }, [gl, params.speed, uniforms])

  useEffect(() => {
    const canvasEl = canvasRef.current
    if (!canvasEl || !gl || !uniforms || Object.keys(uniforms).length === 0) return

    function resizeCanvas() {
      if (!canvasEl || !gl || !uniforms || !imageData) return
      const imgRatio = imageData.width / imageData.height
      gl.uniform1f(uniforms.u_img_ratio, imgRatio)

      const side = 1000
      canvasEl.width = side * devicePixelRatio
      canvasEl.height = side * devicePixelRatio
      gl.viewport(0, 0, canvasEl.height, canvasEl.height)
      gl.uniform1f(uniforms.u_ratio, 1)
      gl.uniform1f(uniforms.u_img_ratio, imgRatio)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [gl, uniforms, imageData, canvasRef])

  useEffect(() => {
    if (!gl || !uniforms || Object.keys(uniforms).length === 0 || !imageData) return

    const existingTexture = gl.getParameter(gl.TEXTURE_BINDING_2D)
    if (existingTexture) {
      gl.deleteTexture(existingTexture)
    }

    const imageTexture = gl.createTexture()
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, imageTexture)

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1)

    try {
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        imageData.width,
        imageData.height,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        imageData.data
      )

      gl.uniform1i(uniforms.u_image_texture, 0)
    } catch (e) {
      console.error('Error uploading texture:', e)
    }

    return () => {
      if (imageTexture) {
        gl.deleteTexture(imageTexture)
      }
    }
  }, [gl, uniforms, imageData])

  return { gl, uniforms }
}
