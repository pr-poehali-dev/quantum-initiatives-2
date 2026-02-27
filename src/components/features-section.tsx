import { useEffect, useRef, useState } from "react"
import Icon from "@/components/ui/icon"

const features = [
  {
    title: "Автоматизация задач",
    description: "ИИ агент самостоятельно выполняет рутинные операции: обработка заявок, заполнение документов, отправка уведомлений — без участия человека.",
    icon: "Bot",
    badge: "Авто",
    color: "from-blue-500/20 to-blue-600/5",
    borderColor: "border-blue-500/30",
    iconColor: "text-blue-400",
    glowColor: "rgba(59,130,246,0.15)",
  },
  {
    title: "Безопасность данных",
    description: "Все данные передаются по зашифрованным каналам. Агент работает строго в рамках заданных правил и не выходит за допустимые границы.",
    icon: "ShieldCheck",
    badge: "Защита",
    color: "from-cyan-500/20 to-cyan-600/5",
    borderColor: "border-cyan-500/30",
    iconColor: "text-cyan-400",
    glowColor: "rgba(6,182,212,0.15)",
  },
  {
    title: "Интеграция с системами",
    description: "Подключаем агента к вашим CRM, ERP, мессенджерам и другим сервисам. Работает с тем, что у вас уже есть.",
    icon: "Plug",
    badge: "Интеграция",
    color: "from-indigo-500/20 to-indigo-600/5",
    borderColor: "border-indigo-500/30",
    iconColor: "text-indigo-400",
    glowColor: "rgba(99,102,241,0.15)",
  },
  {
    title: "Обучение на ходу",
    description: "Агент анализирует результаты своей работы и постоянно улучшает качество выполнения задач без дополнительной настройки.",
    icon: "BrainCircuit",
    badge: "Умный",
    color: "from-sky-500/20 to-sky-600/5",
    borderColor: "border-sky-500/30",
    iconColor: "text-sky-400",
    glowColor: "rgba(14,165,233,0.15)",
  },
  {
    title: "Многозадачность",
    description: "Один агент может вести несколько процессов параллельно: общаться с клиентами, обрабатывать данные и формировать отчёты одновременно.",
    icon: "Layers",
    badge: "24/7",
    color: "from-blue-600/20 to-blue-700/5",
    borderColor: "border-blue-600/30",
    iconColor: "text-blue-300",
    glowColor: "rgba(37,99,235,0.15)",
  },
  {
    title: "Аналитика и отчёты",
    description: "Агент собирает статистику по всем выполненным задачам и предоставляет понятные отчёты для принятия управленческих решений.",
    icon: "BarChart3",
    badge: "Отчёты",
    color: "from-cyan-600/20 to-cyan-700/5",
    borderColor: "border-cyan-600/30",
    iconColor: "text-cyan-300",
    glowColor: "rgba(8,145,178,0.15)",
  },
]

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
      }}
      className={`
        relative rounded-2xl border ${feature.borderColor} 
        bg-gradient-to-br ${feature.color}
        backdrop-blur-sm p-6 cursor-default overflow-hidden
        transition-all duration-300
        ${hovered ? "scale-[1.03] shadow-2xl" : "scale-100"}
      `}
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: `0 0 40px 8px ${feature.glowColor}`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Animated corner accent */}
      <div
        className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full bg-gradient-to-bl ${feature.color} opacity-40 transition-all duration-300 ${hovered ? "w-32 h-32 opacity-60" : ""}`}
      />

      {/* Badge */}
      <div className="flex items-start justify-between mb-5">
        <div
          className={`
            flex items-center justify-center w-12 h-12 rounded-xl
            bg-white/5 border ${feature.borderColor}
            transition-transform duration-300
            ${hovered ? "scale-110 rotate-3" : "scale-100 rotate-0"}
          `}
        >
          <Icon name={feature.icon as Parameters<typeof Icon>[0]["name"]} size={22} className={feature.iconColor} />
        </div>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${feature.borderColor} ${feature.iconColor} bg-white/5 tracking-wider uppercase`}>
          {feature.badge}
        </span>
      </div>

      {/* Text */}
      <h3 className="text-lg font-bold text-white mb-2 font-orbitron">{feature.title}</h3>
      <p className="text-sm text-white/60 leading-relaxed">{feature.description}</p>

      {/* Bottom line animation */}
      <div
        className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r ${feature.color} transition-all duration-500 ${hovered ? "w-full" : "w-0"}`}
        style={{ background: `linear-gradient(to right, transparent, ${feature.glowColor.replace("0.15", "0.8")}, transparent)` }}
      />
    </div>
  )
}

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-6 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4 font-orbitron">Что умеют наши ИИ агенты</h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
            Делают за вас то, что занимало часы — теперь за минуты и без ошибок
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}