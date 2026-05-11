import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Award, ExternalLink, BookOpen } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const content = contentRef.current;
    if (!header || !content) return;

    gsap.set(header, { opacity: 0, y: 30 });
    const headerTween = gsap.to(header, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: header,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    });

    const children = content.children;
    gsap.set(children, { opacity: 0, y: 30 });
    const contentTween = gsap.to(children, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: content,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    return () => {
      headerTween.scrollTrigger?.kill();
      headerTween.kill();
      contentTween.scrollTrigger?.kill();
      contentTween.kill();
    };
  }, []);

  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <div ref={headerRef} className="mb-16">
          <span className="font-mono text-sm text-gold mb-2 block">04 /</span>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
            About
          </h2>
        </div>

        <div
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16"
        >
          {/* Main content */}
          <div className="lg:col-span-3 space-y-8">
            <p className="text-lg md:text-xl text-foreground leading-relaxed">
              I believe the best engineers are those who can move seamlessly
              between research and production. Whether I'm fine-tuning a
              transformer model on 15GB of audio data or building a
              zero-dependency backend with Node.js built-ins, the goal is the
              same:{' '}
              <span className="text-gold">
                solve real problems with clean, efficient systems.
              </span>
            </p>

            <p className="text-base text-muted-foreground leading-relaxed">
              My work spans the full spectrum — from low-level signal processing
              and ASR model architecture to full-stack web applications with
              custom authentication and role-based access control. I'm
              comfortable in notebooks, terminals, and production deployments.
            </p>

            <p className="text-base text-muted-foreground leading-relaxed">
              When I'm not training models or shipping code, I'm solving
              problems on LeetCode and exploring new papers in speech
              recognition and multi-agent systems.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="https://leetcode.com/u/Manoj__RS/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-dark-tertiary rounded-lg text-sm text-muted-foreground hover:text-gold hover:border-gold/30 border border-white/[0.06] transition-all"
              >
                <BookOpen className="w-4 h-4" />
                LeetCode Profile
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://drive.google.com/drive/folders/1B4XuUA8pgaN4VsQlChc3-MZRIk76jCxQ"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-dark-tertiary rounded-lg text-sm text-muted-foreground hover:text-gold hover:border-gold/30 border border-white/[0.06] transition-all"
              >
                <Award className="w-4 h-4" />
                View Certifications
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Sidebar info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Education */}
            <div className="bg-dark-secondary border border-white/[0.06] rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="w-5 h-5 text-gold" />
                <h4 className="font-sans font-medium text-foreground">
                  Education
                </h4>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-foreground font-medium">
                  Bachelor of Engineering
                </p>
                <p className="text-sm text-muted-foreground">
                  Electronics & Communication
                </p>
                <p className="text-sm text-muted-foreground">
                  Vidyavardhaka College of Engineering
                </p>
                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground font-mono">
                  <span>CGPA: 7.8</span>
                  <span>2022 — 2026</span>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-dark-secondary border border-white/[0.06] rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-5 h-5 text-gold" />
                <h4 className="font-sans font-medium text-foreground">
                  Certifications
                </h4>
              </div>
              <ul className="space-y-2.5">
                <li className="text-sm text-muted-foreground">
                  <span className="text-foreground">Coursera</span> — AI & ML
                </li>
                <li className="text-sm text-muted-foreground">
                  <span className="text-foreground">Coursera</span> — Operating
                  Systems
                </li>
                <li className="text-sm text-muted-foreground">
                  <span className="text-foreground">Coursera</span> — Data
                  Structures
                </li>
                <li className="text-sm text-muted-foreground">
                  <span className="text-foreground">Cisco</span> — Computer
                  Networks
                </li>
                <li className="text-sm text-muted-foreground">
                  <span className="text-foreground">Cisco</span> — Python
                  Essentials
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
