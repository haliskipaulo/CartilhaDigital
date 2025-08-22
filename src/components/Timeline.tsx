import { useEffect, useState, useRef, useCallback, useLayoutEffect } from "react";
import { Check, TreePine, Fish, Bird, Flower, Globe, Recycle, Users } from "lucide-react";

// --- Interface and Default Data (No Changes) ---
export interface TimelineItem {
  id: string;
  title: string;
  content: string;
  icon: React.ReactNode;
  side: 'left' | 'right';
}

const defaultTimelineData: TimelineItem[] = [
    { id: '1', title: 'O que é Biodiversidade?', content: 'A biodiversidade refere-se à variedade de vida na Terra, incluindo a diversidade de espécies, genes e ecossistemas. É fundamental para o equilíbrio dos ecossistemas e para a sustentabilidade do planeta.', icon: <Globe className="w-full h-full" />, side: 'right' },
    { id: '2', title: 'Importância das Florestas', content: 'As florestas são os pulmões do planeta, produzindo oxigênio e absorvendo dióxido de carbono. Elas abrigam 80% da biodiversidade terrestre e fornecem recursos essenciais para a humanidade.', icon: <TreePine className="w-full h-full" />, side: 'left' },
    { id: '3', title: 'Ecossistemas Aquáticos', content: 'Rios, lagos e oceanos são habitats vitais para milhares de espécies. A preservação da qualidade da água é essencial para manter a vida aquática e garantir recursos hídricos para todos.', icon: <Fish className="w-full h-full" />, side: 'right' },
    { id: '4', title: 'Fauna em Extinção', content: 'Muitas espécies animais estão ameaçadas devido à perda de habitat, caça predatória e mudanças climáticas. É crucial implementar medidas de conservação para proteger essas espécies.', icon: <Bird className="w-full h-full" />, side: 'left' },
    { id: '5', title: 'Flora Nativa', content: 'As plantas nativas são adaptadas ao clima e solo locais, sendo essenciais para a manutenção dos ecossistemas. Elas fornecem alimento e abrigo para a fauna local.', icon: <Flower className="w-full h-full" />, side: 'right' },
    { id: '6', title: 'Sustentabilidade e Reciclagem', content: 'Práticas sustentáveis como reciclagem, uso consciente de recursos e energia renovável são fundamentais para reduzir nosso impacto ambiental.', icon: <Recycle className="w-full h-full" />, side: 'left' },
    { id: '7', title: 'Ação Coletiva', content: 'A preservação ambiental é responsabilidade de todos. Através da educação, conscientização e ações coletivas, podemos criar um futuro sustentável para nosso planeta.', icon: <Users className="w-full h-full" />, side: 'right' }
];

interface TimelineProps {
  data?: TimelineItem[];
}

const Timeline: React.FC<TimelineProps> = ({ data = defaultTimelineData }) => {
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [lineHeight, setLineHeight] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const completionRef = useRef<HTMLDivElement>(null);

  // This calculates the total bar height (no changes here)
  useLayoutEffect(() => {
    const calculateHeight = () => {
      if (timelineRef.current && completionRef.current) {
        const firstItem = timelineRef.current.querySelector('.timeline-item .timeline-dot');
        const lastItem = completionRef.current.querySelector('.completion-goal');

        if (firstItem && lastItem) {
          const firstItemRect = firstItem.getBoundingClientRect();
          const lastItemRect = lastItem.getBoundingClientRect();
          const height = (lastItemRect.top + lastItemRect.height / 2) - (firstItemRect.top + firstItemRect.height / 2);
          setLineHeight(height);
        }
      }
    };
    calculateHeight();
    window.addEventListener('resize', calculateHeight);
    return () => window.removeEventListener('resize', calculateHeight);
  }, [data]);

  // This calculates the scroll progress
  const handleScroll = useCallback(() => {
    if (!timelineRef.current || !completionRef.current) return;

    // --- Unchanged visibility logic ---
    const windowHeight = window.innerHeight;
    const triggerPoint = windowHeight / 2;
    const newVisibleItems = new Set<string>();
    const items = timelineRef.current.querySelectorAll('.timeline-item');
    items.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const itemId = item.getAttribute('data-id');
      if (itemId && rect.top < triggerPoint) { newVisibleItems.add(itemId); }
    });
    setVisibleItems(newVisibleItems);
    const completionRect = completionRef.current.getBoundingClientRect();
    if (completionRect.top + completionRect.height / 2 < triggerPoint) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }

    // --- Progress Calculation ---
    const firstItem = timelineRef.current.querySelector('.timeline-item');
    if (!firstItem) return;
    
    const journeyStartElement = firstItem.querySelector('.timeline-dot') || firstItem;
    const journeyEndElement = completionRef.current.querySelector('.completion-goal') || completionRef.current;
    
    const startRect = journeyStartElement.getBoundingClientRect();
    const endRect = journeyEndElement.getBoundingClientRect();

    // ✅ FIX: Calculate journey from center-to-center to match the total line height
    const journeyStartPoint = startRect.top + (startRect.height / 2) + window.scrollY;
    const journeyEndPoint = endRect.top + (endRect.height / 2) + window.scrollY;
    
    const totalJourneyDistance = journeyEndPoint - journeyStartPoint;
    const viewportMarker = window.scrollY + triggerPoint;
    const scrolledDistance = viewportMarker - journeyStartPoint;
    const progress = Math.max(0, Math.min(scrolledDistance / totalJourneyDistance, 1));
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div id="timeline-content" className="timeline-container py-20" ref={timelineRef}>
      <div className="max-w-6xl mx-auto px-6">
        <div 
          className="timeline-line"
          style={{ height: `${lineHeight}px` }}
        >
          <div 
            className="timeline-progress"
            style={{ height: `${scrollProgress * 100}%` }}
          />
        </div>

        {/* --- The rest of the JSX is unchanged --- */}
        {data.map((item, index) => (
          <div
            key={item.id}
            data-id={item.id}
            className={`timeline-item ${item.side} ${
              visibleItems.has(item.id) ? 'visible' : ''
            }`}
            style={{ transitionDelay: `${index * 0.1}s` }}
          >
            <div 
              className={`timeline-dot ${
                visibleItems.has(item.id) ? 'active' : ''
              }`}
            >
              <div className="text-nature-green w-6 h-6">{item.icon}</div>
            </div>
            <div className="timeline-content">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-nature-green/10 rounded-full mr-4 flex justify-center items-center ">
                  <div className="text-nature-green flex justify-center items-center w-18">{item.icon}</div>
                </div>
                <h3 className="text-2xl font-bold text-foreground">{item.title}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">{item.content}</p>
            </div>
          </div>
        ))}
        
        <div ref={completionRef} className="flex justify-center mt-20 mb-10">
          <div className={`completion-goal ${isCompleted ? 'completed' : ''}`}>
            <Check className={`completion-icon ${isCompleted ? 'completed' : ''}`} />
          </div>
        </div>

        {isCompleted && (
          <div className="text-center animate-fade-in-up">
            <h2 className="text-3xl font-bold text-nature-green mb-4">Parabéns! Jornada Concluída</h2>
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