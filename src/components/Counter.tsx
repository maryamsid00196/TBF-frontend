import { useEffect, useState } from 'react'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface CounterProps {
  end: number
  suffix?: string
  duration?: number
  inView: boolean
}

export default function Counter({ end, suffix = '', duration = 2, inView }: CounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = end / (duration * 60)
    const timer = setInterval(() => {
      start += step
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [end, duration, inView])

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

export function useCounterInView() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  return { ref, inView }
}
