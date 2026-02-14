import { useState } from 'react'

const COUPONS = [
    { emoji: '🤗', title: 'Sınırsız Sarılma', desc: 'İstediğin an, istediğin yerde' },
    { emoji: '🎬', title: 'Film Gecesi', desc: 'Senin seçtiğin film + battaniye + atıştırmalık' },
    { emoji: '☕', title: 'Yatakta Kahvaltı', desc: 'Bir pazar sabahı özel hazırlanmış kahvaltı' },
    { emoji: '💆', title: 'Masaj Kuponu', desc: 'Yorgun düştüğünde rahatlatıcı bir masaj' },
    { emoji: '🌹', title: 'Sürpriz Tarih', desc: 'Hiç beklemediğin bir anda romantik buluşma' },
    { emoji: '📱', title: 'Telefon Yok Günü', desc: 'Sadece sen ve ben, telefonlar kapalı' },
]

function CouponCard({ coupon, index, onUse, used }) {
    return (
        <div
            className={`coupon-card ${used ? 'coupon-used' : ''}`}
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            <div className="coupon-left">
                <span className="coupon-emoji">{coupon.emoji}</span>
            </div>
            <div className="coupon-right">
                <h3 className="coupon-title">{coupon.title}</h3>
                <p className="coupon-desc">{coupon.desc}</p>
                <button
                    className="coupon-btn"
                    onClick={() => onUse(index)}
                    disabled={used}
                >
                    {used ? '✓ Kullanıldı' : 'Kullan'}
                </button>
            </div>
            {/* Decorative perforation line */}
            <div className="coupon-perforation" />
        </div>
    )
}

export default function LoveCoupons() {
    const [usedCoupons, setUsedCoupons] = useState(new Set())

    const handleUse = (index) => {
        setUsedCoupons(prev => {
            const next = new Set(prev)
            next.add(index)
            return next
        })
        // Haptic feedback
        if (navigator.vibrate) navigator.vibrate([30, 20, 30])
    }

    return (
        <section className="coupons-section">
            <div className="coupons-card">
                <h2 className="coupons-heading">Aşk Kuponları 🎟️</h2>
                <p className="coupons-subtitle">Her kupon bir kez kullanılabilir, sana özel!</p>
                <div className="coupons-grid">
                    {COUPONS.map((coupon, i) => (
                        <CouponCard
                            key={i}
                            coupon={coupon}
                            index={i}
                            onUse={handleUse}
                            used={usedCoupons.has(i)}
                        />
                    ))}
                </div>
                {usedCoupons.size === COUPONS.length && (
                    <p className="coupons-complete">🎉 Tüm kuponlar kullanıldı! Ama aşkım sınırsız… 💕</p>
                )}
            </div>
        </section>
    )
}
