import { useState } from 'react'

const QUESTIONS = [
    {
        question: 'Beni en hızlı “aşk moduna” sokan şey ne? 💘',
        options: ['Sarılman', 'Gözlerimin içine bakman', 'Tatlı bir mesaj atman', 'Alnımdan öpmen'],
        correct: 1,
    },
    {
        question: 'Benim en sevdiğim “biz anımız” hangisi? 🥰',
        options: ['Buluşmamız', 'Sarılmamız', 'Uzun sohbetimiz', 'İyi geceler”imiz'],
        correct: 0,
    },
    {
        question: 'Beni kıskandırmak istersen en çok hangisi işe yarar? 😏',
        options: ['Soğuk davranman', 'Başka biriyle çok gülmen', 'Geç cevap vermen', 'İlgini azaltman'],
        correct: 2,
    },
    {
        question: 'Benim “sana en çok yakışıyor” dediğim şey ne? 🌹',
        options: ['Gülüşün', 'Kokun', 'Bakışın', 'Sesin'],
        correct: 3,
    },
    {
        question: 'Bir gün boyunca sadece bir şey yapacak olsak, ben en çok ne isterim? 💑',
        options: ['Beraber yemek yapmak', 'Film + battaniye', 'Gezmek ve bol fotoğraf', 'Uzun uzun sarılmak'],
        correct: 2,
    },
    {
        question: 'Benim en sevdiğim öpücük hangisi? 💋',
        options: ['Alından', 'Yanak', 'Dudak', 'Boyundan'],
        correct: 4,
    },
    {
        question: 'Beni en çok “benim” hissettiren cümle hangisi? 💞',
        options: ['Seni seviyorumm', 'Cansuyumm', 'İyi ki varsın', 'Yavrumm'],
        correct: 2,
    },
    {
        question: 'Benimle ilgili en tatlı alışkanlığın hangisi? 😍',
        options: ['Beni uyandırışın', 'Üstümü örtmen', 'Saçımla oynaman', 'Durduk yere öpmen'],
        correct: 3,
    },
    {
        question: 'Bizim “imza” planımız hangisi? ✨',
        options: ['Gece yürüyüşü', 'Kafede uzun sohbet', 'Evde kahve + müzik', 'Sürpriz buluşma'],
        correct: 1,
    },
    {
        question: 'Ben seni en çok ne zaman özlüyorum? 🫶',
        options: ['Gece yatarken', 'Sabah uyanınca', 'Gün içinde bir şey görünce', 'Her an'],
        correct: 4,
    },
]

const WRONG_MESSAGES = [
    'Hmm, beni biraz daha tanıman lazım 😏',
    'Yanlış! Ama seni yine de seviyorum 😘',
    'Bu kadar mı tanıyorsun beni? 🤨',
    'Hayır canım, tekrar düşün! 😄',
    'Ayyy yanlış! Ceza olarak bir öpücük 💋',
]

const CORRECT_MESSAGES = [
    'Doğru! Beni çok iyi tanıyorsun 🥰',
    'Aynen öyle! Sen benim ruh eşimsin 💫',
    'Bildin Cansuyum! 💖',
    'Mükemmel! Kalplerimiz aynı atıyor 💕',
    'Harikasın! 🌹',
]

function HeartBurst() {
    const hearts = Array.from({ length: 12 }, (_, i) => {
        const angle = (i / 12) * 360
        const distance = 40 + Math.random() * 30
        const dx = Math.cos((angle * Math.PI) / 180) * distance
        const dy = Math.sin((angle * Math.PI) / 180) * distance
        return (
            <span
                key={i}
                className="quiz-heart-particle"
                style={{
                    '--dx': `${dx}px`,
                    '--dy': `${dy}px`,
                    animationDelay: `${i * 0.03}s`,
                }}
            >
                ❤️
            </span>
        )
    })
    return <div className="quiz-heart-burst">{hearts}</div>
}

