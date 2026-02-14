import { useState, useEffect } from 'react'
import Petals from './Petals.jsx'

const QUOTE = 'Seni sevmek, nefes almak gibi… Farkında bile olmadan, ama onsuz yaşayamadan.'

function TypewriterQuote() {
    const [displayed, setDisplayed] = useState('')
    const [done, setDone] = useState(false)

    useEffect(() => {
        let i = 0
        const interval = setInterval(() => {
            if (i < QUOTE.length) {
                setDisplayed(QUOTE.slice(0, i + 1))
                i++
            } else {
                setDone(true)
                clearInterval(interval)
            }
        }, 42)
        return () => clearInterval(interval)
    }, [])

    return (
        <p className="letter-quote">
            "{displayed}"
            {!done && <span className="typewriter-cursor" />}
        </p>
    )
}

export default function LoveLetter() {
    return (
        <section className="letter-section">
            <div className="letter-card">
                <div className="letter-decoration top-left">✦</div>
                <div className="letter-decoration top-right">✦</div>
                <div className="letter-decoration bottom-left">✦</div>
                <div className="letter-decoration bottom-right">✦</div>

                <div className="heart-divider"><span>♥</span></div>

                <h1 className="letter-title">
                    Sevgililer Günün<br />Kutlu Olsun<br />Cansuyum
                </h1>

                <div className="heart-divider"><span>♥</span></div>

                <TypewriterQuote />

                <div className="letter-message">
                    <p>
                        Canım Cansuyum,
                    </p>
                    <p>
                        Sen ruhuma su gibi aktın Cansuyum.
                        Sen olmadan hayat sadece var olmak,
                        seninle ise gerçekten yaşamak.
                    </p>
                    <p>
                        Gözlerine baktığımda yuva, ellerini tuttuğumda huzur buluyorum.
                        Seninle susarken bile konuşuyoruz,
                        çünkü ruhlarımız aynı dili konuşuyor.
                    </p>
                    <p>
                        Sen benim her sabah ilk düşüncem,
                        her gece son duamsın.
                        Kahvemdeki şeker, gecelerime düşen ay ışığısın.
                    </p>
                    <p>
                        Bu mektubu yazmak bile yetmez sana olan sevgimi anlatmaya.
                        Ama bil ki bu satırların arasına sakladığım her kelime,
                        kalbimin en derinden gelen bir çığlığı:
                    </p>
                    <p style={{ textAlign: 'center', fontSize: '1.15rem', color: '#f472b6', fontStyle: 'italic' }}>
                        "Seni seviyorum Cansuyum…
                        Dünden çok, yarından az.
                        Sonsuza kadar seninle,
                        son nefesime kadar aşkla." 🌹
                    </p>
                </div>

                <div className="signature">
                    <span className="heart-beat">❤️</span>
                    <p>Seni Çok Seven Aşkın</p>
                </div>
            </div>
            <Petals />
        </section>
    )
}
