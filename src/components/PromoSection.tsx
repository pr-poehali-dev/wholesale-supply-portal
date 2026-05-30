import { useState } from "react";
import Icon from "@/components/ui/icon";
import { NEWS, NAV } from "@/lib/siteData";

const SEND_LEAD_URL = "https://functions.poehali.dev/5b371f74-aec0-4c03-bdc4-d095660ee983";

interface CountdownTime {
  d: number;
  h: number;
  m: number;
  s: number;
}

function CountdownBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="countdown-box rounded-xl px-4 py-3 text-center min-w-[72px]">
      <div className="text-3xl font-oswald font-bold text-brand-accent leading-none">
        {String(value).padStart(2, "0")}
      </div>
      <div className="text-xs text-white/60 mt-1 uppercase tracking-widest">{label}</div>
    </div>
  );
}

interface PromoSectionProps {
  countdown: CountdownTime;
  onScrollTo: (id: string) => void;
}

type FormStatus = "idle" | "loading" | "success" | "error";

export default function PromoSection({ countdown, onScrollTo }: PromoSectionProps) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async () => {
    if (!name.trim() || !contact.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch(SEND_LEAD_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, contact, message }),
      });
      if (res.ok) {
        setStatus("success");
        setName("");
        setContact("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };
  return (
    <>
      {/* АКЦИИ */}
      <section id="promo" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="anim-hidden text-center mb-14">
            <span className="text-brand-cyan font-medium text-sm uppercase tracking-widest">Ограниченные предложения</span>
            <h2 className="font-oswald text-4xl sm:text-5xl font-bold text-brand-navy mt-2">
              АКЦИИ И <span className="text-brand-blue/50">СКИДКИ</span>
            </h2>
          </div>

          {/* Главная акция с таймером */}
          <div className="anim-hidden relative rounded-3xl overflow-hidden mb-8 bg-gradient-to-br from-brand-navy to-brand-blue p-8 md:p-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-cyan/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-400/40 rounded-full px-3 py-1 mb-4">
                  <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                  <span className="text-red-300 text-xs font-semibold uppercase tracking-wide">Горячее предложение</span>
                </div>
                <h3 className="font-oswald text-3xl md:text-4xl font-bold text-white mb-3">
                  СКИДКА 20% НА<br /><span className="text-brand-accent">ВСЮ МЕЛОВАННУЮ БУМАГУ</span>
                </h3>
                <p className="text-white/65 text-base max-w-md mb-6">
                  Акция распространяется на весь ассортимент мелованной бумаги от 115 г/м². Заказ от 5 упаковок.
                </p>
                <button
                  onClick={() => onScrollTo("contacts")}
                  className="btn-glow inline-flex items-center gap-2 bg-brand-accent text-brand-navy font-oswald font-bold px-7 py-3.5 rounded-xl uppercase tracking-wide"
                >
                  <Icon name="ShoppingCart" size={18} />
                  Оформить заказ
                </button>
              </div>
              <div className="shrink-0">
                <p className="text-white/50 text-xs uppercase tracking-widest mb-3 text-center">До конца акции</p>
                <div className="flex items-center gap-2">
                  <CountdownBox label="Дней" value={countdown.d} />
                  <span className="text-brand-accent text-2xl font-bold">:</span>
                  <CountdownBox label="Часов" value={countdown.h} />
                  <span className="text-brand-accent text-2xl font-bold">:</span>
                  <CountdownBox label="Минут" value={countdown.m} />
                  <span className="text-brand-accent text-2xl font-bold">:</span>
                  <CountdownBox label="Секунд" value={countdown.s} />
                </div>
              </div>
            </div>
          </div>

          {/* Дополнительные акции */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { badge: "−15%", title: "Офсетные краски CMYK", desc: "При заказе от 10 кг любого оттенка", color: "from-blue-700 to-blue-950" },
              { badge: "БЕСПЛАТНО", title: "Доставка по Москве", desc: "При заказе от 30 000 руб. в течение июня", color: "from-emerald-700 to-emerald-950" },
              { badge: "−25%", title: "Офсетные пластины", desc: "Остатки склада прошлого сезона", color: "from-purple-700 to-purple-950" },
            ].map((p, i) => (
              <div
                key={i}
                className={`anim-hidden card-hover rounded-2xl bg-gradient-to-br ${p.color} p-7 text-white cursor-pointer`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="inline-block bg-white/20 border border-white/30 rounded-lg px-3 py-1 font-oswald font-bold text-brand-accent text-lg mb-4">
                  {p.badge}
                </div>
                <h4 className="font-oswald text-xl font-bold mb-2 text-white">{p.title}</h4>
                <p className="text-white/65 text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* НОВОСТИ */}
      <section id="news" className="py-24 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="anim-hidden flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
            <div>
              <span className="text-brand-cyan font-medium text-sm uppercase tracking-widest">Последнее</span>
              <h2 className="font-oswald text-4xl sm:text-5xl font-bold text-brand-navy mt-2">НОВОСТИ</h2>
            </div>
            <button className="text-brand-navy font-semibold underline underline-offset-4 hover:text-brand-blue transition-colors">
              Все новости →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {NEWS.map((n, i) => (
              <article
                key={i}
                className="anim-hidden card-hover bg-white rounded-2xl overflow-hidden border border-brand-navy/8 cursor-pointer"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="h-1.5 bg-gradient-to-r from-brand-navy to-brand-cyan" />
                <div className="p-7">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-brand-accent/15 text-brand-navy font-semibold text-xs px-3 py-1 rounded-full">
                      {n.tag}
                    </span>
                    <span className="text-muted-foreground text-xs">{n.date}</span>
                  </div>
                  <h3 className="font-oswald text-xl font-bold text-brand-navy mb-3 leading-tight">{n.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{n.desc}</p>
                  <div className="mt-5 flex items-center gap-1 text-brand-blue font-semibold text-sm">
                    Читать далее <Icon name="ArrowRight" size={14} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* КОНТАКТЫ */}
      <section id="contacts" className="py-24 bg-brand-navy relative overflow-hidden noise">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-60" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="anim-hidden text-center mb-14">
            <span className="text-brand-accent font-medium text-sm uppercase tracking-widest">Мы на связи</span>
            <h2 className="font-oswald text-4xl sm:text-5xl font-bold text-white mt-2">
              СВЯЖИТЕСЬ <span className="text-brand-accent">С НАМИ</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="anim-hidden bg-white/5 border border-white/10 rounded-3xl p-8">
              <h3 className="font-oswald text-2xl font-bold text-white mb-6">Оставьте заявку</h3>

              {status === "success" ? (
                <div className="flex flex-col items-center gap-4 py-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-brand-accent/20 flex items-center justify-center">
                    <Icon name="CheckCircle" size={32} className="text-brand-accent" />
                  </div>
                  <h4 className="font-oswald text-xl font-bold text-white">Заявка отправлена!</h4>
                  <p className="text-white/60 text-sm">Мы свяжемся с вами в ближайшее время.</p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="text-brand-accent text-sm underline underline-offset-4 hover:text-white transition-colors"
                  >
                    Отправить ещё одну
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/8 border border-white/15 rounded-xl px-5 py-3.5 text-white placeholder:text-white/35 focus:outline-none focus:border-brand-accent transition-colors text-sm"
                    placeholder="Название компании или ваше имя"
                  />
                  <input
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="w-full bg-white/8 border border-white/15 rounded-xl px-5 py-3.5 text-white placeholder:text-white/35 focus:outline-none focus:border-brand-accent transition-colors text-sm"
                    placeholder="Телефон или e-mail"
                  />
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-white/8 border border-white/15 rounded-xl px-5 py-3.5 text-white placeholder:text-white/35 focus:outline-none focus:border-brand-accent transition-colors text-sm resize-none"
                    placeholder="Что вас интересует? Укажите нужные материалы и объёмы"
                  />
                  {status === "error" && (
                    <p className="text-red-400 text-sm text-center">Ошибка отправки. Попробуйте ещё раз.</p>
                  )}
                  <button
                    onClick={handleSubmit}
                    disabled={status === "loading" || !name.trim() || !contact.trim()}
                    className="btn-glow w-full bg-brand-accent text-brand-navy font-oswald font-bold py-4 rounded-xl uppercase tracking-wide text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {status === "loading" ? (
                      <>
                        <Icon name="Loader" size={18} className="animate-spin" />
                        Отправляем...
                      </>
                    ) : (
                      "Отправить заявку"
                    )}
                  </button>
                  <p className="text-white/35 text-xs text-center">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                  </p>
                </div>
              )}
            </div>

            <div className="anim-hidden space-y-5">
              {[
                { icon: "Phone", title: "Телефон", lines: ["+7 (495) 000-00-00", "+7 (800) 000-00-00 (бесплатно)"] },
                { icon: "Mail", title: "Email", lines: ["info@polygraphopt.ru", "sales@polygraphopt.ru"] },
                { icon: "MapPin", title: "Адрес склада", lines: ["г. Москва, ул. Складская, д. 1", "Пн–Пт: 9:00–18:00"] },
                { icon: "Clock", title: "Поддержка", lines: ["Онлайн-чат: круглосуточно", "Телефон: 9:00–20:00 (МСК)"] },
              ].map((c, i) => (
                <div key={i} className="flex items-start gap-5 p-5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-12 h-12 rounded-xl bg-brand-accent/15 flex items-center justify-center shrink-0">
                    <Icon name={c.icon} size={22} className="text-brand-accent" />
                  </div>
                  <div>
                    <div className="text-white/50 text-xs uppercase tracking-widest mb-1">{c.title}</div>
                    {c.lines.map((l, j) => (
                      <div key={j} className="text-white font-medium">{l}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black py-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-brand-accent rounded-md flex items-center justify-center">
              <Icon name="Printer" size={14} className="text-brand-navy" />
            </div>
            <span className="font-oswald font-bold text-white tracking-wide">
              ПОЛИ<span className="text-brand-accent">ГРАД</span>
            </span>
          </div>
          <p className="text-white/30 text-sm">© 2026 Полиград. Все права защищены.</p>
          <div className="flex flex-wrap gap-5 justify-center">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => onScrollTo(n.id)}
                className="text-white/40 hover:text-white/70 text-xs transition-colors"
              >
                {n.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}