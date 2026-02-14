import { useRef } from 'react'

const HEARTS = ['💕', '💗', '💖', '💓', '♥', '❤️', '💘', '💝', '🌸', '✨']

function randomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

export default function FloatingHearts() {
    const items = useRef(
        Array.from({ length: 20 }, (_, i) => ({
            id: i,
            emoji: randomItem(HEARTS),
            left: `${Math.random() * 100}%`,
            fontSize: `${10 + Math.random() * 18}px`,
            duration: `${10 + Math.random() * 15}s`,
            delay: `${Math.random() * 12}s`,
        }))
    ).current

    return (
        <div className="hearts-bg">
            {items.map((h) => (
                <span
                    key={h.id}
                    className="floating-heart"
                    style={{
                        left: h.left,
                        fontSize: h.fontSize,
                        animationDuration: h.duration,
                        animationDelay: h.delay,
                    }}
                >
                    {h.emoji}
                </span>
            ))}
        </div>
    )
}
