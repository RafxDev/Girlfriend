import React from 'react';
import { Flame, Moon, Sun } from 'lucide-react';

export default function LanternToggle({ isNightMode, onToggle }) {
  return (
    <div className="flex items-center space-x-3">
      <button
        onClick={onToggle}
        className={`group relative flex items-center space-x-2 px-3.5 py-2 rounded-full border transition-all duration-300 shadow-md ${
          isNightMode
            ? 'bg-amber-950/80 border-amber-500/50 text-amber-300 shadow-amber-500/20'
            : 'bg-forest-900/80 border-amberGold-600/40 text-amberGold-300 hover:border-amberGold-400'
        }`}
        title={isNightMode ? "Cambiar a Atardecer Dorado" : "Cambiar a Noche con Linterna"}
      >
        {/* Lantern SVG Icon */}
        <div className={`relative transition-transform duration-300 ${isNightMode ? 'scale-110' : ''}`}>
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
            {/* Lantern Cap */}
            <path d="M12 2a2 2 0 0 0-2 2h4a2 2 0 0 0-2-2zM7 6h10l-1 3H8L7 6zm0 4h10v7H7v-7zm1 8h8l-1 2H9l-1-2z" />
          </svg>
          {isNightMode && (
            <span className="absolute inset-0 bg-amber-400/40 blur-sm rounded-full animate-pulse" />
          )}
        </div>

        <span className="text-xs font-serif font-semibold tracking-wide">
          {isNightMode ? "Linterna Encendida 🏮" : "Atardecer de Bosque 🍂"}
        </span>
      </button>
    </div>
  );
}
