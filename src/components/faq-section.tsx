import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQSection() {
  const faqs = [
    {
      question: "Сколько времени занимает внедрение агента?",
      answer:
        "Базовое внедрение занимает от 3 до 14 дней в зависимости от сложности процессов. Простые сценарии — например, автоответы или обработка заявок — запускаем за 3–5 дней.",
    },
    {
      question: "Нужно ли менять существующие системы и процессы?",
      answer:
        "Нет. Агент встраивается в то, что у вас уже есть: CRM, мессенджеры, почту, ERP и другие сервисы. Ничего ломать и переносить не нужно.",
    },
    {
      question: "Что если агент ошибётся?",
      answer:
        "Все критичные действия можно настроить с обязательным подтверждением от человека. Агент может работать в режиме советника — предлагать действие, а не совершать его самостоятельно.",
    },
    {
      question: "Насколько безопасны данные компании?",
      answer:
        "Данные передаются по зашифрованным каналам и не используются для обучения моделей. Мы подписываем NDA и соглашение об обработке данных до начала работы.",
    },
    {
      question: "Можно ли обучить агента под специфику нашего бизнеса?",
      answer:
        "Да, это основа нашей работы. Мы изучаем ваши процессы, терминологию и правила, после чего настраиваем агента под конкретные задачи именно вашей компании.",
    },
    {
      question: "Как рассчитывается стоимость?",
      answer:
        "Стоимость зависит от количества автоматизируемых процессов и объёма задач. Проводим бесплатный аудит и рассчитываем экономику конкретно для вашего бизнеса.",
    },
  ]

  return (
    <section className="py-16 sm:py-24 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 font-orbitron">Частые вопросы</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-space-mono">
            Отвечаем на главные вопросы о внедрении ИИ агентов, безопасности и результатах для бизнеса.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-blue-500/20 mb-3 sm:mb-4">
                <AccordionTrigger className="text-left text-base sm:text-lg font-semibold text-white hover:text-blue-400 font-orbitron px-4 sm:px-6 py-3 sm:py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 leading-relaxed px-4 sm:px-6 pb-3 sm:pb-4 font-space-mono text-sm sm:text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}