export default function LoveQuiz() {
    const [currentQ, setCurrentQ] = useState(0)
    const [score, setScore] = useState(0)
    const [selected, setSelected] = useState(null)
    const [showResult, setShowResult] = useState(false)
    const [feedback, setFeedback] = useState(null) // { correct, message }
    const [finished, setFinished] = useState(false)

    const question = QUESTIONS[currentQ]

    const handleAnswer = (index) => {
        if (selected !== null) return // Çift tıklama engeli

        setSelected(index)
        const isCorrect = index === question.correct

        if (isCorrect) {
            setScore((s) => s + 1)
            setFeedback({
                correct: true,
                message: CORRECT_MESSAGES[currentQ % CORRECT_MESSAGES.length],
            })
        } else {
            setFeedback({
                correct: false,
                message: WRONG_MESSAGES[currentQ % WRONG_MESSAGES.length],
            })
        }

        setShowResult(true)

        setTimeout(() => {
            if (currentQ < QUESTIONS.length - 1) {
                setCurrentQ((q) => q + 1)
                setSelected(null)
                setShowResult(false)
                setFeedback(null)
            } else {
                setFinished(true)
            }
        }, 2200)
    }

    const getScoreMessage = () => {
        const pct = (score / QUESTIONS.length) * 100
        if (pct === 100) return { emoji: '👑', text: 'Mükemmel! Beni bir ben bilirim, bir de sen! 💕' }
        if (pct >= 80) return { emoji: '🥰', text: 'Harikasın Cansuyum! Neredeyse hepsini bildin!' }
        if (pct >= 60) return { emoji: '😊', text: 'Fena değil! Ama hâlâ öğreneceklerin var 😏' }
        if (pct >= 40) return { emoji: '🤔', text: 'Hmm biraz daha dikkatli ol bana karşı!' }
        return { emoji: '😜', text: 'Beni hiç tanımıyorsun! Ceza: 100 öpücük! 💋' }
    }

    const restart = () => {
        setCurrentQ(0)
        setScore(0)
        setSelected(null)
        setShowResult(false)
        setFeedback(null)
        setFinished(false)
    }

    if (finished) {
        const result = getScoreMessage()
        return (
            <section className="quiz-section">
                <div className="quiz-card">
                    <h2 className="quiz-heading">Sonuç 🎉</h2>
                    <div className="quiz-score-display">
                        <span className="quiz-score-emoji">{result.emoji}</span>
                        <p className="quiz-score-number">{score} / {QUESTIONS.length}</p>
                        <p className="quiz-score-text">{result.text}</p>
                    </div>
                    <button className="quiz-restart-btn" onClick={restart}>
                        Tekrar Dene 🔄
                    </button>
                </div>
            </section>
        )
    }

    return (
        <section className="quiz-section">
            <div className="quiz-card">
                <h2 className="quiz-heading">Beni Ne Kadar Tanıyorsun? 🎮</h2>
                <div className="quiz-progress">
                    <div
                        className="quiz-progress-bar"
                        style={{ width: `${((currentQ + 1) / QUESTIONS.length) * 100}%` }}
                    />
                </div>
                <p className="quiz-counter">Soru {currentQ + 1} / {QUESTIONS.length}</p>

                <div className="quiz-question">
                    <p className="quiz-question-text">{question.question}</p>
                </div>

                <div className="quiz-options">
                    {question.options.map((option, i) => (
                        <button
                            key={i}
                            className={`quiz-option ${showResult
                                ? i === question.correct
                                    ? 'correct'
                                    : i === selected
                                        ? 'wrong'
                                        : ''
                                : ''
                                } ${selected === i ? 'selected' : ''}`}
                            onClick={() => handleAnswer(i)}
                            disabled={selected !== null}
                        >
                            {option}
                        </button>
                    ))}
                </div>

                {feedback && (
                    <div className={`quiz-feedback ${feedback.correct ? 'correct' : 'wrong'}`}>
                        {feedback.correct && <HeartBurst />}
                        <p>{feedback.message}</p>
                    </div>
                )}
            </div>
        </section>
    )
}
