import { useState } from 'react'
import AuroraBG from './components/AuroraBG.jsx'
import StarField from './components/StarField.jsx'
import GlowOrbs from './components/GlowOrbs.jsx'
import FloatingHearts from './components/FloatingHearts.jsx'
import MouseTrail from './components/MouseTrail.jsx'
import MusicButton from './components/MusicButton.jsx'
import Envelope from './components/Envelope.jsx'
import LoveLetter from './components/LoveLetter.jsx'
import Constellation from './components/Constellation.jsx'
import ReasonsToLove from './components/ReasonsToLove.jsx'
import LoveTimeline from './components/LoveTimeline.jsx'
import ScratchCard from './components/ScratchCard.jsx'
import LoveQuiz from './components/LoveQuiz.jsx'
import LoveCoupons from './components/LoveCoupons.jsx'
import LoveMeter from './components/LoveMeter.jsx'
import CountdownTimer from './components/CountdownTimer.jsx'
import WishSection from './components/WishSection.jsx'
import RevealSection from './components/RevealSection.jsx'

export default function App() {
    const [phase, setPhase] = useState('envelope') // 'envelope' | 'hiding' | 'letter'

    const handleEnvelopeOpen = () => {
        setPhase('hiding')
        setTimeout(() => setPhase('letter'), 900)
    }

    return (
        <>
            <AuroraBG />
            <StarField />
            <GlowOrbs />
            <FloatingHearts />
            <MouseTrail />
            <MusicButton />

            <main className="container">
                {phase !== 'letter' && (
                    <section className={`hero ${phase === 'hiding' ? 'hiding' : ''}`}>
                        <Envelope onOpen={handleEnvelopeOpen} />
                    </section>
                )}

                {phase === 'letter' && (
                    <>
                        <RevealSection>
                            <LoveLetter />
                        </RevealSection>

                        <RevealSection>
                            <Constellation />
                        </RevealSection>

                        <RevealSection>
                            <ReasonsToLove />
                        </RevealSection>

                        <RevealSection>
                            <LoveTimeline />
                        </RevealSection>

                        <RevealSection>
                            <ScratchCard />
                        </RevealSection>

                        <RevealSection>
                            <LoveQuiz />
                        </RevealSection>

                        <RevealSection>
                            <LoveCoupons />
                        </RevealSection>

                        <RevealSection>
                            <LoveMeter />
                        </RevealSection>

                        <RevealSection>
                            <CountdownTimer />
                        </RevealSection>

                        <RevealSection>
                            <WishSection />
                        </RevealSection>
                    </>
                )}
            </main>

            {phase === 'letter' && (
                <footer className="footer">
                    <p>💕 Sonsuz Aşkla Yapıldı 💕</p>
                </footer>
            )}
        </>
    )
}
