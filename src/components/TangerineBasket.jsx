import React, { useState } from 'react';
import { soundFx } from '../utils/audio';
import confetti from 'canvas-confetti';

const TANGERINE_MESSAGES = [
  "Gajo 1: +50 de Vitamina C y un recordatorio de que eres la persona más genial que conozco.",
  "Gajo 2: Mandarina 100% dulce garantizada, sin semillas molestas.",
  "Gajo 3: El olor a mandarina recién pelada reduce el estrés (y hablar contigo también).",
  "Gajo 4: Pequeño sol comestible. Combina exactamente con las flores amarillas.",
  "Gajo 5: Imagina que te paso la mitad ya pelada y sin esas hebras blancas raras.",
  "Gajo 6: Buff de energía: Hoy todo va a salir bien, paso a pasito."
];

export default function TangerineBasket() {
  const [segmentsPeeled, setSegmentsPeeled] = useState(0);
  const [activeMessage, setActiveMessage] = useState(null);
  const [isSqueezing, setIsSqueezing] = useState(false);

  const handlePeelTangerine = (e) => {
    soundFx.playCitrusPluck();
    setIsSqueezing(true);
    setSegmentsPeeled(prev => prev + 1);

    const msg = TANGERINE_MESSAGES[segmentsPeeled % TANGERINE_MESSAGES.length];
    setActiveMessage(msg);

    // Particle burst of bright orange and gold
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 20,
      spread: 50,
      origin: { x, y },
      colors: ['#ea580c', '#fb923c', '#fdba74', '#facc15'],
      shapes: ['circle'],
      scalar: 0.7,
    });

    setTimeout(() => setIsSqueezing(false), 300);
  };

  return (
    <div className="parchment-card rounded-2xl p-5 sm:p-6 text-wood-900 relative flex flex-col justify-between h-full border border-amber-800/30">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🍊</span>
            <h3 className="font-display text-lg sm:text-xl font-bold text-wood-900">
              Cesta de Mandarinas
            </h3>
          </div>
          <span className="text-xs bg-orange-100 text-orange-950 px-2.5 py-1 rounded-full font-serif font-semibold border border-orange-300">
            Cosecha fresca
          </span>
        </div>

        <p className="text-sm font-body text-wood-800/90 mb-4 leading-relaxed">
          Cítricas, dulces y listas para pelar. Cada gajo viene con un buff de energía para tu día.
        </p>

        {/* Tangerine Visual */}
        <div className="flex justify-center my-3">
          <div
            onClick={handlePeelTangerine}
            className={`group relative cursor-pointer select-none transition-transform duration-200 ${
              isSqueezing ? 'scale-90 rotate-6' : 'hover:scale-105'
            }`}
            title="¡Toca para pelar un gajo!"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-400 border-4 border-orange-700/50 shadow-lg relative flex items-center justify-center">
              {/* Little Green Stem and Leaf */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center">
                <div className="w-1.5 h-3 bg-wood-900 rounded-sm" />
                <div className="w-4 h-2 bg-emerald-700 rounded-full rotate-12 -ml-1 border border-emerald-900/40" />
              </div>

              {/* Citrus segment lines */}
              <div className="text-center font-display font-bold text-white/90 text-sm tracking-wider drop-shadow">
                🍊 x {segmentsPeeled}
              </div>
            </div>

            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-orange-800 text-amber-100 text-xs px-2.5 py-0.5 rounded-full font-serif shadow whitespace-nowrap">
              ¡Pelar gajito!
            </div>
          </div>
        </div>

        {/* Message */}
        {activeMessage && (
          <div className="mt-5 p-3 rounded-xl bg-orange-50/90 border border-orange-300/80 text-xs sm:text-sm font-serif italic text-wood-900 animate-fade-in shadow-inner">
            <span className="font-bold text-orange-900 not-italic block mb-0.5">Vitamina C activada:</span>
            "{activeMessage}"
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-amber-900/10 flex items-center justify-between text-xs text-wood-700">
        <span>Gajos pelados: <strong>{segmentsPeeled}</strong></span>
        <span>Sin semillas molestas</span>
      </div>
    </div>
  );
}
