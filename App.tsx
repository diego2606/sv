import React, { useState, useEffect } from "react"
import { MusicWidget } from "./components/MusicWidget"
import { StoryCard } from "./components/StoryCard"
import { ProposalCard } from "./components/ProposalCard"
import { YouTubePlayer } from "./components/YouTubePlayer"
import { AudioPlayer } from "./components/AudioPlayer"
import { SongWidget } from "./components/SongWidget"
import { PLAYLIST } from "./types"

const App: React.FC = () => {
  const [hasStarted, setHasStarted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(50) // 0-100

  const handleStart = () => {
    setHasStarted(true)
    setIsPlaying(true)
  }

  const currentSong = PLAYLIST[currentSongIndex]

  // Reset currentTime when song changes
  useEffect(() => {
    setCurrentTime(0)
  }, [currentSongIndex])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % PLAYLIST.length)
    setIsPlaying(true) // Auto play next
  }

  const handleSongSelect = (index: number) => {
    if (currentSongIndex === index) {
      // If same song, toggle play/pause
      setIsPlaying(!isPlaying)
    } else {
      // If different song, switch and play
      setCurrentSongIndex(index)
      setCurrentTime(0)
      setIsPlaying(true)
    }
  }

  const handleProgress = (curr: number, dur: number) => {
    setCurrentTime(curr)
  }

  const handleSongEnded = () => {
    handleNext()
  }

  // Welcome Screen
  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-love-950 text-white flex items-center justify-center relative overflow-hidden">
        {/* Background */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-love-900 via-love-950 to-black" />
          <div
            className="absolute top-[20%] left-[15%] text-love-500/10 text-9xl animate-float"
            style={{ animationDelay: "0s" }}
          >
            ♥
          </div>
          <div
            className="absolute top-[50%] right-[10%] text-love-500/10 text-7xl animate-float"
            style={{ animationDelay: "2s" }}
          >
            ♥
          </div>
          <div
            className="absolute bottom-[15%] left-[20%] text-love-500/10 text-6xl animate-float"
            style={{ animationDelay: "1s" }}
          >
            ♥
          </div>
        </div>

        {/* Welcome Content */}
        <div className="relative z-10 text-center px-6 max-w-md">
          <div className="mb-8 animate-float">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-love-500 to-love-700 rounded-full flex items-center justify-center shadow-2xl shadow-love-500/50">
              <span className="material-symbols-rounded text-white text-6xl">
                favorite
              </span>
            </div>
          </div>

          <h1 className="font-serif text-5xl font-bold mb-4 bg-gradient-to-r from-love-300 to-love-500 bg-clip-text text-transparent">
            Para Leticia
          </h1>

          <p className="text-love-200 text-lg mb-8 leading-relaxed">
            Tengo una pregunta muy especial que hacerte
          </p>

          <button
            onClick={handleStart}
            className="group relative px-8 py-4 bg-gradient-to-r from-love-500 to-love-600 rounded-full font-semibold text-white shadow-lg shadow-love-500/50 hover:shadow-xl hover:shadow-love-500/70 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span className="flex items-center gap-2">
              Ver la pregunta
              <span className="material-symbols-rounded group-hover:translate-x-1 transition-transform">
                favorite
              </span>
            </span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-love-950 text-white selection:bg-love-500 selection:text-white overflow-x-hidden relative">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-love-900 via-love-950 to-black opacity-80" />
        {/* Floating Hearts Animation */}
        <div
          className="absolute top-[10%] left-[10%] text-love-500/10 text-6xl animate-float"
          style={{ animationDelay: "0s" }}
        >
          ♥
        </div>
        <div
          className="absolute top-[30%] right-[20%] text-love-500/10 text-4xl animate-float"
          style={{ animationDelay: "2s" }}
        >
          ♥
        </div>
        <div
          className="absolute bottom-[20%] left-[15%] text-love-500/10 text-8xl animate-float"
          style={{ animationDelay: "4s" }}
        >
          ♥
        </div>
        <div
          className="absolute top-[60%] right-[10%] text-love-500/10 text-5xl animate-float"
          style={{ animationDelay: "1s" }}
        >
          ♥
        </div>
      </div>

      {/* Conditional Player: YouTube or Audio */}
      {currentSong.youtubeId ? (
        <YouTubePlayer
          key={`youtube-${currentSong.id}`}
          videoId={currentSong.youtubeId}
          isPlaying={isPlaying}
          volume={volume}
          onProgress={handleProgress}
          onEnded={handleSongEnded}
        />
      ) : currentSong.audioUrl ? (
        <AudioPlayer
          key={`audio-${currentSong.id}`}
          audioUrl={currentSong.audioUrl}
          isPlaying={isPlaying}
          volume={volume}
          onProgress={handleProgress}
          onEnded={handleSongEnded}
        />
      ) : null}

      <header className="relative z-10 p-6 flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="bg-white/10 p-2 rounded-full backdrop-blur-md">
            <span className="material-symbols-rounded text-love-400">
              favorite
            </span>
          </div>
          <span className="font-serif font-bold text-xl tracking-tight text-love-100">
            San Valentín
          </span>
        </div>
        <div className="text-sm font-medium text-love-300/80 flex items-center gap-1 cursor-default hover:text-love-200 transition-colors">
          Para Leticia{" "}
          <span className="material-symbols-rounded text-base">
            arrow_forward
          </span>
        </div>
      </header>

      <main className="relative z-10 px-4 pb-20 pt-8 max-w-6xl mx-auto flex flex-col items-center">
        <MusicWidget
          playlist={PLAYLIST}
          currentSongIndex={currentSongIndex}
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={currentSong.duration}
          onPlayPause={handlePlayPause}
          onNext={handleNext}
          onSongSelect={handleSongSelect}
        />

        <div className="space-y-6 w-full">
          <StoryCard
            title="Nuestra Historia"
            icon="history_edu"
            imageLabel="Foto de Nuestra Historia"
            imageUrl="img/IMG_6422.jpg"
            text="Todo comenzó de la manera más inesperada. Recuerdo el día exacto en que nos conocimos, el primer mensaje. Cada capítulo que hemos escrito juntos ha sido mejor que el anterior, llenando las páginas de mi vida con colores que no sabía que existían."
            delay="0.1s"
          />

          <StoryCard
            title="Nuestro Amor"
            icon="volunteer_activism"
            imageLabel="Foto de Nuestro Amor"
            imageUrl="img/IMG_20251220_233551.jpg"
            text="No es solo amor, es complicidad, es paz y es hogar. Contigo he aprendido lo que significa amar sin medidas. Me has enseñado a ver la vida con otros ojos y a valorar cada pequeño detalle."
            delay="0.2s"
            reverse={true}
          />
        </div>

        <ProposalCard />
      </main>

      {/* Floating Action Button for Music Toggle if user scrolls down far? Optional, sticking to design for now. */}
    </div>
  )
}

export default App
