import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export function Navigation() {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['hero', 'projects', 'skills', 'about', 'contact'];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop sidebar nav */}
      <nav className="hidden lg:flex fixed left-0 top-0 h-full w-48 flex-col justify-center items-start pl-10 z-30">
        <div className="space-y-6">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className={`group flex items-center gap-3 text-xs font-mono uppercase tracking-[0.12em] transition-all duration-200 ${
                  isActive
                    ? 'text-gold'
                    : 'text-muted-foreground hover:text-gold'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-gold scale-100'
                      : 'bg-muted-foreground/30 scale-75 group-hover:bg-gold/50'
                  }`}
                />
                <span
                  className={`transition-transform duration-200 ${
                    isActive ? 'translate-x-1' : 'group-hover:translate-x-1.5'
                  }`}
                >
                  {link.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile header */}
      <div
        className={`lg:hidden fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled || mobileOpen
            ? 'bg-glass border-b border-white/[0.06]'
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <button
            onClick={() => scrollTo('#hero')}
            className="font-serif text-lg font-semibold text-foreground"
          >
            Manoj RS
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-dark/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="font-serif text-3xl text-foreground hover:text-gold transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
