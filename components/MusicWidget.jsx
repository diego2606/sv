import React from "react"

const formatTime = (time) => {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
}

export const MusicWidget = ({
  playlist,
  currentSongIndex,
  isPlaying,
  currentTime,
  duration,
  onPlayPause,
  onNext,
  onSongSelect,
}) => {
  const currentSong = playlist[currentSongIndex]
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="w-full max-w-xl mx-auto mb-12 relative z-50">
      {/* Message */}
      <p className="text-center text-love-200 text-sm mb-3 font-medium">
        Escoge la canción que más desees para este momento 💕
      </p>

      <div className="glass rounded-2xl p-4 shadow-2xl border-t border-white/20">
        <div className="flex items-center gap-4">
          {/* Mini Playlist Selector */}
          <div className="flex flex-col gap-3">
            {playlist.map((song, index) => (
              <button
                key={song.id}
                onClick={() => onSongSelect(index)}
                className={`relative group transition-all duration-300 flex items-center gap-2
                  ${
                    currentSongIndex === index
                      ? "opacity-100"
                      : "opacity-60 hover:opacity-100"
                  }`}
                title={`${song.title} - ${song.artist}`}
              >
                <img
                  src={song.coverUrl}
                  alt={song.title}
                  className={`rounded-lg object-cover shadow-md transition-all
                    ${
                      currentSongIndex === index
                        ? "w-12 h-12 ring-2 ring-love-400 shadow-love-500/50"
                        : "w-10 h-10 hover:ring-2 hover:ring-white/30"
                    }
                    ${currentSongIndex === index && isPlaying ? "animate-pulse-slow" : ""}
                  `}
                />
                {/* Playing indicator */}
                {currentSongIndex === index && isPlaying && (
                  <div
                    className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg"
                    style={{
                      width: currentSongIndex === index ? "48px" : "40px",
                      height: currentSongIndex === index ? "48px" : "40px",
                    }}
                  >
                    <span className="material-symbols-rounded text-white text-sm drop-shadow-lg">
                      graphic_eq
                    </span>
                  </div>
                )}
                {/* Song name */}
                <span
                  className={`text-xs truncate max-w-[80px] transition-colors
                  ${
                    currentSongIndex === index
                      ? "text-love-200 font-semibold"
                      : "text-love-300/80 font-medium"
                  }`}
                >
                  {song.title}
                </span>
              </button>
            ))}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-bold text-sm truncate flex items-center gap-2">
              {currentSong.title}
              <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-love-200">
                NOW PLAYING
              </span>
            </h3>
            <p className="text-love-200 text-xs truncate">
              {currentSong.artist}
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={onNext}
              className="text-white/60 hover:text-white transition-colors"
              title="Next Song"
            >
              <span className="material-symbols-rounded text-xl">
                skip_next
              </span>
            </button>
            <button
              onClick={onPlayPause}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all active:scale-95"
            >
              <span className="material-symbols-rounded text-white text-xl">
                {isPlaying ? "pause" : "play_arrow"}
              </span>
            </button>
          </div>
        </div>

        {/* Progress Bar Container */}
        <div className="mt-4 flex items-center gap-3">
          {/* Album Thumbnail Tiny */}
          <div className="w-8 h-8 rounded overflow-hidden shadow-inner hidden sm:block">
            <img
              src={currentSong.coverUrl}
              alt="Cover"
              className="w-full h-full object-cover opacity-80"
            />
          </div>

          <div className="flex-1 flex flex-col justify-center gap-1">
            <div className="flex justify-between text-[10px] text-love-300/80 font-medium tracking-wider">
              <span>{currentSong.artist}</span>
              <span>
                {formatTime(currentTime)} /{" "}
                {formatTime(duration || currentSong.duration)}
              </span>
            </div>

            <div className="relative h-1 bg-white/10 rounded-full overflow-hidden w-full">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-love-400 to-love-600 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
