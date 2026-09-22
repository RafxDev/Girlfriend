import React, { useState } from 'react';
import { Scroll, Feather, Swords, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LetterScroll() {
  const [questAccepted, setQuestAccepted] = useState(false);

  const handleAcceptQuest = () => {
    setQuestAccepted(true);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#3b82f6', '#93c5fd', '#fbbf24', '#f59e0b']
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-8">
      {/* Vintage Storybook Parchment Scroll */}
      <div className="parchment-card rounded-2xl p-7 sm:p-10 text-wood-900 border-2 border-amber-800/40 relative shadow-2xl">
        
        {/* Top Scroll Ribbon / Seal */}
        <div className="flex items-center justify-between border-b border-amber-900/20 pb-4 mb-6">
          <div className="flex items-center space-x-2 text-wood-800">
            <Feather className="w-5 h-5 text-amber-800" />
            <span className="text-xs uppercase font-serif tracking-widest font-semibold text-amber-900">
              Desde el otro lado del mapa
            </span>
          </div>
          <div className="text-xs font-serif text-wood-800 bg-amber-200/70 px-3 py-1 rounded-full border border-amber-400/60 font-semibold">
            Para Vanessa, mi amor 🍂
          </div>
        </div>

        {/* Letter Body */}
        <div className="space-y-4 font-serif text-base sm:text-lg leading-relaxed text-wood-900">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-wood-900 tracking-wide text-center sm:text-left mb-4">
            Hola, Vanessa.
          </h2>

          <p>
            Sé que ayer medio mundo andaba con el tema de las flores amarillas. Y la verdad, tenerte a la distancia no es lo más cómodo cuando uno quisiera simplemente verte en persona, invitarte algo y pasar el rato juntos sin una pantalla de por medio.
          </p>

          <p>
            Como mandar un ramo físico a otro país termina en flores marchitas en la aduana, preferí armarte este rincón propio con las cosas que te gustan: un pato de guardia, galletas y mandarinas.
          </p>

          <p>
            Y de paso, quería decirte algo directo y sin rodeos: sé que a veces te cuesta verte al espejo y te tiras abajo sola, pero estás muy equivocada. Eres hermosa, me encantas exactamente como eres y no tienes nada que criticarte. Ojalá te vieras aunque sea un segundo como te veo yo.
          </p>

          <p>
            Cero discursos cursis ni cosas exageradas: me importas un montón, me encanta hablar contigo todos los días y valoro muchísimo tenerte conmigo.
          </p>

          <p className="pt-2 font-display font-bold text-wood-900 text-right text-lg sm:text-xl">
            Para Vanessa, mi amor.
          </p>
        </div>

        {/* World of Warcraft Quest / Postdata Box */}
        <div className="mt-8 pt-6 border-t-2 border-dashed border-amber-800/30">
          <div className="rounded-xl bg-gradient-to-r from-[#1c1917] via-[#292524] to-[#1c1917] text-amber-100 p-5 sm:p-6 border border-amber-600/40 shadow-xl relative overflow-hidden">
            
            {/* Background subtle horde/alliance badge or glow */}
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
              <Swords className="w-28 h-28 text-amber-400" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-xl">⚔️</span>
                <span className="text-xs uppercase tracking-widest font-display font-bold text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded border border-amber-500/30">
                  Misión Especial Disponible
                </span>
              </div>

              <h3 className="font-display text-lg sm:text-xl font-bold text-amber-200 mb-2">
                Posdata Innegociable:
              </h3>

              <p className="font-body text-sm sm:text-base text-stone-300 leading-relaxed mb-4">
                <strong>"Posdata: Juega World of Warcraft conmigo, por favor."</strong>
                <br />
                <span className="text-xs text-stone-400 italic block mt-1">
                  (Prometo tanquear a los monstruos, compartir el botín, revivirte si te caes de un risco y no dejar que los murlocs te rodeen. Azeroth nos espera).
                </span>
              </p>

              {/* Quest Accept Button */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                {!questAccepted ? (
                  <button
                    onClick={handleAcceptQuest}
                    className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-stone-950 font-display font-bold rounded-lg shadow-md hover:shadow-amber-500/30 transition-all transform active:scale-95 flex items-center justify-center space-x-2 text-sm"
                  >
                    <Swords className="w-4 h-4" />
                    <span>¡Aceptar Misión de WoW!</span>
                  </button>
                ) : (
                  <div className="flex items-center space-x-2 text-emerald-400 font-display font-bold text-sm bg-emerald-950/70 px-4 py-2 rounded-lg border border-emerald-500/40 animate-fade-in">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>¡Misión Aceptada! Quedas formalmente comprometida a crear tu personaje.</span>
                  </div>
                )}
                
                <span className="text-xs text-stone-400 font-serif">
                  Recompensa: Risas aseguradas y +500 de diversión compartida.
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
