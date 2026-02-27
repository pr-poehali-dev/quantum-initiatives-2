import { useEffect, useRef, useState } from "react"

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  pulsePhase: number
}

interface Connection {
  from: number
  to: number
  opacity: number
  active: boolean
  activeProgress: number
}

const NODE_COUNT = 60

export const Hero3DWebGL = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<Node[]>([])
  const connectionsRef = useRef<Connection[]>([])
  const animFrameRef = useRef<number>(0)
  const mouseRef = useRef({ x: -9999, y: -9999 })

  const titleWords = "Агенты ИИ".split(" ")
  const subtitle = "Автоматизируем бизнес-процессы с помощью искусственного интеллекта."
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

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      init()
    }

    const init = () => {
      const w = canvas.width
      const h = canvas.height
      nodesRef.current = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1.5,
        pulsePhase: Math.random() * Math.PI * 2,
      }))

      connectionsRef.current = []
      for (let i = 0; i < NODE_COUNT; i++) {
        for (let j = i + 1; j < NODE_COUNT; j++) {
          if (Math.random() < 0.06) {
            connectionsRef.current.push({
              from: i,
              to: j,
              opacity: Math.random() * 0.3 + 0.05,
              active: false,
              activeProgress: 0,
            })
          }
        }
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    canvas.addEventListener("mousemove", handleMouseMove)

    let time = 0
    const draw = () => {
      time += 0.008
      const w = canvas.width
      const h = canvas.height
      const nodes = nodesRef.current
      const connections = connectionsRef.current

      ctx.clearRect(0, 0, w, h)

      // Background gradient
      const bg = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.8)
      bg.addColorStop(0, "#050d1a")
      bg.addColorStop(1, "#000509")
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, w, h)

      // Move nodes
      nodes.forEach(node => {
        node.x += node.vx
        node.y += node.vy
        if (node.x < 0 || node.x > w) node.vx *= -1
        if (node.y < 0 || node.y > h) node.vy *= -1

        // Mouse repulsion
        const dx = node.x - mouseRef.current.x
        const dy = node.y - mouseRef.current.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120) {
          node.vx += (dx / dist) * 0.15
          node.vy += (dy / dist) * 0.15
        }
        // Speed limit
        const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy)
        if (speed > 1.2) {
          node.vx = (node.vx / speed) * 1.2
          node.vy = (node.vy / speed) * 1.2
        }
      })

      // Activate random connections
      if (Math.random() < 0.04 && connections.length > 0) {
        const idx = Math.floor(Math.random() * connections.length)
        connections[idx].active = true
        connections[idx].activeProgress = 0
      }

      // Draw connections
      connections.forEach(conn => {
        const a = nodes[conn.from]
        const b = nodes[conn.to]
        const dx = b.x - a.x
        const dy = b.y - a.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist > 220) return

        const fadeByDist = 1 - dist / 220

        if (conn.active) {
          conn.activeProgress = Math.min(1, conn.activeProgress + 0.025)
          if (conn.activeProgress >= 1) conn.active = false

          // Glowing pulse line
          const px = a.x + dx * conn.activeProgress
          const py = a.y + dy * conn.activeProgress
          const grad = ctx.createLinearGradient(a.x, a.y, px, py)
          grad.addColorStop(0, `rgba(0, 140, 255, 0)`)
          grad.addColorStop(0.5, `rgba(0, 200, 255, ${fadeByDist * 0.9})`)
          grad.addColorStop(1, `rgba(0, 140, 255, 0)`)
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(px, py)
          ctx.strokeStyle = grad
          ctx.lineWidth = 1.5
          ctx.stroke()
        } else {
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.strokeStyle = `rgba(30, 100, 200, ${conn.opacity * fadeByDist})`
          ctx.lineWidth = 0.6
          ctx.stroke()
        }
      })

      // Draw nodes
      nodes.forEach((node, i) => {
        const pulse = Math.sin(time * 2 + node.pulsePhase) * 0.5 + 0.5
        const r = node.radius + pulse * 1.2

        // Glow
        const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 5)
        glow.addColorStop(0, `rgba(0, 160, 255, ${0.25 + pulse * 0.15})`)
        glow.addColorStop(1, "rgba(0, 0, 0, 0)")
        ctx.beginPath()
        ctx.arc(node.x, node.y, r * 5, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()

        // Core dot
        ctx.beginPath()
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2)
        const isHighlighted = i % 8 === 0
        ctx.fillStyle = isHighlighted
          ? `rgba(0, 210, 255, ${0.7 + pulse * 0.3})`
          : `rgba(30, 130, 230, ${0.5 + pulse * 0.3})`
        ctx.fill()
      })

      // Scanline subtle effect
      ctx.fillStyle = `rgba(0, 100, 255, ${0.012 * (Math.sin(time * 0.5) * 0.5 + 0.5)})`
      for (let y = 0; y < h; y += 4) {
        ctx.fillRect(0, y, w, 1)
      }

      animFrameRef.current = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener("resize", resize)
    draw()

    return () => {
      window.removeEventListener("resize", resize)
      canvas.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [])

  return (
    <div className="h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-black to-transparent" />
        <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-black to-transparent" />
      </div>

      <div className="h-screen uppercase items-center w-full absolute z-[60] pointer-events-none px-10 flex justify-center flex-col">
        <div className="text-3xl md:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold font-orbitron">
          <div className="flex space-x-2 lg:space-x-6 overflow-hidden text-white">
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
        <div className="text-xs md:text-xl xl:text-2xl 2xl:text-3xl mt-2 overflow-hidden text-white font-bold max-w-4xl mx-auto text-center px-4">
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

      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: "#000509" }}
      />
    </div>
  )
}

export default Hero3DWebGL
