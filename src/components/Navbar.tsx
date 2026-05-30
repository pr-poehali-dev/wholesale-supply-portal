import Icon from "@/components/ui/icon";
import { NAV } from "@/lib/siteData";

interface NavbarProps {
  scrolled: boolean;
  menuOpen: boolean;
  activeSection: string;
  onScrollTo: (id: string) => void;
  onToggleMenu: () => void;
}

export default function Navbar({ scrolled, menuOpen, activeSection, onScrollTo, onToggleMenu }: NavbarProps) {
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-brand-navy/95 backdrop-blur-md shadow-2xl" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between h-16 md:h-20">
        <button onClick={() => onScrollTo("home")} className="flex items-center gap-2">
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
              onClick={() => onScrollTo(n.id)}
              className={`nav-link text-sm font-medium tracking-wide text-white/80 hover:text-white ${activeSection === n.id ? "active text-white" : ""}`}
            >
              {n.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onScrollTo("contacts")}
            className="hidden md:flex btn-glow items-center gap-2 bg-brand-accent text-brand-navy font-oswald font-semibold text-sm px-5 py-2.5 rounded-lg uppercase tracking-wide"
          >
            <Icon name="Phone" size={15} />
            Связаться
          </button>
          <button onClick={onToggleMenu} className="md:hidden text-white p-2">
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-brand-navy/98 backdrop-blur-md border-t border-white/10 px-4 pb-6 pt-4">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => onScrollTo(n.id)}
              className="block w-full text-left py-3 text-white/80 hover:text-brand-accent font-medium border-b border-white/5 last:border-0 transition-colors"
            >
              {n.label}
            </button>
          ))}
          <button
            onClick={() => onScrollTo("contacts")}
            className="mt-4 w-full bg-brand-accent text-brand-navy font-oswald font-semibold py-3 rounded-lg uppercase tracking-wide"
          >
            Оставить заявку
          </button>
        </div>
      )}
    </header>
  );
}
