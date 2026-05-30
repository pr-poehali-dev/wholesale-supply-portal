import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const NAV = [
  { id: "home", label: "Главная" },
  { id: "catalog", label: "Каталог" },
  { id: "services", label: "Услуги" },
  { id: "promo", label: "Акции" },
  { id: "news", label: "Новости" },
  { id: "contacts", label: "Контакты" },
];

const CATALOG_CATEGORIES = [
  { icon: "FileText", title: "Офсетная бумага", desc: "80–300 г/м², форматы A0–A4", count: "120+ позиций", color: "#0F2557" },
  { icon: "Layers", title: "Мелованная бумага", desc: "Глянец, матт, шёлк", count: "85 позиций", color: "#1A3A7C" },
  { icon: "Printer", title: "Картон и упаковка", desc: "Хром-эрзац, дуплекс, трёхслойный", count: "60 позиций", color: "#234A9E" },
  { icon: "Palette", title: "Краски и лаки", desc: "CMYK, Pantone, ВД-лак", count: "200+ позиций", color: "#0F2557" },
  { icon: "Wind", title: "Плёнки", desc: "ПВХ, полипропилен, полиэстер", count: "45 позиций", color: "#1A3A7C" },
  { icon: "Package", title: "Расходники", desc: "Офсетные пластины, резина, химия", count: "300+ позиций", color: "#234A9E" },
];

const SERVICES = [
  { icon: "Truck", title: "Доставка по всей России", desc: "Собственный автопарк и транспортные компании. Доставка от 1 дня по Москве." },
  { icon: "BarChart3", title: "Персональные условия", desc: "Индивидуальные цены при объёме от 50 000 руб. Постоянным клиентам — бонусная программа." },
  { icon: "ShieldCheck", title: "Сертификация", desc: "Вся продукция сертифицирована. Работаем с юридическими лицами и ИП." },
  { icon: "Headphones", title: "Техподдержка", desc: "Менеджер за 30 секунд. Консультация по подбору материалов и расчёт заказа." },
];

const NEWS = [
  { date: "28 мая 2026", tag: "Ассортимент", title: "Новая линейка экологичных бумаг FSC", desc: "Добавили 40 новых позиций сертифицированной бумаги из устойчивых источников." },
  { date: "20 мая 2026", tag: "Компания", title: "Открыли склад в Санкт-Петербурге", desc: "Теперь доставка по Северо-Западу — от 1 рабочего дня." },
  { date: "12 мая 2026", tag: "Рынок", title: "Тренды полиграфии 2026: что выбирают типографии", desc: "Обзор актуальных материалов и технологий, которые меняют рынок печати." },
];

const STATS = [
  { value: "5 000+", label: "позиций в каталоге" },
  { value: "1 200+", label: "клиентов по России" },
  { value: "15 лет", label: "на рынке" },
  { value: "24/7", label: "поддержка" },
];

