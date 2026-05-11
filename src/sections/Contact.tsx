import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Mail, ExternalLink, Copy, Check, ArrowDownToLine } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const children = section.children;
    gsap.set(children, { opacity: 0, y: 30 });
    const tween = gsap.to(children, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText('manojshyva123@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-3xl mx-auto text-center">
        <div ref={sectionRef}>
          <span className="font-mono text-sm text-gold mb-4 block">05 /</span>
          <h2 className="font-serif text-3xl md:text-5xl font-semibold text-foreground mb-6">
            Let's build something that matters.
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Open to AI/ML and Full Stack roles. Based in Mysuru, Karnataka.
          </p>

          {/* Email */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <a
              href="mailto:manojshyva123@gmail.com"
              className="text-xl md:text-2xl text-foreground hover:text-gold transition-colors font-mono"
            >
              manojshyva123@gmail.com
            </a>
            <button
              onClick={copyEmail}
              className="p-2 rounded-lg hover:bg-dark-tertiary transition-colors text-muted-foreground hover:text-gold"
              aria-label="Copy email"
            >
              {copied ? (
                <Check className="w-5 h-5 text-teal" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <a
              href="https://github.com/Manoj-0810"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-dark-secondary border border-white/[0.06] text-muted-foreground hover:text-gold hover:border-gold/30 transition-all"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/manoj-r-s-644560275/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-dark-secondary border border-white/[0.06] text-muted-foreground hover:text-gold hover:border-gold/30 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://leetcode.com/u/Manoj__RS/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-dark-secondary border border-white/[0.06] text-muted-foreground hover:text-gold hover:border-gold/30 transition-all"
              aria-label="LeetCode"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
            <a
              href="mailto:manojshyva123@gmail.com"
              className="p-3 rounded-xl bg-dark-secondary border border-white/[0.06] text-muted-foreground hover:text-gold hover:border-gold/30 transition-all"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Resume download */}
          <a
            href="/Manoj_RS_Resume.pdf"
            download="Manoj_RS_Resume.pdf"
            className="inline-flex items-center gap-2 px-6 py-3 border border-gold/50 text-gold rounded-lg hover:bg-gold/10 transition-all duration-200"
          >
            <ArrowDownToLine className="w-4 h-4" />
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}
