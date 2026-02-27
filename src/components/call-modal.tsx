import { useState } from "react"
import { X, Phone, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface CallModalProps {
  open: boolean
  onClose: () => void
}

export function CallModal({ open, onClose }: CallModalProps) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [submitted, setSubmitted] = useState(false)

  if (!open) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) return
    setSubmitted(true)
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setSubmitted(false)
      setName("")
      setPhone("")
    }, 300)
  }

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center px-4"
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-md rounded-2xl border border-blue-500/30 bg-[#020d1f]/95 backdrop-blur-md p-5 sm:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: "0 0 60px rgba(59,130,246,0.15)" }}
      >
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        {!submitted ? (
          <>
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                  <Phone size={18} className="text-blue-400" />
                </div>
                <h2 className="text-xl font-bold text-white font-orbitron">Заказать звонок</h2>
              </div>
              <p className="text-white/50 text-sm">
                Оставьте контакты — перезвоним в течение 30 минут в рабочее время
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-white/60 mb-1.5 block">Ваше имя</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Алексей"
                  required
                  className="bg-white/5 border-blue-500/20 text-white placeholder:text-white/30 focus:border-blue-400 focus:ring-0"
                />
              </div>
              <div>
                <label className="text-sm text-white/60 mb-1.5 block">Номер телефона</label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7 (999) 000-00-00"
                  required
                  type="tel"
                  className="bg-white/5 border-blue-500/20 text-white placeholder:text-white/30 focus:border-blue-400 focus:ring-0"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-5 mt-2"
              >
                Перезвоните мне
              </Button>
              <p className="text-white/30 text-xs text-center">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </form>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="flex justify-center mb-4">
              <CheckCircle size={48} className="text-blue-400" />
            </div>
            <h2 className="text-xl font-bold text-white font-orbitron mb-2">Заявка принята!</h2>
            <p className="text-white/50 text-sm mb-6">
              Мы получили ваш номер и свяжемся с вами в течение 30 минут
            </p>
            <Button
              onClick={handleClose}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Отлично
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}