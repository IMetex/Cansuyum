import { useState, useRef } from 'react'

export default function MusicButton() {
    const [playing, setPlaying] = useState(false)
    const audioRef = useRef(null)

    const getAudio = () => {
        if (!audioRef.current) {
            const audio = new Audio(`${import.meta.env.BASE_URL}Cansuyum.mp3`)
            audio.loop = true
            audio.volume = 0.6
            audio.preload = 'auto'
            audioRef.current = audio
        }
        return audioRef.current
    }

    const toggle = async () => {
        const audio = getAudio()

        if (playing) {
            audio.pause()
            setPlaying(false)
        } else {
            try {
                audio.currentTime = 0
                await audio.play()
                setPlaying(true)
            } catch (err) {
                console.warn('Müzik çalınamadı:', err)
                setPlaying(false)
            }
        }
    }

    return (
        <button
            className={`music-btn ${playing ? 'playing' : ''}`}
            onClick={toggle}
            title={playing ? 'Müziği Durdur' : 'Müziği Başlat'}
        >
            {playing ? '🎵' : '🔇'}
        </button>
    )
}
