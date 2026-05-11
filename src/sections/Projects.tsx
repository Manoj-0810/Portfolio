import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  category: string;
  title: string;
  impact: string;
  problem: string;
  approach: string;
  result: string;
  tech: string[];
  image: string;
  demoUrl?: string;
  sourceUrl?: string;
}

const projects: Project[] = [
  {
    category: 'ASR / DEEP LEARNING',
    title: 'Kannada Speech-to-Text',
    impact:
      'Fine-tuned Wav2Vec2 on a 15GB low-resource dataset, achieving 0.06 CER — research-grade performance for an underrepresented language.',
    problem:
      'Kannada lacked production-quality ASR systems. Existing solutions struggled with word boundary detection and had high WER despite acceptable CER.',
    approach:
      'Built an end-to-end pipeline with PyTorch and Hugging Face Transformers. Implemented greedy and beam search + KenLM decoding. Engineered custom tokenizers and performed extensive error analysis with confusion matrices and CER distribution plots.',
    result:
      'Achieved 0.06 CER and 0.32 WER. The system handles real-world audio with robust preprocessing, and the analysis framework enables continuous model improvement.',
    tech: ['PyTorch', 'Hugging Face', 'Wav2Vec2', 'KenLM', 'CTC', 'Librosa'],
    image: '/kannada-asr.jpg',
    demoUrl: 'https://bit.ly/asr-project',
    sourceUrl: 'https://github.com/Manoj-0810',
  },
  {
    category: 'TIME-SERIES / ML',
    title: 'EV Adoption Forecast',
    impact:
      'Recursive multi-step forecasting system predicting EV adoption 36 months ahead for county-level infrastructure planning.',
    problem:
      'Governments and urban planners need data-driven forecasts for charging infrastructure demand, but basic regression models fail to capture temporal patterns.',
    approach:
      'Engineered time-aware features: lag variables, rolling averages, growth rates, and trend slopes. Trained a Random Forest Regressor with randomized search hyperparameter tuning. Implemented recursive forecasting where each prediction feeds back as input.',
    result:
      'Deployed via Streamlit with interactive county selection. The system captures non-linear regional growth patterns and enables proactive policy planning.',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'Streamlit', 'Random Forest'],
    image: '/ev-forecast.jpg',
    demoUrl: 'https://manojev.streamlit.app',
    sourceUrl: 'https://github.com/Manoj-0810',
  },
  {
    category: 'LLM / GRAPH ANALYTICS',
    title: 'ERP Graph Assistant',
    impact:
      'Conversational interface for ERP analytics using natural language queries translated into graph traversals over Order-to-Cash workflows.',
    problem:
      'ERP transactional data is complex and siloed. Business users struggle to trace order flows, detect broken processes, or run aggregation queries without SQL expertise.',
    approach:
      'Modeled SAP ERP data as a directed graph in NetworkX (Sales Order → Delivery → Billing). Built a hybrid query parser using Gemini LLM with rule-based fallback. Implemented domain guardrails to prevent hallucinations. Added persistent graph caching for performance.',
    result:
      'Supports flow tracing, billing lookup, broken flow detection, and multi-query processing. Dynamic node highlighting in the visual graph makes insights immediately actionable.',
    tech: ['Python', 'NetworkX', 'Gemini API', 'Streamlit', 'Graph Analysis'],
    image: '/erp-graph.jpg',
    demoUrl: 'https://dodge-fde-project-manojrs.streamlit.app',
    sourceUrl: 'https://github.com/Manoj-0810',
  },
  {
    category: 'MULTI-AGENT AI',
    title: 'ResearchMind',
    impact:
      'Autonomous multi-agent research system that discovers, reads, synthesizes, and critiques content on any topic.',
    problem:
      'Research workflows are fragmented and time-consuming. Single-model approaches lack the specialized reasoning needed for quality synthesis.',
    approach:
      'Architected a 4-agent pipeline: Search Agent (Tavily API), Reader Agent (BeautifulSoup scraping), Writer Chain (structured prompting with GPT-4o mini), and Critic Chain (quality evaluation with scoring). Used LangChain for orchestration.',
    result:
      'Produces structured reports with sources, scores, and critical feedback. Each pipeline stage is visible to the user, making the system interpretable and trustworthy.',
    tech: ['LangChain', 'OpenAI GPT-4o', 'Tavily API', 'BeautifulSoup', 'Streamlit'],
    image: '/researchmind.jpg',
    sourceUrl: 'https://github.com/Manoj-0810',
  },
  {
    category: 'FULL-STACK / ZERO-DEP',
    title: 'TaskFlow',
    impact:
      'Production-grade task manager built with zero external dependencies — custom JWT auth, RBAC, and JSON-based persistence.',
    problem:
      'Most task management tools are over-engineered. I wanted to prove that a robust full-stack app could be built with nothing but Node.js built-ins.',
    approach:
      'Built an Express-free HTTP server using only Node.js built-in modules. Implemented custom JWT with HMAC-SHA256, password hashing, and role-based access control. Created a vanilla JS SPA frontend with zero frameworks. Deployed on Railway with one-click setup.',
    result:
      'Complete CRUD for projects, tasks, and team members. Dashboard with stats, bar charts, and overdue alerts. ~10 hours from concept to deployed product.',
    tech: ['Node.js', 'Vanilla JS', 'JWT', 'RBAC', 'Railway'],
    image: '/taskflow.jpg',
    demoUrl: 'https://team-task-manager-production-a245.up.railway.app',
    sourceUrl: 'https://github.com/Manoj-0810',
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.set(card, { opacity: 0, y: 50 });

    const tween = gsap.to(card, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  const isReversed = index % 2 === 1;

  return (
    <div
      ref={cardRef}
      className={`group relative bg-dark-secondary border border-white/[0.06] rounded-2xl overflow-hidden hover:border-gold/30 transition-all duration-300 hover:-translate-y-1.5 ${
        isReversed ? 'lg:flex-row-reverse' : ''
      } flex flex-col lg:flex-row`}
    >
      {/* Image */}
      <div className="lg:w-[45%] relative overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-secondary/80 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-dark-secondary/80" />
      </div>

      {/* Content */}
      <div className="lg:w-[55%] p-8 md:p-10 flex flex-col justify-center">
        <span className="font-mono text-xs tracking-[0.12em] uppercase text-gold mb-3">
          {project.category}
        </span>
        <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-3">
          {project.title}
        </h3>
        <p className="text-gold text-sm md:text-base mb-5 leading-relaxed">
          {project.impact}
        </p>

        <div className="space-y-3 mb-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Problem
            </span>
            <p className="text-sm text-foreground/80 mt-1 leading-relaxed">
              {project.problem}
            </p>
          </div>
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Approach
            </span>
            <p className="text-sm text-foreground/80 mt-1 leading-relaxed">
              {project.approach}
            </p>
          </div>
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Result
            </span>
            <p className="text-sm text-foreground/80 mt-1 leading-relaxed">
              {project.result}
            </p>
          </div>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-3 py-1 text-xs font-mono bg-dark-tertiary rounded-full text-muted-foreground border border-white/[0.06]"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-4">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-gold transition-colors group/link"
            >
              Live Demo
              <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
            </a>
          )}
          {project.sourceUrl && (
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-gold transition-colors group/link"
            >
              Source Code
              <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    gsap.set(el, { opacity: 0, y: 30 });
    const tween = gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section id="projects" className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <div ref={headerRef} className="mb-16">
          <span className="font-mono text-sm text-gold mb-2 block">02 /</span>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Selected Work
          </h2>
          <p className="text-muted-foreground max-w-xl text-base md:text-lg">
            Projects that demonstrate end-to-end thinking — from model training
            to deployment, from data pipelines to user interfaces.
          </p>
        </div>

        <div className="space-y-12 md:space-y-16">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
