import { useState } from 'react'

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

const QUESTIONS = [
    {
        question: 'Beni en hızlı "aşk moduna" sokan şey ne? 💘',
        options: ['Sarılman', 'Gözlerimin içine bakman', 'Tatlı bir mesaj atman', 'Alnımdan öpmen'],
        correct: 1,
    },
    {
        question: 'Benim en sevdiğim "biz anımız" hangisi? 🥰',
        options: ['İlk buluşmamız', 'İlk sarılmamız', 'İlk uzun sohbetimiz', 'İlk "iyi geceler"imiz'],
        correct: 0,
    },
    {
        question: 'Beni kıskandırmak istersen en çok hangisi işe yarar? 😏',
        options: ['Soğuk davranman', 'Başka biriyle çok gülmen', 'Geç cevap vermen', 'İlgini azaltman'],
        correct: 2,
    },
    {
        question: 'Benim "sana en çok yakışıyor" dediğim şey ne? 🌹',
        options: ['Gülüşün', 'Kokun', 'Bakışın', 'Sesin'],
        correct: 0,
    },
    {
        question: 'Bir gün boyunca sadece bir şey yapacak olsak, ben en çok ne isterim? 💑',
        options: ['Beraber yemek yapmak', 'Film + battaniye', 'Gezmek ve bol fotoğraf', 'Uzun uzun sarılmak'],
        correct: 1,
    },
    {
        question: 'Benim en sevdiğim öpücük hangisi? 💋',
        options: ['Alından', 'Yanak', 'Dudak', 'El'],
        correct: 2,
    },
    {
        question: 'Beni en çok "benim" hissettiren cümle hangisi? 💞',
        options: ['Seni seviyorum', 'Ben buradayım', 'İyi ki varsın', 'Cansuyummmm'],
        correct: 3,
    },
    {
        question: 'Benimle ilgili en tatlı alışkanlığın hangisi? 😍',
        options: ['Beni uyandırışın', 'Üstümü örtmen', 'Saçımla oynaman', 'Durduk yere öpmen'],
        correct: 2,
    },
    {
        question: 'Bizim "imza" planımız hangisi? ✨',
        options: ['Gece yürüyüşü', 'Kafede uzun sohbet', 'Evde kahve + müzik', 'Sürpriz buluşma'],
        correct: 0,
    },
    {
        question: 'Ben seni en çok ne zaman özlüyorum? 🫶',
        options: ['Gece yatarken', 'Sabah uyanınca', 'Gün içinde bir şey görünce', 'Her an'],
        correct: 3,
    },
]

function QuizResult({ score, total, onReset }) {
    const percent = Math.round((score / total) * 100)
    let message, emoji

    if (percent === 100) {
        emoji = '💯'
        message = 'Mükemmel! Bizi çok iyi tanıyorsun Cansuyum!'
    } else if (percent >= 70) {
        emoji = '💖'
        message = 'Harika! Kalplerimiz aynı atıyor!'
    } else if (percent >= 40) {
        emoji = '💕'
        message = 'Fena değil! Ama daha çok tanışacağız...'
    } else {
        emoji = '🥰'
        message = 'Önemli olan sevgimiz, gerisini öğreniriz!'
    }

    return (
        <div className="quiz-result">
            <span className="quiz-result-emoji">{emoji}</span>
            <p className="quiz-result-score">{score} / {total}</p>
            <p className="quiz-result-message">{message}</p>
            <button className="quiz-reset-btn" onClick={onReset}>
                Tekrar Dene 🔄
            </button>
        </div>
    )
}

export default function LoveQuiz() {
    const [currentQ, setCurrentQ] = useState(0)
    const [score, setScore] = useState(0)
    const [selected, setSelected] = useState(null)
    const [feedback, setFeedback] = useState(null)
    const [finished, setFinished] = useState(false)

    const question = QUESTIONS[currentQ]

    const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)]

    const handleSelect = (index) => {
        if (selected !== null) return
        setSelected(index)

        const isCorrect = index === question.correct
        if (isCorrect) {
            setScore((s) => s + 1)
            setFeedback(pickRandom(CORRECT_MESSAGES))
        } else {
            setFeedback(pickRandom(WRONG_MESSAGES))
        }

        if (navigator.vibrate) navigator.vibrate(isCorrect ? [30, 20, 30] : 20)

        setTimeout(() => {
            if (currentQ + 1 < QUESTIONS.length) {
                setCurrentQ((q) => q + 1)
                setSelected(null)
                setFeedback(null)
            } else {
                setFinished(true)
            }
        }, 1800)
    }

    const handleReset = () => {
        setCurrentQ(0)
        setScore(0)
        setSelected(null)
        setFeedback(null)
        setFinished(false)
    }

    return (
        <section className="quiz-section">
            <div className="quiz-card">
                <h2 className="quiz-heading">Love Quiz 💘</h2>
                <p className="quiz-subtitle">Bizi ne kadar tanıyorsun?</p>

                {finished ? (
                    <QuizResult score={score} total={QUESTIONS.length} onReset={handleReset} />
                ) : (
                    <>
                        <div className="quiz-progress">
                            <div
                                className="quiz-progress-fill"
                                style={{ width: `${((currentQ) / QUESTIONS.length) * 100}%` }}
                            />
                        </div>
                        <div className="quiz-counter">{currentQ + 1} / {QUESTIONS.length}</div>

                        <div className="quiz-question-area">
                            <p className="quiz-question" key={currentQ}>{question.question}</p>
                            <div className="quiz-options">
                                {question.options.map((opt, i) => {
                                    let cls = 'quiz-option'
                                    if (selected !== null) {
                                        if (i === question.correct) cls += ' correct'
                                        else if (i === selected) cls += ' wrong'
                                    }
                                    return (
                                        <button
                                            key={i}
                                            className={cls}
                                            onClick={() => handleSelect(i)}
                                            disabled={selected !== null}
                                        >
                                            {opt}
                                        </button>
                                    )
                                })}
                            </div>
                            {feedback && (
                                <p className={`quiz-feedback ${selected !== null && selected === question.correct ? 'correct' : 'wrong'}`}>
                                    {feedback}
                                </p>
                            )}
                        </div>
                    </>
                )}
            </div>
        </section>
    )
}
