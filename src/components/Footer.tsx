import { Leaf, Heart, Globe } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-nature-green text-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Mission */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <Leaf className="w-8 h-8 mr-3" />
              <h3 className="text-2xl font-bold">Nossa Missão</h3>
            </div>
            <p className="text-green-100 leading-relaxed">
              Educar e conscientizar sobre a importância da preservação ambiental 
              para um futuro sustentável.
            </p>
          </div>

          {/* Values */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 mr-3" />
              <h3 className="text-2xl font-bold">Nossos Valores</h3>
            </div>
            <p className="text-green-100 leading-relaxed">
              Sustentabilidade, educação, responsabilidade e amor pela natureza 
              guiam todas as nossas ações.
            </p>
          </div>

          {/* Impact */}
          <div className="text-center md:text-right">
            <div className="flex items-center justify-center md:justify-end mb-4">
              <Globe className="w-8 h-8 mr-3" />
              <h3 className="text-2xl font-bold">Nosso Impacto</h3>
            </div>
            <p className="text-green-100 leading-relaxed">
              Trabalhamos para criar uma geração consciente sobre a importância 
              da biodiversidade.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-green-400 pt-8 text-center">
          <p className="text-green-100 mb-4">
            © 2024 Educação Ambiental - Preservação de Espécies e Fauna
          </p>
          <p className="text-green-200 text-sm">
            Construído com 💚 para um planeta melhor
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;