function useCountdown(targetDate: Date) {
  const calc = () => {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const t = setInterval(() => setTime(calc), 1000);
    return () => clearInterval(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return time;
}

function useScrollAnim() {
  useEffect(() => {
    const observe = () => {
      const els = document.querySelectorAll<HTMLElement>(".anim-hidden");
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              (e.target as HTMLElement).classList.add("anim-visible");
              (e.target as HTMLElement).classList.remove("anim-hidden");
              obs.unobserve(e.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      els.forEach((el) => obs.observe(el));
      return obs;
    };
    const obs = observe();
    return () => obs.disconnect();
  }, []);
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

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const promoEnd = new Date(Date.now() + 5 * 86400000 + 12 * 3600000);
  const countdown = useCountdown(promoEnd);

  useScrollAnim();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
    setActiveSection(id);
  };

  return (
    <div className="min-h-screen bg-background font-golos">

      {/* НАВИГАЦИЯ */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-brand-navy/95 backdrop-blur-md shadow-2xl" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between h-16 md:h-20">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2">
            <div className="w-9 h-9 bg-brand-accent rounded-lg flex items-center justify-center">
              <Icon name="Printer" size={20} className="text-brand-navy" />
            </div>
            <span className="font-oswald text-xl font-bold text-white tracking-wide">
              ПОЛИ<span className="text-brand-accent">ГРАД</span>
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className={`nav-link text-sm font-medium tracking-wide text-white/80 hover:text-white ${activeSection === n.id ? "active text-white" : ""}`}
              >
                {n.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollTo("contacts")}
              className="hidden md:flex btn-glow items-center gap-2 bg-brand-accent text-brand-navy font-oswald font-semibold text-sm px-5 py-2.5 rounded-lg uppercase tracking-wide"
            >
              <Icon name="Phone" size={15} />
              Связаться
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white p-2">
              <Icon name={menuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-brand-navy/98 backdrop-blur-md border-t border-white/10 px-4 pb-6 pt-4">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="block w-full text-left py-3 text-white/80 hover:text-brand-accent font-medium border-b border-white/5 last:border-0 transition-colors"
              >
                {n.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contacts")}
              className="mt-4 w-full bg-brand-accent text-brand-navy font-oswald font-semibold py-3 rounded-lg uppercase tracking-wide"
            >
              Оставить заявку
            </button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-brand-navy noise">
        <div className="absolute inset-0">
          <img
            src="https://cdn.poehali.dev/projects/64573d10-61c4-42bd-9171-9b2052c78b55/files/fa262007-a037-4c4c-95bb-f71788c1046a.jpg"
            alt="Полиграфия"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/90 to-brand-blue/60" />
        </div>

        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-1/4 left-0 right-0 h-px bg-white" />
          <div className="absolute top-2/4 left-0 right-0 h-px bg-white" />
          <div className="absolute top-3/4 left-0 right-0 h-px bg-white" />
          <div className="absolute top-0 bottom-0 left-1/4 w-px bg-white" />
          <div className="absolute top-0 bottom-0 left-2/4 w-px bg-white" />
          <div className="absolute top-0 bottom-0 left-3/4 w-px bg-white" />
        </div>

        <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-brand-accent/10 blur-3xl" />
        <div className="absolute bottom-40 left-10 w-64 h-64 rounded-full bg-brand-cyan/10 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-24 pb-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-brand-accent/15 border border-brand-accent/30 rounded-full px-4 py-1.5 mb-6">
              <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
              <span className="text-brand-accent text-sm font-medium tracking-wide">Оптовые поставки · Работаем с 2009 года</span>
            </div>

            <h1 className="font-oswald text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              РАСХОДНИКИ<br />
              <span className="text-brand-accent">ДЛЯ ПОЛИГРАФИИ</span><br />
              <span className="text-white/70 text-4xl sm:text-5xl">ОПТОМ</span>
            </h1>

            <p className="text-white/70 text-lg sm:text-xl leading-relaxed mb-8 max-w-xl">
              Бумага, краски, плёнки, картон — более 5 000 позиций со склада в Москве.
              Доставка по всей России. Персональные условия для типографий.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("catalog")}
                className="btn-glow flex items-center gap-2 bg-brand-accent text-brand-navy font-oswald font-bold text-base px-8 py-4 rounded-xl uppercase tracking-wide"
              >
                <Icon name="Grid3X3" size={18} />
                Смотреть каталог
              </button>
              <button
                onClick={() => scrollTo("promo")}
                className="btn-glow flex items-center gap-2 border-2 border-white/30 text-white font-oswald font-semibold text-base px-8 py-4 rounded-xl uppercase tracking-wide hover:border-brand-accent hover:text-brand-accent transition-colors"
              >
                <Icon name="Zap" size={18} />
                Акции сейчас
              </button>
            </div>

            <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {STATS.map((s, i) => (
                <div key={i} className="border-l-2 border-brand-accent pl-4">
                  <div className="font-oswald text-2xl font-bold text-white">{s.value}</div>
                  <div className="text-white/50 text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <span className="text-xs tracking-widest uppercase">Листай вниз</span>
          <Icon name="ChevronDown" size={20} className="animate-bounce" />
        </div>
      </section>

      {/* БЕГУЩАЯ СТРОКА */}
      <div className="bg-brand-accent py-3 overflow-hidden">
        <div className="ticker-inner">
          {[...Array(2)].map((_, ri) => (
            <div key={ri} className="flex items-center">
              {["Бумага оптом", "Краски CMYK", "Картон и упаковка", "Плёнки ПВХ", "Офсетные пластины", "Доставка по России", "Спецпредложения", "Расходники для типографий"].map((t, i) => (
                <span key={i} className="flex items-center gap-4 mr-10 text-brand-navy font-oswald font-semibold text-sm uppercase tracking-widest whitespace-nowrap">
                  <Icon name="Star" size={12} />
                  {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* КАТАЛОГ */}
      <section id="catalog" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="anim-hidden flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
            <div>
              <span className="text-brand-cyan font-medium text-sm uppercase tracking-widest">Ассортимент</span>
              <h2 className="font-oswald text-4xl sm:text-5xl font-bold text-brand-navy mt-2">
                КАТАЛОГ<br /><span className="text-brand-blue/50">ПРОДУКЦИИ</span>
              </h2>
            </div>
            <p className="text-muted-foreground max-w-sm">
              Полный спектр расходных материалов для офсетной, цифровой и флексографской печати
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATALOG_CATEGORIES.map((cat, i) => (
              <div
                key={i}
                className="anim-hidden card-hover group rounded-2xl overflow-hidden border border-brand-navy/8 bg-white cursor-pointer"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div
                  className="relative h-40 flex items-end p-6"
                  style={{ background: `linear-gradient(135deg, ${cat.color} 0%, #0B1120 100%)` }}
                >
                  <div className="absolute top-5 right-5 w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                    <Icon name={cat.icon} size={26} className="text-brand-accent" />
                  </div>
                  <div>
                    <span className="text-xs text-white/50 uppercase tracking-widest">{cat.count}</span>
                    <h3 className="font-oswald text-xl font-bold text-white mt-1">{cat.title}</h3>
                  </div>
                </div>
                <div className="p-5 flex items-center justify-between">
                  <p className="text-muted-foreground text-sm">{cat.desc}</p>
                  <div className="ml-4 shrink-0 w-9 h-9 rounded-full bg-brand-navy/5 group-hover:bg-brand-accent flex items-center justify-center transition-colors">
                    <Icon name="ArrowRight" size={16} className="text-brand-navy" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="anim-hidden mt-10 text-center">
            <button className="btn-glow inline-flex items-center gap-2 bg-brand-navy text-white font-oswald font-semibold px-8 py-4 rounded-xl uppercase tracking-wide hover:bg-brand-blue transition-colors">
              <Icon name="Download" size={18} />
              Скачать полный прайс-лист
            </button>
          </div>
        </div>
      </section>

      {/* УСЛУГИ */}
      <section id="services" className="py-24 bg-brand-navy relative overflow-hidden noise">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-brand-accent/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-brand-cyan/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="anim-hidden text-center mb-14">
            <span className="text-brand-accent font-medium text-sm uppercase tracking-widest">Что мы предлагаем</span>
            <h2 className="font-oswald text-4xl sm:text-5xl font-bold text-white mt-2">
              НАШИ <span className="text-brand-accent">УСЛУГИ</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s, i) => (
              <div
                key={i}
                className="anim-hidden group p-7 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brand-accent/40 transition-all duration-300"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-brand-accent/15 flex items-center justify-center mb-5 group-hover:bg-brand-accent transition-colors">
                  <Icon name={s.icon} size={22} className="text-brand-accent group-hover:text-brand-navy transition-colors" />
                </div>
                <h3 className="font-oswald text-lg font-semibold text-white mb-3">{s.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
                  onClick={() => scrollTo("contacts")}
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
              <div className="space-y-4">
                <input
                  className="w-full bg-white/8 border border-white/15 rounded-xl px-5 py-3.5 text-white placeholder:text-white/35 focus:outline-none focus:border-brand-accent transition-colors text-sm"
                  placeholder="Название компании или ваше имя"
                />
                <input
                  className="w-full bg-white/8 border border-white/15 rounded-xl px-5 py-3.5 text-white placeholder:text-white/35 focus:outline-none focus:border-brand-accent transition-colors text-sm"
                  placeholder="Телефон или e-mail"
                />
                <textarea
                  rows={4}
                  className="w-full bg-white/8 border border-white/15 rounded-xl px-5 py-3.5 text-white placeholder:text-white/35 focus:outline-none focus:border-brand-accent transition-colors text-sm resize-none"
                  placeholder="Что вас интересует? Укажите нужные материалы и объёмы"
                />
                <button className="btn-glow w-full bg-brand-accent text-brand-navy font-oswald font-bold py-4 rounded-xl uppercase tracking-wide text-base">
                  Отправить заявку
                </button>
                <p className="text-white/35 text-xs text-center">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </div>
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
          <p className="text-white/30 text-sm">© 2026 ПолиграфОпт. Все права защищены.</p>
          <div className="flex flex-wrap gap-5 justify-center">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="text-white/40 hover:text-white/70 text-xs transition-colors"
              >
                {n.label}
              </button>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}