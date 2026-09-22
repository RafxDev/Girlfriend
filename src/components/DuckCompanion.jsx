import React, { useState } from 'react';
import { soundFx } from '../utils/audio';
import confetti from 'canvas-confetti';

const DUCK_QUOTES = [
  "¡Cuac! Confirmo que la distancia está a muchos kilómetros, pero este picnic lo cruza todo.",
  "Tengo una teoría científica: una mandarina al día mantiene a la Bestia de lo Desconocido lejos.",
  "¿Te sobra una galletita? Es para un experimento nutricional de patos de bosque.",
  "Cuac. 10/10 tu novio haciendo una web en vez de mandar una flor que se marchitaría en la aduana.",
  "Dicen que en lo Desconocido una flor amarilla da un buff de +100 de ánimo automático.",
  "Por cierto... ¿ya comiste hoy o solo vienes a acariciarme? (Ojo: no me quejo).",
  "Wirt y Greg aprobaron este rincón otoñal con sello oficial de la tetera.",
  "Pato con gorrito cónico reportándose como escolta oficial a través del mapa.",
  "¡Cuac! Confirmo que eres la persona más guapa de tu país y del mío juntos. Fin del comunicado.",
  "Dato curioso: los patos no sabemos de fronteras ni husos horarios. Solo de galletas ricas."
];

export default function DuckCompanion() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [petCount, setPetCount] = useState(0);
  const [isWiggling, setIsWiggling] = useState(false);
  const [bubbleVisible, setBubbleVisible] = useState(true);

  const handleDuckClick = (e) => {
    soundFx.playDuckQuack();
    setIsWiggling(true);
    setPetCount(prev => prev + 1);

    // Pick next quote
    setQuoteIndex(prev => (prev + 1) % DUCK_QUOTES.length);
    setBubbleVisible(true);

    // Reset wiggle animation
    setTimeout(() => setIsWiggling(false), 500);

    // Easter egg every 5 clicks
    if ((petCount + 1) % 5 === 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 25,
        spread: 60,
        origin: { x, y },
        colors: ['#fbbf24', '#f59e0b', '#fdba74', '#ca8a04'],
        shapes: ['circle'],
        scalar: 0.9,
      });
    }
  };

  return (
    <div className="relative flex flex-col items-center select-none">
      {/* Speech bubble */}
      <div 
        className={`mb-3 relative max-w-xs sm:max-w-sm px-4 py-3 rounded-2xl parchment-card border-amber-800/40 text-wood-900 transition-all duration-300 transform ${
          bubbleVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'
        }`}
      >
        <p className="text-sm sm:text-base font-body leading-snug font-medium italic text-wood-900">
          "{DUCK_QUOTES[quoteIndex]}"
        </p>
        {/* Pointer arrow */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-parchment-200" />
      </div>

      {/* Duck Character Container */}
      <div
        onClick={handleDuckClick}
        className={`group relative cursor-pointer transition-transform duration-200 active:scale-95 ${
          isWiggling ? 'animate-quack-wiggle' : 'hover:scale-105'
        }`}
        title="¡Hazme clic para acariciarme y escucharme!"
      >
        {/* Glow halo behind duck */}
        <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl group-hover:bg-amber-400/30 transition-all" />

        {/* Custom Hand-Crafted SVG Duck with Wirt's Cone Hat & Fall Scarf */}
        <svg
          viewBox="0 0 160 160"
          className="w-36 h-36 sm:w-44 sm:h-44 drop-shadow-2xl relative z-10 transition-transform"
        >
          {/* Shadow under duck */}
          <ellipse cx="80" cy="142" rx="50" ry="12" fill="rgba(0, 0, 0, 0.35)" />

          {/* Duck Body */}
          <ellipse cx="80" cy="100" rx="42" ry="34" fill="#fef08a" />
          {/* Wing */}
          <path
            d="M 60 92 C 50 82, 35 100, 52 114 C 70 125, 95 118, 92 102 Z"
            fill="#fde047"
            stroke="#ca8a04"
            strokeWidth="2"
          />

          {/* Duck Tail */}
          <path
            d="M 38 95 C 26 88, 20 84, 25 78 C 34 84, 44 90, 48 94 Z"
            fill="#fde047"
            stroke="#ca8a04"
            strokeWidth="1.5"
          />

          {/* Cozy Fall Knit Scarf (Over the Garden Wall style) */}
          <path
            d="M 68 88 C 76 96, 102 96, 114 84 C 117 80, 112 75, 102 77 C 90 79, 74 78, 68 88 Z"
            fill="#b91c1c"
          />
          {/* Scarf tail */}
          <path
            d="M 98 84 C 104 94, 108 108, 112 116 C 116 117, 122 114, 118 104 C 114 94, 108 84, 102 82 Z"
            fill="#991b1b"
            stroke="#7f1d1d"
            strokeWidth="1"
          />

          {/* Duck Head */}
          <circle cx="106" cy="68" r="26" fill="#fef08a" />

          {/* Cute Big Eye */}
          <circle cx="116" cy="62" r="5.5" fill="#1c1917" />
          <circle cx="118" cy="60" r="2" fill="#ffffff" />

          {/* Duck Beak */}
          <path
            d="M 126 66 Q 146 70 134 78 Q 120 78 122 72 Z"
            fill="#f97316"
            stroke="#c2410c"
            strokeWidth="1.5"
          />

          {/* Wirt's Red Pointy Gnome Hat 🌲 */}
          <path
            d="M 88 56 L 108 8 L 126 50 Z"
            fill="#dc2626"
            stroke="#991b1b"
            strokeWidth="1.5"
          />
          {/* Hat rim */}
          <ellipse cx="106" cy="53" rx="20" ry="5" fill="#b91c1c" />

          {/* Tiny Yellow Flower on Hat band */}
          <circle cx="118" cy="51" r="4.5" fill="#eab308" />
          <circle cx="118" cy="51" r="2" fill="#78350f" />

          {/* Duck Feet */}
          <path
            d="M 72 132 L 68 142 L 80 142 Z"
            fill="#ea580c"
            stroke="#c2410c"
            strokeWidth="1"
          />
          <path
            d="M 92 132 L 88 142 L 100 142 Z"
            fill="#ea580c"
            stroke="#c2410c"
            strokeWidth="1"
          />
        </svg>

        {/* Small "¡Tócame!" tag */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-forest-900/90 text-amberGold-400 text-xs px-2.5 py-0.5 rounded-full border border-amberGold-600/40 shadow">
          {petCount === 0 ? "¡Toca al patito!" : `Mimos dados: ${petCount} 🦆`}
        </div>
      </div>
    </div>
  );
}
