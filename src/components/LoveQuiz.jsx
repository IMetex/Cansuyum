import { useMemo, useState } from 'react'

const QUESTIONS = [
    {
        question: 'Beni en hızlı “aşk moduna” sokan şey ne? 💘',
        options: ['Sarılman', 'Gözlerimin içine bakman', 'Tatlı bir mesaj atman', 'Alnımdan öpmen'],
        correct: 1,
    },
    {
        question: 'Benim en sevdiğim “biz anımız” hangisi? 🥰',
        options: ['İlk buluşmamız', 'İlk sarılmamız', 'İlk uzun sohbetimiz', 'İlk “iyi geceler”imiz'],
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
        question: 'Beni en çok “benim” hissettiren cümle hangisi? 💞',
        options: ['Seni seviyorum', 'Ben buradayım', 'İyi ki varsın', 'Cansuyummmm'],
        correct: 3,
    },
    {
        question: 'Benimle ilgili en tatlı alışkanlığın hangisi? 😍',
        options: ['Beni uyandırışın', 'Üstümü örtmen', 'Saçımla oynaman', 'Durduk yere öpmen'],
        correct: 2,
    },
    {
        question: 'Bizim “imza” planımız hangisi? ✨',
        options: ['Gece yürüyüşü', 'Kafede uzun sohbet', 'Evde kahve + müzik', 'Sürpriz buluşma'],
        correct: 0,
    },
    {
        question: 'Ben seni en çok ne zaman özlüyorum? 🫶',
        options: ['Gece yatarken', 'Sabah uyanınca', 'Gün içinde bir şey görünce', 'Her an'],
        correct: 3,
    },
]

export default function LoveQuiz() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [selected, setSelected] = useState(null)
    const [score, setScore] = useState(0)

    const currentQuestion = QUESTIONS[currentIndex]
    const isDone = currentIndex >= QUESTIONS.length

    const resultText = useMemo(() => {
        if (score === QUESTIONS.length) return 'Sen bu aşk testinin efsanesiiin! 💯💘'
        if (score >= 7) return 'Aşkımızı çok iyi biliyorsun, kalbimi erittin! 🥰'
        if (score >= 4) return 'Fena değil aşkım, biraz daha romantik anı biriktirelim! 💕'
        return 'Daha çok sarılma ve daha çok “biz zamanı” lazım 😘'
    }, [score])

    const handleOptionClick = (optionIndex) => {
        if (selected !== null) return
        setSelected(optionIndex)

        if (optionIndex === currentQuestion.correct) {
            setScore((prev) => prev + 1)
        }
    }

    const handleNext = () => {
        if (selected === null) return
        setSelected(null)
        setCurrentIndex((prev) => prev + 1)
    }

    const handleRestart = () => {
        setCurrentIndex(0)
        setSelected(null)
        setScore(0)
    }

    return (
        <section className="quiz-section">
            <div className="quiz-card">
                <h2 className="quiz-title">Canlı Aşk Quizimiz 💘</h2>
                <p className="quiz-live-note">Bu bölümde canlıya alınan yeni sorular gösteriliyor ✨</p>

                {isDone ? (
                    <div className="quiz-result">
                        <p className="quiz-score">
                            Skorun: {score} / {QUESTIONS.length}
                        </p>
                        <p className="quiz-result-text">{resultText}</p>
                        <button className="quiz-next-btn" onClick={handleRestart}>Tekrar Çöz 💞</button>
                    </div>
                ) : (
                    <>
                        <p className="quiz-progress">
                            Soru {currentIndex + 1} / {QUESTIONS.length}
                        </p>
                        <p className="quiz-question">{currentQuestion.question}</p>

                        <div className="quiz-options">
                            {currentQuestion.options.map((option, index) => {
                                const isCorrect = index === currentQuestion.correct
                                const isSelected = index === selected

                                let statusClass = ''
                                if (selected !== null) {
                                    if (isCorrect) statusClass = 'correct'
                                    if (isSelected && !isCorrect) statusClass = 'wrong'
                                }

                                return (
                                    <button
                                        key={option}
                                        className={`quiz-option ${statusClass}`}
                                        onClick={() => handleOptionClick(index)}
                                    >
                                        {option}
                                    </button>
                                )
                            })}
                        </div>

                        <button className="quiz-next-btn" onClick={handleNext} disabled={selected === null}>
                            {currentIndex === QUESTIONS.length - 1 ? 'Sonucu Gör 💌' : 'Sonraki Soru ➜'}
                        </button>
                    </>
                )}
            </div>
        </section>
    )
}
