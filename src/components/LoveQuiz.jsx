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
        question: 'Beni en mutlu eden hareketin hangisi? 🥰',
        options: ['Sarılman', 'Gülümsemen', 'Elimi tutman', 'Hepsi'],
        correct: 3,
    },
    {
        question: 'Sence seni en çok ne zaman seviyorum? 💕',
        options: ['Uyurken', 'Gülerken', 'Kızınca', 'Her an'],
        correct: 3,
    },
    {
        question: 'Beraber en çok ne yapmayı seviyoruz? 🎬',
        options: ['Film izlemek', 'Yürüyüş yapmak', 'Konuşmak', 'Sarılmak'],
        correct: 2,
    },
    {
        question: 'İlişkimizde en önemli şey ne? ❤️',
        options: ['Güven', 'Saygı', 'Aşk', 'Hepsi birden'],
        correct: 3,
    },
    {
        question: 'Sana ilk ne zaman aşık oldum? ⚡',
        options: ['İlk görüşte', 'İlk konuşmada', 'İlk gülüşünde', 'Hepsinde biraz biraz'],
        correct: 2,
    },
    {
        question: 'Sensiz en zor geçen an hangisi? 🥺',
        options: ['Sabahlar', 'Geceler', 'Öğlen araları', 'Her an zor'],
        correct: 3,
    },
    {
        question: 'Gelecekte beraber ne yapmak istiyorum? 🌟',
        options: ['Seyahat etmek', 'Yuva kurmak', 'Yaşlanmak', 'Hepsini seninle'],
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
