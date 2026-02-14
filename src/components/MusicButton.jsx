import { useState, useRef, useEffect } from 'react'

const MUSIC_SRC = import.meta.env.BASE_URL + 'Cansuyum.mp3'

export default function MusicButton() {
    const [playing, setPlaying] = useState(false)
    const audioRef = useRef(null)

    useEffect(() => {
        const audio = new Audio(MUSIC_SRC)
        audio.loop = true // Otomatik döngü
        audio.volume = 0.6 // Ses seviyesi

        // Müzik bittiğinde tekrar baştan başlat (loop çalışmazsa yedek)
        audio.addEventListener('ended', () => {
            audio.currentTime = 0
            audio.play().catch(e => console.error("Replay error:", e))
        })

        // Hata yönetimi
        audio.addEventListener('error', (e) => {
            console.warn("Müzik hatası:", e)
        })

        audioRef.current = audio

        return () => {
            audio.pause()
            audio.src = ''
        }
    }, [])

    const toggle = () => {
        const audio = audioRef.current
        if (!audio) return

        if (playing) {
            // Durdurulduğunda: Pause yap ve başa sar
            audio.pause()
            audio.currentTime = 0
            setPlaying(false)
        } else {
            // Başlatıldığında: Baştan çal
            // (Eğer pause sonrası devam etmesini istersen currentTime=0 satırını kaldırabilirsin, 
            // ama isteğin "durdurulduğunda en baştan başlasın" yönündeydi)
            audio.currentTime = 0

            const playPromise = audio.play()
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        setPlaying(true)
                    })
                    .catch((error) => {
                        console.warn("Otomatik oynatma engellendi:", error)
                        setPlaying(false)
                    })
            }
        }
    }

    return (
        <button
            className={`music-btn ${playing ? 'playing' : ''}`}
            onClick={toggle}
            title={playing ? "Müziği Durdur" : "Müziği Başlat"}
        >
            {playing ? '🎵' : '🔇'}
        </button>
    )
}
