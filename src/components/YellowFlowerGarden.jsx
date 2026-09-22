import React, { useState } from 'react';
import { soundFx } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';

const FLOWER_TYPES = [
  { name: 'Girasol de lo Desconocido', icon: '🌻', color: '#f59e0b' },
  { name: 'Caléndula Dorada', icon: '🌼', color: '#eab308' },
  { name: 'Flor Silvestre Amarilla', icon: '✨', color: '#facc15' },
];

export default function YellowFlowerGarden() {
  const [flowers, setFlowers] = useState([
    { id: 1, x: 20, y: 35, type: 0, scale: 1 },
    { id: 2, x: 50, y: 55, type: 1, scale: 1.1 },
    { id: 3, x: 80, y: 40, type: 0, scale: 0.95 },
  ]);
  const [totalFlowersSent, setTotalFlowersSent] = useState(3);
  const [showBouquetAlert, setShowBouquetAlert] = useState(false);

  const plantFlower = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    const newType = Math.floor(Math.random() * FLOWER_TYPES.length);
    const newFlower = {
      id: Date.now() + Math.random(),
      x: Math.max(10, Math.min(90, clickX)),
      y: Math.max(15, Math.min(85, clickY)),
      type: newType,
      scale: 0.85 + Math.random() * 0.4,
    };

    soundFx.playFlowerChime(totalFlowersSent);
    setFlowers(prev => [...prev.slice(-14), newFlower]); // Keep up to 15 on screen
    setTotalFlowersSent(prev => prev + 1);

    // Subtle petal burst at click
    confetti({
      particleCount: 12,
      spread: 40,
      origin: {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      },
      colors: ['#fde047', '#facc15', '#eab308', '#ca8a04'],
      shapes: ['circle'],
      scalar: 0.8,
    });
  };

  const sendBouquetExplosion = () => {
    soundFx.playFlowerChime(10);
    setShowBouquetAlert(true);
    setTotalFlowersSent(prev => prev + 12);

    // Big festive shower of yellow petals
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#fef08a', '#facc15', '#f59e0b', '#fbbf24']
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#fef08a', '#facc15', '#f59e0b', '#fbbf24']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <div className="w-full">
      <div className="wood-card rounded-2xl p-6 sm:p-8 text-parchment-100 relative overflow-hidden border border-amber-500/30">
        
        {/* Header of Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center space-x-2 text-amberGold-400 mb-1">
              <Sparkles className="w-5 h-5 animate-pulse" />
              <span className="text-xs font-serif uppercase tracking-widest text-amberGold-400">
                Flores a la Distancia
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-parchment-50">
              El Ramo Infinito de Flores Amarillas
            </h2>
            <p className="text-sm text-parchment-300 font-body mt-1 max-w-xl">
              Dicen que ayer era el día oficial de regalarlas. Como ninguna flor física sobrevive un vuelo internacional sin marchitarse, este jardín florece cada vez que tocas la tierra.
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-forest-900/80 px-4 py-2.5 rounded-xl border border-amberGold-600/30 self-start sm:self-center">
            <span className="text-2xl">🌻</span>
            <div>
              <div className="text-xs text-parchment-400 font-serif">Flores cultivadas</div>
              <div className="text-xl font-display font-bold text-amberGold-400 leading-tight">
                {totalFlowersSent}
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Planting Meadow Area */}
        <div
          onClick={plantFlower}
          className="relative w-full h-64 sm:h-80 rounded-xl bg-gradient-to-b from-forest-900 via-forest-800 to-[#1e3325] border-2 border-dashed border-amberGold-600/40 cursor-crosshair overflow-hidden group shadow-inner transition-all hover:border-amberGold-400/70 select-none"
          title="Haz clic o toca en cualquier lugar para plantar una flor amarilla"
        >
          {/* Subtle meadow background silhouettes */}
          <div className="absolute inset-0 opacity-15 pointer-events-none flex items-end justify-around">
            <span className="text-7xl">🌾</span>
            <span className="text-6xl">🌲</span>
            <span className="text-8xl">🌾</span>
            <span className="text-6xl">🌿</span>
            <span className="text-7xl">🌾</span>
          </div>

          {/* Prompt instruction */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-forest-950/80 backdrop-blur-sm text-amberGold-300 text-xs px-4 py-1.5 rounded-full border border-amberGold-500/30 pointer-events-none shadow-md">
            ✨ Haz clic o toca en cualquier parte del prado para hacer brotar flores
          </div>

          {/* Planted Flowers */}
          {flowers.map((f) => (
            <div
              key={f.id}
              style={{
                left: `${f.x}%`,
                top: `${f.y}%`,
                transform: `translate(-50%, -50%) scale(${f.scale})`,
              }}
              className="absolute pointer-events-none animate-float-slow transition-all duration-300 drop-shadow-md"
            >
              <div className="flex flex-col items-center">
                {/* Custom glowing sunflower / yellow bloom */}
                <svg viewBox="0 0 80 80" className="w-14 h-14 filter drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]">
                  {/* Stem */}
                  <path d="M 40 50 Q 38 68 40 80" stroke="#15803d" strokeWidth="3" fill="none" />
                  {/* Leaves */}
                  <ellipse cx="33" cy="62" rx="7" ry="3" fill="#16a34a" transform="rotate(-25 33 62)" />
                  <ellipse cx="47" cy="67" rx="7" ry="3" fill="#16a34a" transform="rotate(25 47 67)" />
                  
                  {/* Petals */}
                  {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                    <ellipse
                      key={deg}
                      cx="40"
                      cy="22"
                      rx="4"
                      ry="12"
                      fill={deg % 60 === 0 ? '#fde047' : '#f59e0b'}
                      stroke="#ca8a04"
                      strokeWidth="0.8"
                      transform={`rotate(${deg} 40 40)`}
                    />
                  ))}
                  {/* Flower Center */}
                  <circle cx="40" cy="40" r="11" fill="#78350f" stroke="#451a03" strokeWidth="1.5" />
                  <circle cx="40" cy="40" r="7" fill="#92400e" opacity="0.8" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button & Alert */}
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-parchment-400 font-serif italic text-center sm:text-left">
            "Las flores que florecen en la pantalla nunca se marchitan ni necesitan agua."
          </p>

          <button
            onClick={sendBouquetExplosion}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-amberGold-500 to-amber-600 hover:from-amberGold-400 hover:to-amber-500 text-forest-950 font-display font-bold rounded-xl shadow-lg hover:shadow-amber-500/25 transition-all transform active:scale-95 flex items-center justify-center space-x-2"
          >
            <span>🌻</span>
            <span>Mandar Lluvia de Flores Amarillas</span>
          </button>
        </div>

        {showBouquetAlert && (
          <div className="mt-4 p-4 rounded-xl bg-amberGold-500/15 border border-amberGold-400/40 text-sm text-parchment-200 animate-fade-in font-body">
            🌾 <strong>Entrega especial registrada:</strong> Un ramo completo con dedicatoria directa hasta tu país. Cero aduanas, 100% garantizado.
          </div>
        )}
      </div>
    </div>
  );
}
