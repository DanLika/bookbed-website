#!/usr/bin/env node

/**
 * Prerender script for BookBed website.
 * Uses Puppeteer to render each route and save static HTML files
 * so that search engines and social crawlers see fully rendered content.
 *
 * Usage: node scripts/prerender.mjs
 * Run AFTER `vite build` (expects dist/ to exist).
 */

import { execSync, spawn } from 'child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const DIST = path.join(ROOT, 'dist')

// Routes to prerender — priority pages for SEO
const ROUTES = [
  '/',
  '/demo',
  '/widget',
  '/contact',
  '/about',
  '/faq',
  '/privacy',
  '/terms',
  '/docs',
  '/docs/quick-start',
]

const PORT = 4173
const BASE_URL = `http://localhost:${PORT}`

async function startPreviewServer() {
  return new Promise((resolve, reject) => {
    const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], {
      cwd: ROOT,
      stdio: ['ignore', 'pipe', 'pipe'],
    })

    let started = false
    const timeout = setTimeout(() => {
      if (!started) {
        server.kill()
        reject(new Error('Preview server failed to start within 15s'))
      }
    }, 15000)

    server.stdout.on('data', (data) => {
      const output = data.toString()
      if (output.includes('Local:') || output.includes(`${PORT}`)) {
        started = true
        clearTimeout(timeout)
        // Give server a moment to be fully ready
        setTimeout(() => resolve(server), 1000)
      }
    })

    server.stderr.on('data', (data) => {
      const output = data.toString()
      // Vite sometimes outputs to stderr
      if (output.includes('Local:') || output.includes(`${PORT}`)) {
        started = true
        clearTimeout(timeout)
        setTimeout(() => resolve(server), 1000)
      }
    })

    server.on('error', (err) => {
      clearTimeout(timeout)
      reject(err)
    })

    server.on('close', (code) => {
      if (!started) {
        clearTimeout(timeout)
        reject(new Error(`Preview server exited with code ${code}`))
      }
    })
  })
}

async function prerenderRoute(browser, route) {
  const page = await browser.newPage()
  const url = `${BASE_URL}${route}`

  try {
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 })

    // Wait for React to render (the static fallback gets removed when React hydrates)
    await page.waitForFunction(
      () => {
        const root = document.getElementById('root')
        const fallback = document.getElementById('static-fallback')
        // React has rendered when fallback is removed or root has other content
        return root && (!fallback || root.children.length > 1)
      },
      { timeout: 15000 }
    )

    // Small delay to let meta tags update via usePageMeta
    await new Promise((r) => setTimeout(r, 500))

    // Get the rendered HTML
    const html = await page.content()

    // Determine output path
    const routePath = route === '/' ? '' : route
    const outputDir = path.join(DIST, routePath)
    const outputFile = path.join(outputDir, 'index.html')

    // Don't overwrite root index.html — it's the SPA fallback
    if (route === '/') {
      // For root, we overwrite since it IS the main page
      writeFileSync(outputFile, html, 'utf-8')
      console.log(`  ✓ / → dist/index.html`)
    } else {
      mkdirSync(outputDir, { recursive: true })
      writeFileSync(outputFile, html, 'utf-8')
      console.log(`  ✓ ${route} → dist${route}/index.html`)
    }
  } catch (error) {
    console.error(`  ✗ ${route} — ${error.message}`)
  } finally {
    await page.close()
  }
}

async function main() {
  // Verify dist exists
  if (!existsSync(DIST)) {
    console.error('Error: dist/ directory not found. Run `npm run build` first.')
    process.exit(1)
  }

  console.log('Starting prerender...\n')

  // Dynamically import puppeteer
  let puppeteer
  try {
    puppeteer = await import('puppeteer')
  } catch {
    console.error('Error: puppeteer not installed. Run `npm install -D puppeteer`')
    process.exit(1)
  }

  // Start preview server
  console.log('Starting preview server...')
  let server
  try {
    server = await startPreviewServer()
  } catch (error) {
    console.error(`Failed to start preview server: ${error.message}`)
    process.exit(1)
  }
  console.log(`Preview server running on port ${PORT}\n`)

  // Launch browser
  const browser = await puppeteer.default.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  console.log(`Prerendering ${ROUTES.length} routes:\n`)

  try {
    // Prerender routes sequentially to avoid overwhelming the server
    for (const route of ROUTES) {
      await prerenderRoute(browser, route)
    }
  } finally {
    await browser.close()
    server.kill()
  }

  console.log('\nPrerender complete!')
}

main().catch((error) => {
  console.error('Prerender failed:', error)
  process.exit(1)
})
