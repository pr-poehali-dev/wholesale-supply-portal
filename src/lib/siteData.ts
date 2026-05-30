import { useState, useEffect } from "react";

export const NAV = [
  { id: "home", label: "Главная" },
  { id: "catalog", label: "Каталог" },
  { id: "services", label: "Услуги" },
  { id: "promo", label: "Акции" },
  { id: "news", label: "Новости" },
  { id: "contacts", label: "Контакты" },
];

export const CATALOG_CATEGORIES = [
  { icon: "FileText", title: "Офсетная бумага", desc: "80–300 г/м², форматы A0–A4", count: "120+ позиций", color: "#0F2557" },
  { icon: "Layers", title: "Мелованная бумага", desc: "Глянец, матт, шёлк", count: "85 позиций", color: "#1A3A7C" },
  { icon: "Printer", title: "Картон и упаковка", desc: "Хром-эрзац, дуплекс, трёхслойный", count: "60 позиций", color: "#234A9E" },
  { icon: "Palette", title: "Краски и лаки", desc: "CMYK, Pantone, ВД-лак", count: "200+ позиций", color: "#0F2557" },
  { icon: "Wind", title: "Плёнки", desc: "ПВХ, полипропилен, полиэстер", count: "45 позиций", color: "#1A3A7C" },
  { icon: "Package", title: "Расходники", desc: "Офсетные пластины, резина, химия", count: "300+ позиций", color: "#234A9E" },
];

export const SERVICES = [
  { icon: "Truck", title: "Доставка по всей России", desc: "Собственный автопарк и транспортные компании. Доставка от 1 дня по Москве." },
  { icon: "BarChart3", title: "Персональные условия", desc: "Индивидуальные цены при объёме от 50 000 руб. Постоянным клиентам — бонусная программа." },
  { icon: "ShieldCheck", title: "Сертификация", desc: "Вся продукция сертифицирована. Работаем с юридическими лицами и ИП." },
  { icon: "Headphones", title: "Техподдержка", desc: "Менеджер за 30 секунд. Консультация по подбору материалов и расчёт заказа." },
];

export const NEWS = [
  { date: "28 мая 2026", tag: "Ассортимент", title: "Новая линейка экологичных бумаг FSC", desc: "Добавили 40 новых позиций сертифицированной бумаги из устойчивых источников." },
  { date: "20 мая 2026", tag: "Компания", title: "Открыли склад в Санкт-Петербурге", desc: "Теперь доставка по Северо-Западу — от 1 рабочего дня." },
  { date: "12 мая 2026", tag: "Рынок", title: "Тренды полиграфии 2026: что выбирают типографии", desc: "Обзор актуальных материалов и технологий, которые меняют рынок печати." },
];

export const STATS = [
  { value: "5 000+", label: "позиций в каталоге" },
  { value: "1 200+", label: "клиентов по России" },
  { value: "15 лет", label: "на рынке" },
  { value: "24/7", label: "поддержка" },
];

export function useCountdown(targetDate: Date) {
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

export function useScrollAnim() {
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
