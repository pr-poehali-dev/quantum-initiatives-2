import { useEffect, useRef } from "react"

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

const NODE_COUNT = 70

export function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<Node[]>([])
  const connectionsRef = useRef<Connection[]>([])
  const animFrameRef = useRef<number>(0)
  const mouseRef = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      init()
    }

    const init = () => {
      const w = canvas.width
      const h = canvas.height
      nodesRef.current = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 2 + 1.5,
        pulsePhase: Math.random() * Math.PI * 2,
      }))

      connectionsRef.current = []
      for (let i = 0; i < NODE_COUNT; i++) {
        for (let j = i + 1; j < NODE_COUNT; j++) {
          if (Math.random() < 0.05) {
            connectionsRef.current.push({
              from: i,
              to: j,
              opacity: Math.random() * 0.25 + 0.05,
              active: false,
              activeProgress: 0,
            })
          }
        }
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener("mousemove", handleMouseMove)

    let time = 0
    const draw = () => {
      time += 0.008
      const w = canvas.width
      const h = canvas.height
      const nodes = nodesRef.current
      const connections = connectionsRef.current

      ctx.clearRect(0, 0, w, h)

      // Move nodes
      nodes.forEach(node => {
        node.x += node.vx
        node.y += node.vy
        if (node.x < 0 || node.x > w) node.vx *= -1
        if (node.y < 0 || node.y > h) node.vy *= -1

        const dx = node.x - mouseRef.current.x
        const dy = node.y - mouseRef.current.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 130) {
          node.vx += (dx / dist) * 0.12
          node.vy += (dy / dist) * 0.12
        }
        const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy)
        if (speed > 1.1) {
          node.vx = (node.vx / speed) * 1.1
          node.vy = (node.vy / speed) * 1.1
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
        if (dist > 240) return
        const fadeByDist = 1 - dist / 240

        if (conn.active) {
          conn.activeProgress = Math.min(1, conn.activeProgress + 0.022)
          if (conn.activeProgress >= 1) conn.active = false

          const px = a.x + dx * conn.activeProgress
          const py = a.y + dy * conn.activeProgress
          const grad = ctx.createLinearGradient(a.x, a.y, px, py)
          grad.addColorStop(0, "rgba(0, 140, 255, 0)")
          grad.addColorStop(0.5, `rgba(0, 200, 255, ${fadeByDist * 0.85})`)
          grad.addColorStop(1, "rgba(0, 140, 255, 0)")
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

        const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 5)
        glow.addColorStop(0, `rgba(0, 160, 255, ${0.18 + pulse * 0.1})`)
        glow.addColorStop(1, "rgba(0, 0, 0, 0)")
        ctx.beginPath()
        ctx.arc(node.x, node.y, r * 5, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()

        ctx.beginPath()
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2)
        ctx.fillStyle = i % 8 === 0
          ? `rgba(0, 210, 255, ${0.6 + pulse * 0.3})`
          : `rgba(30, 130, 230, ${0.45 + pulse * 0.25})`
        ctx.fill()
      })

      animFrameRef.current = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener("resize", resize)
    draw()

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ background: "#000509", zIndex: 0 }}
    />
  )
}
