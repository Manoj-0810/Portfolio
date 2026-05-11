import { Github, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-8 px-6 md:px-12 lg:px-20 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground font-mono">
          © {new Date().getFullYear()} Manoj RS
        </p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Built with</span>
          <Heart className="w-3.5 h-3.5 text-gold fill-gold" />
          <span>React & Tailwind</span>
        </div>
        <a
          href="https://github.com/Manoj-0810"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-gold transition-colors"
        >
          <Github className="w-4 h-4" />
          View Source
        </a>
      </div>
    </footer>
  );
}
