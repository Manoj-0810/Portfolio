import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      labelRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 }
    )
      .fromTo(
        headlineRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.3'
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.4'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.3'
      )
      .fromTo(
        statsRef.current?.children || [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
        '-=0.2'
      );

    return () => {
      tl.kill();
    };
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Background gradient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-gold/10 via-teal/5 to-transparent blur-[120px] animate-pulse-glow pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-teal/5 blur-[100px] animate-float pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center lg:text-left lg:mx-0">
        <span
          ref={labelRef}
          className="inline-block font-mono text-xs tracking-[0.15em] uppercase text-muted-foreground mb-6 opacity-0"
        >
          Software Engineer
        </span>

        <h1
          ref={headlineRef}
          className="font-serif text-[clamp(2.5rem,8vw,5.5rem)] font-bold leading-[1.05] tracking-tight text-foreground mb-6 opacity-0"
        >
          Building{' '}
          <span className="text-gradient animate-shimmer bg-gradient-shimmer bg-clip-text text-transparent">
            intelligent systems
          </span>{' '}
          that scale.
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10 opacity-0"
        >
          AI/ML engineer with full-stack capabilities. I design, train, and deploy
          models — then wrap them in production-grade applications.
        </p>

        <div ref={ctaRef} className="flex flex-wrap items-center gap-4 mb-16 opacity-0">
          <button
            onClick={scrollToProjects}
            className="group inline-flex items-center gap-2 px-6 py-3 bg-gold text-dark font-medium rounded-lg hover:brightness-110 transition-all duration-200 hover:scale-[1.02]"
          >
            View Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <a
            href="https://github.com/Manoj-0810"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-gold/50 text-gold rounded-lg hover:bg-gold/10 transition-all duration-200"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
        </div>

        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10"
        >
          <div className="text-center lg:text-left">
            <div className="font-serif text-3xl md:text-4xl font-bold text-gold mb-1">
              6
            </div>
            <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Projects
            </div>
          </div>
          <div className="text-center lg:text-left">
            <div className="font-serif text-3xl md:text-4xl font-bold text-gold mb-1">
              15GB+
            </div>
            <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Audio Data
            </div>
          </div>
          <div className="text-center lg:text-left">
            <div className="font-serif text-3xl md:text-4xl font-bold text-gold mb-1">
              36
            </div>
            <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Month Forecast
            </div>
          </div>
          <div className="text-center lg:text-left">
            <div className="font-serif text-3xl md:text-4xl font-bold text-gold mb-1">
              0.06
            </div>
            <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              CER Achieved
            </div>
          </div>
        </div>
      </div>

      {/* Social sidebar - desktop only */}
      <div className="hidden lg:flex fixed left-8 bottom-0 flex-col items-center gap-6 z-20">
        <div className="w-px h-24 bg-border" />
        <a
          href="https://github.com/Manoj-0810"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-gold transition-colors"
          aria-label="GitHub"
        >
          <Github className="w-5 h-5" />
        </a>
        <a
          href="https://www.linkedin.com/in/manoj-r-s-644560275/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-gold transition-colors"
          aria-label="LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </a>
        <a
          href="mailto:manojshyva123@gmail.com"
          className="text-muted-foreground hover:text-gold transition-colors"
          aria-label="Email"
        >
          <Mail className="w-5 h-5" />
        </a>
        <a
          href="https://leetcode.com/u/Manoj__RS/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-gold transition-colors"
          aria-label="LeetCode"
        >
          <ExternalLink className="w-5 h-5" />
        </a>
        <div className="w-px h-24 bg-border" />
      </div>
    </section>
  );
}
