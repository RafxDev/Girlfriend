import React, { useState } from 'react';
import { Volume2, VolumeX, Music, Disc } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handleToggleMusic = () => {
    const active = soundFx.toggleBackgroundMusic();
    setIsPlaying(active);
  };

  const handleToggleMute = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Background synth melody button */}
      <button
        onClick={handleToggleMusic}
        className={`group flex items-center space-x-2 px-3.5 py-2 rounded-full border transition-all duration-300 shadow-md ${
          isPlaying
            ? 'bg-amberGold-600/30 border-amberGold-400 text-amberGold-300 shadow-amberGold-500/20'
            : 'bg-forest-900/80 border-forest-700 text-parchment-300 hover:text-amberGold-300 hover:border-amberGold-600/50'
        }`}
        title={isPlaying ? "Pausar melodía otoñal" : "Reproducir melodía de Más Allá del Jardín"}
      >
        <Disc className={`w-4 h-4 ${isPlaying ? 'animate-spin' : ''}`} />
        <span className="text-xs font-serif font-semibold">
          {isPlaying ? "Melodía del Bosque 🎵" : "Música Ambiental 🍂"}
        </span>
      </button>

      {/* Mute SFX button */}
      <button
        onClick={handleToggleMute}
        className="p-2 rounded-full bg-forest-900/80 border border-forest-700 text-parchment-300 hover:text-amberGold-300 hover:border-amberGold-600/50 transition-all shadow-md"
        title={isMuted ? "Activar efectos de sonido" : "Silenciar efectos"}
      >
        {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
      </button>
    </div>
  );
}
