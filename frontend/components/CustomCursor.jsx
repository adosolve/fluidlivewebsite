import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e) => {
      if (
        e.target.tagName === 'A' ||
        e.target.tagName === 'BUTTON' ||
        e.target.closest('a') ||
        e.target.closest('button') ||
        e.target.classList.contains('card-hover')
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  return (
    <>
      {/* Outer Glow Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
          scale: isHovering ? 1.8 : 1,
          opacity: isHovering ? 0.8 : 0.4,
        }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 20,
          mass: 0.2
        }}
      >
        <div 
          className="w-12 h-12 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(79, 140, 255, 0.3) 0%, transparent 70%)',
            filter: 'blur(8px)',
          }}
        />
      </motion.div>

      {/* Main Cursor Circle */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.3 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          mass: 0.3
        }}
      >
        <div 
          className="w-8 h-8 rounded-full border-2 backdrop-blur-sm"
          style={{
            borderColor: isHovering ? 'rgba(79, 140, 255, 0.8)' : 'rgba(79, 140, 255, 0.5)',
            backgroundColor: isHovering ? 'rgba(79, 140, 255, 0.15)' : 'rgba(79, 140, 255, 0.08)',
          }}
        />
      </motion.div>

      {/* Center Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 600,
          damping: 30,
          mass: 0.1
        }}
      >
        <div 
          className="w-1.5 h-1.5 rounded-full"
          style={{
            backgroundColor: '#4F8CFF',
          }}
        />
      </motion.div>

      {/* Trailing Effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
        }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 25,
          mass: 0.5
        }}
      >
        <div 
          className="w-10 h-10 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(79, 140, 255, 0.15) 0%, transparent 60%)',
            filter: 'blur(6px)',
          }}
        />
      </motion.div>
    </>
  )
}
