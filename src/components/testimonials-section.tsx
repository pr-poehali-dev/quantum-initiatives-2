import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Алексей Петров",
    role: "Генеральный директор, TechRetail Group",
    avatar: "/professional-woman-scientist.png",
    content:
      "ИИ агент взял на себя обработку 80% входящих заявок. Команда менеджеров теперь занимается только горячими сделками — выручка выросла на 40%.",
  },
  {
    name: "Мария Соколова",
    role: "Операционный директор, LogisPro",
    avatar: "/cybersecurity-expert-man.jpg",
    content:
      "Внедрили агента для документооборота. То, что раньше занимало три дня, теперь происходит за час. Экономия на операционных расходах — более 2 млн рублей в месяц.",
  },
  {
    name: "Дмитрий Захаров",
    role: "Директор по маркетингу, Nova Commerce",
    avatar: "/asian-woman-tech-developer.jpg",
    content:
      "Агент самостоятельно ведёт рассылки, анализирует отклик и корректирует тексты. Конверсия писем выросла вдвое без участия нашей команды.",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 px-6 bg-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-card-foreground mb-4 font-sans">Что говорят наши клиенты</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Реальные результаты компаний, которые уже автоматизировали бизнес с нашими агентами
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="glow-border slide-up" style={{ animationDelay: `${index * 0.15}s` }}>
              <CardContent className="p-6">
                <p className="text-card-foreground mb-6 leading-relaxed italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-primary">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}