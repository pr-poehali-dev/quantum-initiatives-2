import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const features = [
  {
    title: "Автоматизация задач",
    description: "ИИ агент самостоятельно выполняет рутинные операции: обработка заявок, заполнение документов, отправка уведомлений — без участия человека.",
    icon: "brain",
    badge: "Авто",
  },
  {
    title: "Безопасность данных",
    description: "Все данные передаются по зашифрованным каналам. Агент работает строго в рамках заданных правил и не выходит за допустимые границы.",
    icon: "lock",
    badge: "Защита",
  },
  {
    title: "Интеграция с системами",
    description: "Подключаем агента к вашим CRM, ERP, мессенджерам и другим сервисам. Работает с тем, что у вас уже есть.",
    icon: "globe",
    badge: "Интеграция",
  },
  {
    title: "Обучение на ходу",
    description: "Агент анализирует результаты своей работы и постоянно улучшает качество выполнения задач без дополнительной настройки.",
    icon: "zap",
    badge: "Умный",
  },
  {
    title: "Многозадачность",
    description: "Один агент может вести несколько процессов параллельно: общаться с клиентами, обрабатывать данные и формировать отчёты одновременно.",
    icon: "link",
    badge: "24/7",
  },
  {
    title: "Аналитика и отчёты",
    description: "Агент собирает статистику по всем выполненным задачам и предоставляет понятные отчёты для принятия управленческих решений.",
    icon: "target",
    badge: "Отчёты",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4 font-sans">Что умеют наши ИИ агенты</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Делают за вас то, что занимало часы — теперь за минуты и без ошибок
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="glow-border hover:shadow-lg transition-all duration-300 slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">
                    {feature.icon === "brain" && "&#129504;"}
                    {feature.icon === "lock" && "&#128274;"}
                    {feature.icon === "globe" && "&#127760;"}
                    {feature.icon === "zap" && "&#9889;"}
                    {feature.icon === "link" && "&#128279;"}
                    {feature.icon === "target" && "&#127919;"}
                  </span>
                  <Badge variant="secondary" className="bg-accent text-accent-foreground">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-card-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}