import { useRef, useState, useEffect } from 'react'

/**
 * Wraps children in a scroll-reveal animation.
 * Children fade up and scale in when scrolled into view.
 */
export default function RevealSection({ children }) {
    const ref = useRef(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true)
                    obs.unobserve(el) // Only trigger once
                }
            },
            { threshold: 0.08 }
        )
        obs.observe(el)
        return () => obs.disconnect()
    }, [])

    return (
        <div
            ref={ref}
            className={`reveal-section ${visible ? 'revealed' : ''}`}
        >
            {children}
        </div>
    )
}
