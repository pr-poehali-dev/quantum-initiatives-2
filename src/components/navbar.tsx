import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-[9999] bg-black/40 backdrop-blur-md border-b border-blue-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="font-orbitron text-xl font-bold text-white">
              Brig<span className="text-blue-400">Aide</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#features" className="font-geist text-white/70 hover:text-blue-400 transition-colors duration-200">
                Возможности
              </a>
              <a href="#cases" className="font-geist text-white/70 hover:text-blue-400 transition-colors duration-200">
                Кейсы
              </a>
              <a href="#faq" className="font-geist text-white/70 hover:text-blue-400 transition-colors duration-200">
                Вопросы
              </a>
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white font-geist border-0">Получить аудит</Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-blue-400 transition-colors duration-200"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/90 border-t border-blue-500/20">
              <a
                href="#features"
                className="block px-3 py-2 font-geist text-white/70 hover:text-blue-400 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Возможности
              </a>
              <a
                href="#cases"
                className="block px-3 py-2 font-geist text-white/70 hover:text-blue-400 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Кейсы
              </a>
              <a
                href="#faq"
                className="block px-3 py-2 font-geist text-white/70 hover:text-blue-400 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Вопросы
              </a>
              <div className="px-3 py-2">
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-geist border-0">
                  Получить аудит
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
