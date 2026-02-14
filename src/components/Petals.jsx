import { useRef } from 'react'

export default function Petals() {
    const petals = useRef(
        Array.from({ length: 10 }, (_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            width: `${6 + Math.random() * 10}px`,
            height: `${6 + Math.random() * 10}px`,
            duration: `${7 + Math.random() * 8}s`,
            delay: `${Math.random() * 8}s`,
            rotate: `${Math.random() * 360}deg`,
        }))
    ).current

    return (
        <div className="petals">
            {petals.map((p) => (
                <div
                    key={p.id}
                    className="petal"
                    style={{
                        left: p.left,
                        width: p.width,
                        height: p.height,
                        animationDuration: p.duration,
                        animationDelay: p.delay,
                        transform: `rotate(${p.rotate})`,
                    }}
                />
            ))}
        </div>
    )
}
