"use client"
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Phone, Mail, MessageCircle } from 'lucide-react'

export function ContactSectionRu() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus(null)
    if (!name.trim() || !phone.trim() || !message.trim()) {
      setStatus({ ok: false, msg: 'Пожалуйста, заполните все поля' })
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, message })
      })
      const json = await res.json().catch(() => ({}))
      if (res.ok && json?.success) {
        setStatus({ ok: true, msg: 'Сообщение отправлено' })
        setName("")
        setPhone("")
        setMessage("")
      } else {
        setStatus({ ok: false, msg: json?.message || 'Не удалось отправить' })
      }
    } catch (err) {
      setStatus({ ok: false, msg: 'Сетевая ошибка, попробуйте ещё раз' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-16 bg-neutral-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Получите бесплатную консультацию</h2>
          <p className="text-neutral-300">Свяжитесь с нами и ввезите авто на лучших условиях</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Быстрый контакт</h3>
            <div className="space-y-4">
              <Button variant="outline" size="lg" className="w-full justify-start gap-3 bg-transparent hover:bg-white text-white hover:text-black border-white/30 hover:border-white transition-colors" asChild>
                <a href="tel:+995577908080">
                  <Phone className="w-5 h-5" />
                  +995 577 90 80 80
                </a>
              </Button>

              <Button variant="outline" size="lg" className="w-full justify-start gap-3 bg-transparent hover:bg-white text-white hover:text-black border-white/30 hover:border-white transition-colors" asChild>
                <a href="https://wa.me/995577908080">
                  <MessageCircle className="w-5 h-5" />
                  Чат WhatsApp
                </a>
              </Button>

              <Button variant="outline" size="lg" className="w-full justify-start gap-3 bg-transparent hover:bg-white text-white hover:text-black border-white/30 hover:border-white transition-colors" asChild>
                <a href="mailto:info@swiftauto.ge">
                  <Mail className="w-5 h-5" />
                  info@swiftauto.ge
                </a>
              </Button>
            </div>
          </div>

          <form className="space-y-4" onSubmit={onSubmit}>
            <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Имя" className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-red-500" required />
            <input type="tel" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Телефон" className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-red-500" required />
            <textarea rows={4} name="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Короткое описание..." className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-red-500" required />
            <Button size="lg" className="w-full" type="submit" disabled={submitting}>{submitting ? 'Отправка...' : 'Отправить сообщение'}</Button>
            {status && (<p className={`text-sm ${status.ok ? 'text-green-400' : 'text-red-400'}`}>{status.msg}</p>)}
          </form>
        </div>
      </div>
    </section>
  )
}
