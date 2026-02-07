import React, { useState } from "react"
import Confetti from "react-confetti"
import { useWindowSize } from "react-use" // We will assume standard resize hook logic or implement inline if preferred, but for simplicity I will skip external lib dependency for resize and just use window.innerWidth in a simple way or assume full width for confetti.

// Simple hook for window size to avoid extra dependency files for now
const useSize = () => {
  const [size, setSize] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })
  React.useEffect(() => {
    const handleResize = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])
  return size
}

export const ProposalCard: React.FC = () => {
  const [noCount, setNoCount] = useState(0)
  const [yesPressed, setYesPressed] = useState(false)
  const { width, height } = useSize()
  const [showModal, setShowModal] = useState(false)

  const handleNoClick = () => {
    setNoCount(noCount + 1)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const handleYesClick = () => {
    setYesPressed(true)
  }

  const getNoButtonText = () => {
    const phrases = [
      "No",
      "¿Estás segura?",
      "¿De verdad?",
      "¡Piénsalo bien!",
      "Me romperás el corazón 💔",
      "¡Mira el otro botón!",
    ]
    return phrases[Math.min(noCount, phrases.length - 1)]
  }

  return (
    <>
      {yesPressed && (
        <div className="fixed inset-0 pointer-events-none z-[999]">
          <Confetti
            width={width}
            height={height}
            numberOfPieces={500}
            recycle={false}
            gravity={0.3}
          />
        </div>
      )}

      <div className="relative w-full max-w-4xl mx-auto mt-12 mb-24">
        {/* Background Image Container with Gradient Overlay */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden z-0">
          <img
            src="https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?q=80&w=2574&auto=format&fit=crop"
            alt="Red Roses Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-love-950 via-love-900/80 to-love-900/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-love-950" />
        </div>

        <div className="relative z-10 p-8 md:p-12 lg:p-16 flex flex-col gap-8">
          {/* Tag */}
          <div className="self-start">
            <span className="bg-love-950/50 backdrop-blur border border-love-500/30 text-love-200 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              14 de Febrero
            </span>
          </div>

          {/* Headline */}
          <div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-2 drop-shadow-lg">
              Hola, Leticia...
            </h1>
          </div>

          {/* Letter Body */}
          <div className="space-y-6 text-lg md:text-xl text-love-50 font-medium leading-relaxed drop-shadow-md">
            <p>
              Desde el momento en que entraste en mi vida, todo se volvió más
              brillante. Cada risa, cada mirada, cada momento contigo es un
              regalo que atesoro.
            </p>
            <p>
              No puedo imaginar un mundo sin ti. Eres mi inspiración, mi alegría
              y mi mejor amiga. Amo la forma en que me miras. Amo tu risa, esa
              que siempre me termina haciendo feliz. Quiero que sepas que eres
              todo para mí. Contigo quiero vivir mil vidas, crear muchos
              recuerdos y compartir miles de sueños.
            </p>
            <p>Hoy, quiero hacerte una pregunta muy especial.</p>
          </div>

          {/* The Question Box */}
          <div className="glass-strong rounded-2xl p-8 mt-4 border border-love-500/40 bg-love-900/40 shadow-[0_0_40px_rgba(225,29,72,0.3)]">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-2 drop-shadow-xl">
              ¿Quieres ser mi San Valentín?
            </h2>
            <p className="text-center text-love-200 text-sm tracking-widest uppercase mb-8 opacity-80">
              Prometo hacerte la mujer más feliz del mundo
            </p>

            {yesPressed ? (
              <div className="bg-green-500/20 border border-green-500/50 text-green-100 p-6 rounded-xl text-center animate-bounce">
                <h3 className="text-2xl font-bold">
                  ¡Sabía que dirías que sí! ❤️
                </h3>
                <p className="mt-2">Te amo infinito.</p>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                <button
                  onClick={handleYesClick}
                  className="group relative px-8 py-4 bg-gradient-to-r from-love-600 to-love-500 hover:from-love-500 hover:to-love-400 text-white rounded-full font-bold text-xl shadow-xl shadow-love-600/30 transform transition-all hover:scale-105 hover:-translate-y-1 w-full sm:w-auto overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
                  <span className="relative flex items-center justify-center gap-2">
                    <span className="material-symbols-rounded animate-pulse">
                      favorite
                    </span>
                    ¡SÍ, quiero!
                  </span>
                </button>

                <button
                  onClick={handleNoClick}
                  className="px-8 py-4 bg-transparent border-2 border-love-800/50 text-love-300 hover:bg-love-900/30 hover:text-white hover:border-love-500 rounded-full font-semibold text-lg transition-all w-full sm:w-auto"
                >
                  {getNoButtonText()}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Quote */}
      <div className="text-center pb-12 opacity-60">
        <p className="text-love-200 font-serif italic tracking-widest text-sm">
          "TE AMARÉ POR MIL AÑOS MÁS..."
        </p>
      </div>

      {/* Rejection Modal */}
      {showModal && !yesPressed && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-love-950 border border-love-500 rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl animate-pulse">
            <span className="material-symbols-rounded text-6xl text-love-400 mb-4">
              sentiment_sad
            </span>
            <h3 className="text-2xl font-bold text-white mb-2">
              ¿Estás segura?
            </h3>
            <p className="text-love-200 mb-6">
              Mi corazón no lo resistiría. Por favor, piénsalo de nuevo 🥺
            </p>
            <button
              onClick={closeModal}
              className="w-full py-3 bg-white text-love-900 font-bold rounded-xl hover:bg-love-100 transition-colors"
            >
              Vale, lo pensaré...
            </button>
          </div>
        </div>
      )}
    </>
  )
}
