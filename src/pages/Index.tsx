import { useState, useEffect } from "react";
import { useCountdown, useScrollAnim } from "@/lib/siteData";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PromoSection from "@/components/PromoSection";

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
      <Navbar
        scrolled={scrolled}
        menuOpen={menuOpen}
        activeSection={activeSection}
        onScrollTo={scrollTo}
        onToggleMenu={() => setMenuOpen(!menuOpen)}
      />
      <HeroSection onScrollTo={scrollTo} />
      <PromoSection countdown={countdown} onScrollTo={scrollTo} />
    </div>
  );
}
