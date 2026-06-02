'use client'
import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const ref = useRef(null)

  useEffect(() => {
    let x = 0, y = 0
    let cx = 0, cy = 0
    let animId

    const move = (e) => { x = e.clientX; y = e.clientY }
    window.addEventListener('mousemove', move)

    const animate = () => {
      // Smooth follow with easing
      cx += (x - cx) * 0.08
      cy += (y - cy) * 0.08
      if (ref.current) {
        ref.current.style.left = cx + 'px'
        ref.current.style.top = cy + 'px'
      }
      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(animId)
    }
  }, [])

  return <div ref={ref} className="cursor-glow hidden lg:block" />
}