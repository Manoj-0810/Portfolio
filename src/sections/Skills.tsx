import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, Code2, Layers, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SkillCategory {
  icon: React.ReactNode;
  title: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    icon: <Brain className="w-6 h-6" />,
    title: 'Machine Learning',
    skills: ['PyTorch', 'Hugging Face Transformers', 'Scikit-learn', 'Pandas', 'NumPy', 'Wav2Vec2', 'LangChain'],
  },
  {
    icon: <Code2 className="w-6 h-6" />,
    title: 'Languages',
    skills: ['Python', 'C++', 'SQL', 'Kotlin', 'JavaScript'],
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: 'Systems & Tools',
    skills: ['Git', 'Linux', 'Docker', 'VS Code', 'Android Studio', 'Streamlit'],
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: 'Foundations',
    skills: ['Data Structures & Algorithms', 'DBMS', 'Operating Systems', 'Computer Networks', 'OOP'],
  },
];

export function Skills() {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const cards = cardsRef.current;
    if (!header || !cards) return;

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

    const cardElements = cards.children;
    gsap.set(cardElements, { opacity: 0, y: 40 });
    const cardsTween = gsap.to(cardElements, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: cards,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    return () => {
      headerTween.scrollTrigger?.kill();
      headerTween.kill();
      cardsTween.scrollTrigger?.kill();
      cardsTween.kill();
    };
  }, []);

  return (
    <section id="skills" className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <div ref={headerRef} className="mb-16">
          <span className="font-mono text-sm text-gold mb-2 block">03 /</span>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Technical Toolkit
          </h2>
          <p className="text-muted-foreground max-w-xl text-base md:text-lg">
            Curated capabilities — not a laundry list. These are the tools I
            reach for when building production systems.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="group bg-dark-secondary border border-white/[0.06] rounded-xl p-8 hover:border-gold/20 transition-all duration-300"
            >
              <div className="text-gold mb-5 group-hover:scale-110 transition-transform duration-300">
                {category.icon}
              </div>
              <h4 className="font-sans text-lg font-medium text-foreground mb-4">
                {category.title}
              </h4>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-mono text-muted-foreground bg-dark-tertiary px-2.5 py-1 rounded-md border border-white/[0.04]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
