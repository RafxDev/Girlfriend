import React, { useState } from 'react';
import { soundFx } from '../utils/audio';
import confetti from 'canvas-confetti';

const COOKIE_NOTES = [
  "Ojalá pudieras verte aunque sea un segundo a través de mis ojos: no hay un solo ángulo en el que no te veas preciosa.",
  "Dato 100% objetivo y sin debate: eres guapísima. Deja de buscarte defectos en el espejo donde no los hay.",
  "Me encanta tu carita, tu risa y cómo te ves incluso en pijama o despeinada. Eres hermosa de verdad.",
  "Cuando te dé por dudar de cómo te ves, acuérdate de que para mí eres la mujer más atractiva de todo el mapa.",
  "Recordatorio oficial: tu cabeza a veces te miente con inseguridades raras; yo jamás te mentiría.",
  "Tienes una mirada y una presencia que llaman la atención en cualquier lugar. Créetelo de una vez, que es la verdad.",
  "No es un cumplido para quedar bien: me encantas exactamente como eres, de pies a cabeza y sin filtros."
];

export default function CookieJar() {
  const [cookiesEaten, setCookiesEaten] = useState(0);
  const [currentNote, setCurrentNote] = useState(null);
  const [isBiting, setIsBiting] = useState(false);

  const handleEatCookie = (e) => {
    soundFx.playCookieCrunch();
    setIsBiting(true);
    setCookiesEaten(prev => prev + 1);

    const randomNote = COOKIE_NOTES[cookiesEaten % COOKIE_NOTES.length];
    setCurrentNote(randomNote);

    // Spawn tiny golden crumbs
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 18,
      spread: 45,
      origin: { x, y },
      colors: ['#b45309', '#d97706', '#78350f', '#fde68a'],
      shapes: ['circle'],
      scalar: 0.6,
    });

    setTimeout(() => setIsBiting(false), 400);
  };

  return (
    <div className="parchment-card rounded-2xl p-5 sm:p-6 text-wood-900 relative flex flex-col justify-between h-full border border-amber-800/30">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🍪</span>
            <h3 className="font-display text-lg sm:text-xl font-bold text-wood-900">
              Frasco de Galletas
            </h3>
          </div>
          <span className="text-xs bg-amber-100 text-wood-800 px-2.5 py-1 rounded-full font-serif font-semibold border border-amber-300">
            Horneadas hoy
          </span>
        </div>

        <p className="text-sm font-body text-wood-800/90 mb-4 leading-relaxed">
          Recién salidas del horno de lo Desconocido. Crujientes por fuera, suaves por dentro y con 0% de cursilería barata.
        </p>

        {/* Cookie Visual Display */}
        <div className="flex justify-center my-3">
          <div
            onClick={handleEatCookie}
            className={`group relative cursor-pointer select-none transition-transform duration-200 ${
              isBiting ? 'scale-90' : 'hover:scale-105'
            }`}
            title="¡Toca para dar un mordisco!"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 border-4 border-amber-800/60 shadow-lg relative flex items-center justify-center">
              {/* Chocolate chips */}
              <div className="absolute top-4 left-6 w-3 h-3 bg-wood-900 rounded-full opacity-90 shadow-inner" />
              <div className="absolute top-8 right-6 w-3.5 h-3 bg-wood-900 rounded-full opacity-90 shadow-inner" />
              <div className="absolute bottom-5 left-8 w-3 h-3.5 bg-wood-900 rounded-full opacity-90 shadow-inner" />
              <div className="absolute bottom-6 right-8 w-2.5 h-2.5 bg-wood-900 rounded-full opacity-90 shadow-inner" />
              <div className="absolute top-11 left-11 w-3 h-3 bg-wood-900 rounded-full opacity-90 shadow-inner" />

              {/* Bite cutout effect when eaten */}
              {cookiesEaten > 0 && (
                <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-parchment-100 border border-amber-800/20" />
              )}
            </div>

            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-wood-900 text-amber-300 text-xs px-2.5 py-0.5 rounded-full font-serif shadow whitespace-nowrap">
              ¡Morder galleta!
            </div>
          </div>
        </div>

        {/* Note from inside the cookie */}
        {currentNote && (
          <div className="mt-5 p-3 rounded-xl bg-amber-50/90 border border-amber-300/80 text-xs sm:text-sm font-serif italic text-wood-900 animate-fade-in shadow-inner">
            <span className="font-bold text-amber-800 not-italic block mb-0.5">Nota encontrada en la galleta:</span>
            "{currentNote}"
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-amber-900/10 flex items-center justify-between text-xs text-wood-700">
        <span>Galletas disfrutadas: <strong>{cookiesEaten}</strong></span>
        <span>Reabastecimiento infinito</span>
      </div>
    </div>
  );
}
