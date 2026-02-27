import { useEffect, useState } from "react"

export const Hero3DWebGL = () => {
  const titleWords = "ИИ Агенты для вашего бизнеса".split(" ")
  const subtitle = "Берём на себя рутину — продажи, документы, поддержку. Вы занимаетесь развитием, агент делает остальное."
  const [visibleWords, setVisibleWords] = useState(0)
  const [subtitleVisible, setSubtitleVisible] = useState(false)
  const [delays] = useState(() => titleWords.map(() => Math.random() * 0.07))

  useEffect(() => {
    if (visibleWords < titleWords.length) {
      const t = setTimeout(() => setVisibleWords(v => v + 1), 600)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => setSubtitleVisible(true), 800)
      return () => clearTimeout(t)
    }
  }, [visibleWords, titleWords.length])

  return (
    <div className="h-screen relative overflow-hidden bg-transparent">
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#000509] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#000509] to-transparent" />
      </div>

      <div className="h-screen uppercase items-center w-full absolute z-[60] pointer-events-none px-4 sm:px-8 md:px-10 flex justify-center flex-col">
        <div className="text-2xl sm:text-3xl md:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold font-orbitron">
          <div className="flex flex-wrap justify-center gap-x-2 sm:gap-x-3 lg:gap-x-6 overflow-hidden text-white">
            {titleWords.map((word, index) => (
              <div
                key={index}
                className={index < visibleWords ? "fade-in" : ""}
                style={{
                  animationDelay: `${index * 0.13 + (delays[index] || 0)}s`,
                  opacity: index < visibleWords ? undefined : 0,
                }}
              >
                {word}
              </div>
            ))}
          </div>
        </div>
        <div className="text-sm sm:text-base md:text-xl xl:text-2xl 2xl:text-3xl mt-3 overflow-hidden text-white font-bold max-w-4xl mx-auto text-center px-2 sm:px-4">
          <div
            className={subtitleVisible ? "fade-in-subtitle" : ""}
            style={{
              animationDelay: `${titleWords.length * 0.13 + 0.2}s`,
              opacity: subtitleVisible ? undefined : 0,
            }}
          >
            {subtitle}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero3DWebGL