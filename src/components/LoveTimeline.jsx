import { useState, useEffect, useRef } from 'react'

const MILESTONES = [
    { emoji: '⚡', title: 'İlk Kıvılcım', desc: 'Sanki hep vardın… ruhumu ilk sen tamamladın.', date: '' },
    { emoji: '💫', title: 'İlk Bakış', desc: 'Zaman durdu; geriye sadece gözlerin kaldı.', date: '' },
    { emoji: '🌹', title: 'İlk Öpücük', desc: 'Kalbim ilk kez bu kadar “evet” dedi.', date: '' },
    { emoji: '❤️', title: 'Cansuyum', desc: 'Hayatıma geldin, içim yeniden yeşerdi.', date: '' },
    { emoji: '💍', title: 'Sonsuz Biz', desc: 'Bu hikâye burada başlamıyor… burada hiç bitmiyor.', date: '' }
]

function TimelineItem({ item, index, isVisible }) {
    const isLeft = index % 2 === 0

    return (
        <div
            className={`timeline-item ${isLeft ? 'left' : 'right'} ${isVisible ? 'visible' : ''}`}
            style={{ transitionDelay: `${index * 0.15}s` }}
        >
            <div className="timeline-dot">{item.emoji}</div>
            <div className="timeline-content">
                <h3 className="timeline-title">{item.title}</h3>
                <p className="timeline-desc">{item.desc}</p>
                {item.date && <span className="timeline-date">{item.date}</span>}
            </div>
        </div>
    )
}

export default function LoveTimeline() {
    const [visible, setVisible] = useState(false)
    const ref = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setVisible(true)
            },
            { threshold: 0.15 }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])

    return (
        <section className="timeline-section" ref={ref}>
            <div className="timeline-card">
                <h2 className="timeline-heading">Hikayemiz 📜</h2>
                <div className="timeline-line">
                    {MILESTONES.map((item, i) => (
                        <TimelineItem key={i} item={item} index={i} isVisible={visible} />
                    ))}
                </div>
            </div>
        </section>
    )
}
