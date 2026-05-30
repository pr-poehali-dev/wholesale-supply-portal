import Icon from "@/components/ui/icon";
import { STATS, CATALOG_CATEGORIES, SERVICES } from "@/lib/siteData";

interface HeroSectionProps {
  onScrollTo: (id: string) => void;
}

export default function HeroSection({ onScrollTo }: HeroSectionProps) {
  return (
    <>
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
                onClick={() => onScrollTo("catalog")}
                className="btn-glow flex items-center gap-2 bg-brand-accent text-brand-navy font-oswald font-bold text-base px-8 py-4 rounded-xl uppercase tracking-wide"
              >
                <Icon name="Grid3X3" size={18} />
                Смотреть каталог
              </button>
              <button
                onClick={() => onScrollTo("promo")}
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
    </>
  );
}
