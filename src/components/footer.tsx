import { Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black/30 border-t border-blue-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div>
            <h2 className="font-orbitron text-2xl font-bold text-white mb-2">
              Brig<span className="text-blue-400">Aide</span>
            </h2>
            <p className="text-white/50 text-sm max-w-xs">
              Автоматизация бизнес-процессов с помощью ИИ агентов
            </p>
          </div>

          {/* Email */}
          <a
            href="mailto:hello@brigaide.ru"
            className="flex items-center gap-2 text-white/60 hover:text-blue-400 transition-colors duration-200"
          >
            <Mail size={18} />
            <span className="text-sm font-geist">brigaide@yandex.ru</span>
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-blue-500/10 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-white/30 text-sm">© 2025 BrigAide. Все права защищены.</p>
          <div className="flex gap-6">
            <a href="#" className="text-white/30 hover:text-blue-400 text-sm transition-colors duration-200">
              Конфиденциальность
            </a>
            <a href="#" className="text-white/30 hover:text-blue-400 text-sm transition-colors duration-200">
              Условия использования
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}