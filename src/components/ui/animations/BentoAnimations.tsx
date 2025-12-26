import { motion } from 'framer-motion'

// Sync Animation - Rotating sync icon with pulsing circles
export const SyncAnimation = () => (
  <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
    <div className="relative w-32 h-32">
      {/* Pulsing background circles */}
      <motion.div
        className="absolute inset-0 rounded-full bg-primary/10"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Rotating sync icon */}
      <motion.svg
        className="absolute inset-0 w-full h-full text-primary"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        animate={{ rotate: 360 }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0118.8-4.3M22 12.5a10 10 0 01-18.8 4.2" />
      </motion.svg>
    </div>
  </div>
)

// Email Animation - Email envelopes flying up
export const EmailAnimation = () => (
  <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="absolute"
        initial={{ y: 100, opacity: 0, x: (i - 1) * 40 }}
        animate={{
          y: -100,
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: i * 0.8,
          ease: "easeInOut"
        }}
      >
        <svg className="w-12 h-12 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </svg>
      </motion.div>
    ))}
  </div>
)

// Before/After Manual - Stressed person with Excel chaos
export const ManualChaosAnimation = () => (
  <div className="absolute inset-0 overflow-hidden flex items-center justify-center p-8">
    {/* Frustrated person icon (center) */}
    <motion.div
      className="relative z-10"
      animate={{
        scale: [1, 1.05, 1],
        rotate: [0, -3, 3, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <svg className="w-16 h-16 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        {/* Confused face */}
        <circle cx="12" cy="12" r="10" />
        <path d="M9 9h.01M15 9h.01" strokeLinecap="round" />
        <path d="M9 15c.5-.5 1.5-1 3-1s2.5.5 3 1" strokeLinecap="round" />
      </svg>
    </motion.div>

    {/* Chaotic Excel sheets flying around */}
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-10 h-12"
        style={{
          left: `${15 + (i % 3) * 35}%`,
          top: `${10 + Math.floor(i / 3) * 40}%`,
        }}
        animate={{
          rotate: [0, 360],
          x: [0, (i % 2 === 0 ? 10 : -10)],
          y: [0, (i % 2 === 0 ? -10 : 10)],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: i * 0.3,
        }}
      >
        {/* Excel icon */}
        <svg className="w-full h-full text-red-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18.5,20H5.5V4H13V9H18.5V20M7,11H9V13H7V11M7,14H9V16H7V14M10,11H17V13H10V11M10,14H17V16H10V14Z" />
        </svg>
      </motion.div>
    ))}

    {/* "X" marks for errors */}
    {[0, 1].map((i) => (
      <motion.div
        key={`x-${i}`}
        className="absolute text-red-500 font-bold text-2xl"
        style={{
          right: `${20 + i * 40}%`,
          top: `${30 + i * 30}%`,
        }}
        animate={{
          scale: [0, 1.2, 1],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.8,
        }}
      >
        ✗
      </motion.div>
    ))}
  </div>
)

// After Automated - Happy person with organized dashboard
export const AutomatedAnimation = () => (
  <div className="absolute inset-0 overflow-hidden flex items-center justify-center p-8">
    {/* Happy person icon (center) */}
    <motion.div
      className="relative z-10"
      animate={{
        y: [0, -5, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <svg className="w-16 h-16 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        {/* Happy face */}
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" strokeLinecap="round" />
        <path d="M9 9h.01M15 9h.01" strokeLinecap="round" />
      </svg>
    </motion.div>

    {/* Organized dashboard cards appearing in sequence */}
    <div className="absolute inset-0 grid grid-cols-3 gap-2 p-6">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="bg-gradient-to-br from-emerald-400/20 to-emerald-500/20 border border-emerald-500/30 rounded-lg flex items-center justify-center relative overflow-hidden"
          initial={{ scale: 0, opacity: 0, rotateY: -90 }}
          animate={{
            scale: 1,
            opacity: 1,
            rotateY: 0,
          }}
          transition={{
            delay: i * 0.12,
            duration: 0.4,
            repeat: Infinity,
            repeatDelay: 2.5,
            ease: "backOut"
          }}
        >
          {/* Checkmark */}
          <motion.svg
            className="w-5 h-5 text-emerald-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              delay: i * 0.12 + 0.2,
              duration: 0.3,
              repeat: Infinity,
              repeatDelay: 2.5,
            }}
          >
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>

          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-200/30 to-transparent"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              delay: i * 0.12 + 0.5,
              duration: 0.8,
              repeat: Infinity,
              repeatDelay: 2.5,
            }}
          />
        </motion.div>
      ))}
    </div>

    {/* Success sparkles */}
    {[0, 1, 2].map((i) => (
      <motion.div
        key={`sparkle-${i}`}
        className="absolute text-emerald-400 text-xl"
        style={{
          left: `${25 + i * 30}%`,
          top: `${15 + (i % 2) * 60}%`,
        }}
        animate={{
          scale: [0, 1.5, 0],
          rotate: [0, 180, 360],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          delay: i * 0.5 + 1,
        }}
      >
        ✨
      </motion.div>
    ))}
  </div>
)

// Payment Animation - Card with success checkmark
export const PaymentAnimation = () => (
  <div className="absolute inset-0 flex items-center justify-center p-8">
    <div className="relative w-full max-w-[200px]">
      {/* Credit card */}
      <motion.div
        className="bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30 rounded-lg p-4 h-28"
        initial={{ y: 0 }}
        animate={{ y: [0, -5, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="h-6 bg-primary/20 rounded mb-2" />
        <div className="h-3 w-3/4 bg-primary/10 rounded" />
      </motion.div>

      {/* Success checkmark */}
      <motion.div
        className="absolute -top-3 -right-3 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{
          duration: 0.5,
          delay: 1,
          repeat: Infinity,
          repeatDelay: 2,
        }}
      >
        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </div>
  </div>
)

// Multi-Property Animation - Multiple building icons
export const MultiPropertyAnimation = () => (
  <div className="absolute inset-0 flex items-center justify-center p-6">
    <div className="grid grid-cols-3 gap-2 w-full">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="aspect-square bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30 rounded-lg flex items-center justify-center"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            delay: i * 0.1,
            duration: 0.3,
            repeat: Infinity,
            repeatDelay: 2.5,
          }}
        >
          <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
        </motion.div>
      ))}
    </div>
  </div>
)

export const BentoAnimations = {
  sync: SyncAnimation,
  email: EmailAnimation,
  manualChaos: ManualChaosAnimation,
  automated: AutomatedAnimation,
  payment: PaymentAnimation,
  multiProperty: MultiPropertyAnimation,
}
