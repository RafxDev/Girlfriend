import React, { useState } from 'react';
import AutumnCanvas from './components/AutumnCanvas';
import DuckCompanion from './components/DuckCompanion';
import CookieJar from './components/CookieJar';
import TangerineBasket from './components/TangerineBasket';
import YellowFlowerGarden from './components/YellowFlowerGarden';
import LetterScroll from './components/LetterScroll';
import LanternToggle from './components/LanternToggle';
import MusicPlayer from './components/MusicPlayer';
import { Compass, Sparkles, Heart } from 'lucide-react';

export default function App() {
  const [isNightMode, setIsNightMode] = useState(false);

  return (
    <div className={`min-h-screen relative transition-colors duration-1000 ${
      isNightMode ? 'bg-[#09120e]' : 'bg-[#0d1a13]'
    }`}>
      {/* Background Falling Autumn Leaves & Fireflies Canvas */}
      <AutumnCanvas isNightMode={isNightMode} />

      {/* Atmospheric Vignette and Ambient Gradients */}
      <div className={`fixed inset-0 pointer-events-none transition-opacity duration-1000 ${
        isNightMode ? 'opacity-80' : 'opacity-40'
      }`}>
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-forest-950/40 to-forest-950/90" />
      </div>

      {/* Main Content Layout */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 flex flex-col min-h-screen">
        
        {/* Top Floating Control Bar */}
        <header className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-amberGold-600/20 mb-8 sm:mb-12">
          <div className="flex items-center space-x-2 text-amberGold-400">
            <Compass className="w-5 h-5 text-amberGold-500 animate-spin" style={{ animationDuration: '30s' }} />
            <span className="font-display font-bold text-sm tracking-wider text-parchment-200 uppercase">
              Expedición a lo Desconocido
            </span>
          </div>

          <div className="flex items-center flex-wrap gap-2 sm:gap-3">
            <MusicPlayer />
            <LanternToggle
              isNightMode={isNightMode}
              onToggle={() => setIsNightMode(!isNightMode)}
            />
          </div>
        </header>

        {/* Hero Section / Storybook Title */}
        <section className="text-center my-4 sm:my-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amberGold-500/10 border border-amberGold-500/30 text-amberGold-300 text-xs sm:text-sm font-serif">
            <Sparkles className="w-4 h-4 text-amberGold-400" />
            <span>Un detalle que cruza fronteras y zonas horarias</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-parchment-50 tracking-wide drop-shadow-md">
            Para Vanessa
          </h1>

          <p className="font-serif italic text-lg sm:text-2xl text-amberGold-300/90 max-w-2xl mx-auto leading-relaxed">
            "Donde el bosque de lo desconocido es grande, pero tenerte cerca de corazón hace que todo valga la pena."
          </p>

          <p className="font-body text-xs sm:text-sm text-parchment-300/80 max-w-lg mx-auto">
            (Flores amarillas, galletas recién salidas del horno, mandarinas de temporada y un pato con sombrero cono para cuidarte).
          </p>
        </section>

        {/* Centerpiece: The Duck Guardian in the Woods */}
        <section className="my-8 sm:my-12">
          <DuckCompanion />
        </section>

        {/* The Picnic Table: Cookies & Tangerines Side-by-Side */}
        <section className="my-8">
          <div className="text-center mb-6">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-parchment-100">
              El Picnic de lo Desconocido
            </h2>
            <p className="font-serif italic text-sm text-amberGold-300/80 mt-1">
              Todo lo que necesitas para una pausa perfecta en medio del viaje.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            <CookieJar />
            <TangerineBasket />
          </div>
        </section>

        {/* The Endless Yellow Flower Garden */}
        <section className="my-8 sm:my-12">
          <YellowFlowerGarden />
        </section>

        {/* The Sincere Letter & WoW Postscript */}
        <section className="my-8 sm:my-12">
          <LetterScroll />
        </section>

        {/* Footer */}
        <footer className="mt-auto pt-10 pb-6 text-center border-t border-amberGold-600/20 text-parchment-400/80 space-y-2 font-serif text-xs sm:text-sm">
          <p className="flex items-center justify-center space-x-1.5 text-base sm:text-lg">
            <span className="font-serif italic text-parchment-200">Para Vanessa,</span>
            <strong className="text-amberGold-400 font-display tracking-wide font-bold">mi amor</strong>
            <span>🍂</span>
          </p>
          <p className="text-xs text-parchment-500">
            Inspirado en el mundo de <em>Más allá del jardín (Over the Garden Wall)</em> &bull; Flores que no se marchitan
          </p>
        </footer>

      </div>
    </div>
  );
}
