import React from "react"

export const SongWidget = ({
  song,
  isActive,
  isPlaying,
  onSelect,
}) => {
  return (
    <div
      onClick={onSelect}
      className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 group
        ${
          isActive
            ? "bg-gradient-to-br from-love-500/30 to-love-700/30 ring-2 ring-love-400 shadow-lg shadow-love-500/20 scale-105"
            : "bg-white/5 hover:bg-white/10 hover:scale-102"
        }`}
    >
      <div className="p-4">
        {/* Album Cover */}
        <div className="relative mb-3">
          <img
            src={song.coverUrl}
            alt={song.title}
            className={`w-full aspect-square rounded-lg object-cover shadow-md transition-transform duration-300
              ${isActive && isPlaying ? "scale-105" : ""}
            `}
          />
          {/* Playing Indicator Overlay */}
          {isActive && isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
              <div className="flex gap-1 items-end h-8">
                <div className="w-1.5 bg-love-400 rounded-full animate-music-bar-1"></div>
                <div className="w-1.5 bg-love-400 rounded-full animate-music-bar-2"></div>
                <div className="w-1.5 bg-love-400 rounded-full animate-music-bar-3"></div>
              </div>
            </div>
          )}
          {/* Play Button Overlay on Hover */}
          <div
            className={`absolute inset-0 flex items-center justify-center rounded-lg transition-opacity
            ${isActive && isPlaying ? "opacity-0" : "opacity-0 group-hover:opacity-100"}
            bg-black/30
          `}
          >
            <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
              <span className="material-symbols-rounded text-love-600 text-3xl">
                play_arrow
              </span>
            </div>
          </div>
        </div>

        {/* Song Info */}
        <div className="text-center">
          <h3
            className={`font-bold text-sm mb-1 truncate transition-colors
            ${isActive ? "text-love-100" : "text-white group-hover:text-love-200"}
          `}
          >
            {song.title}
          </h3>
          <p className="text-xs text-love-300 truncate mb-2">{song.artist}</p>

          {/* Status Badge */}
          {isActive && (
            <div className="flex items-center justify-center gap-1 text-[10px] text-love-200">
              {isPlaying ? (
                <>
                  <span className="material-symbols-rounded text-xs">
                    graphic_eq
                  </span>
                  <span>Reproduciendo</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-rounded text-xs">
                    pause_circle
                  </span>
                  <span>Pausado</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Active Indicator Bar */}
      {isActive && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-love-400 to-love-600"></div>
      )}
    </div>
  )
}
