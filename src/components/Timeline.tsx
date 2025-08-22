import { useEffect, useState, useRef } from "react";
import { Check, TreePine, Fish, Bird, Flower, Globe, Recycle, Users } from "lucide-react";

export interface TimelineItem {
  id: string;
  title: string;
  content: string;
  icon: React.ReactNode;
  side: 'left' | 'right';
}

const defaultTimelineData: TimelineItem[] = [
  {
    id: '1',
    title: 'O que é Biodiversidade?',
    content: 'A biodiversidade refere-se à variedade de vida na Terra, incluindo a diversidade de espécies, genes e ecossistemas. É fundamental para o equilíbrio dos ecossistemas e para a sustentabilidade do planeta.',
    icon: <Globe className="w-6 h-6" />,
    side: 'right'
  },
  {
    id: '2',
    title: 'Importância das Florestas',
    content: 'As florestas são os pulmões do planeta, produzindo oxigênio e absorvendo dióxido de carbono. Elas abrigam 80% da biodiversidade terrestre e fornecem recursos essenciais para a humanidade.',
    icon: <TreePine className="w-6 h-6" />,
    side: 'left'
  },
  {
    id: '3',
    title: 'Ecossistemas Aquáticos',
    content: 'Rios, lagos e oceanos são habitats vitais para milhares de espécies. A preservação da qualidade da água é essencial para manter a vida aquática e garantir recursos hídricos para todos.',
    icon: <Fish className="w-6 h-6" />,
    side: 'right'
  },
  {
    id: '4',
    title: 'Fauna em Extinção',
    content: 'Muitas espécies animais estão ameaçadas devido à perda de habitat, caça predatória e mudanças climáticas. É crucial implementar medidas de conservação para proteger essas espécies.',
    icon: <Bird className="w-6 h-6" />,
    side: 'left'
  },
  {
    id: '5',
    title: 'Flora Nativa',
    content: 'As plantas nativas são adaptadas ao clima e solo locais, sendo essenciais para a manutenção dos ecossistemas. Elas fornecem alimento e abrigo para a fauna local.',
    icon: <Flower className="w-6 h-6" />,
    side: 'right'
  },
  {
    id: '6',
    title: 'Sustentabilidade e Reciclagem',
    content: 'Práticas sustentáveis como reciclagem, uso consciente de recursos e energia renovável são fundamentais para reduzir nosso impacto ambiental.',
    icon: <Recycle className="w-6 h-6" />,
    side: 'left'
  },
  {
    id: '7',
    title: 'Ação Coletiva',
    content: 'A preservação ambiental é responsabilidade de todos. Através da educação, conscientização e ações coletivas, podemos criar um futuro sustentável para nosso planeta.',
    icon: <Users className="w-6 h-6" />,
    side: 'right'
  }
];

interface TimelineProps {
  data?: TimelineItem[];
}

const Timeline: React.FC<TimelineProps> = ({ data = defaultTimelineData }) => {
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  const completionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const timelineRect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const timelineTop = timelineRect.top;
      const timelineHeight = timelineRect.height;

      // Calculate scroll progress relative to timeline
      let progress = 0;
      if (timelineTop < windowHeight) {
        progress = Math.min(
          (windowHeight - timelineTop) / (timelineHeight + windowHeight),
          1
        );
      }

      setScrollProgress(progress);

      // Check if completion goal is reached
      if (completionRef.current) {
        const completionRect = completionRef.current.getBoundingClientRect();
        if (completionRect.top <= windowHeight * 0.8) {
          setIsCompleted(true);
        }
      }

      // Check visibility of timeline items
      const items = timelineRef.current.querySelectorAll('.timeline-item');
      const newVisibleItems = new Set<string>();

      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const itemId = item.getAttribute('data-id');
        
        if (rect.top < windowHeight * 0.8 && itemId) {
          newVisibleItems.add(itemId);
        }
      });

      setVisibleItems(newVisibleItems);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div id="timeline-content" className="timeline-container py-20" ref={timelineRef}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Timeline Line */}
        <div 
          className="timeline-line"
          style={{ height: 'calc(100% - 120px)' }}
        >
          <div 
            className="timeline-progress"
            style={{ height: `${scrollProgress * 100}%` }}
          />
        </div>

        {/* Timeline Items */}
        {data.map((item, index) => (
          <div
            key={item.id}
            data-id={item.id}
            className={`timeline-item ${item.side} ${
              visibleItems.has(item.id) ? 'visible' : ''
            }`}
            style={{ transitionDelay: `${index * 0.1}s` }}
          >
            {/* Timeline Dot */}
            <div 
              className={`timeline-dot ${
                visibleItems.has(item.id) ? 'active' : ''
              }`}
            >
              <div className="text-nature-green w-5 h-5">
                {item.icon}
              </div>
            </div>

            {/* Content Card */}
            <div className="timeline-content">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-nature-green/10 rounded-full mr-4">
                  <div className="text-nature-green">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  {item.title}
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {item.content}
              </p>
            </div>
          </div>
        ))}

        {/* Completion Goal */}
        <div 
          ref={completionRef}
          className="flex justify-center mt-20 mb-10"
        >
          <div 
            className={`completion-goal ${isCompleted ? 'completed' : ''}`}
          >
            <Check 
              className={`completion-icon ${isCompleted ? 'completed' : ''}`}
            />
          </div>
        </div>

        {/* Completion Message */}
        {isCompleted && (
          <div className="text-center animate-fade-in-up">
            <h2 className="text-3xl font-bold text-nature-green mb-4">
              Parabéns! Jornada Concluída
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Você completou esta jornada de aprendizado sobre preservação ambiental. 
              Agora é hora de colocar esse conhecimento em prática!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Timeline;