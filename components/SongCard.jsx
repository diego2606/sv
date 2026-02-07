import React from "react"

export const SongCard = ({
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
            ? "bg-gradient-to-br from-love-500/30 to-love-700/30 ring-2 ring-love-400 shadow-lg shadow-love-500/20"
            : "bg-white/5 hover:bg-white/10 hover:shadow-lg"
        }`}
    >
      <div className="flex items-center gap-4 p-4">
        {/* Album Cover */}
        <div className="relative flex-shrink-0">
          <img
            src={song.coverUrl}
            alt={song.title}
            className={`w-20 h-20 rounded-lg object-cover shadow-md transition-transform duration-300
              ${isActive && isPlaying ? "scale-105" : ""}
            `}
          />
          {/* Playing Indicator */}
          {isActive && isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
              <div className="flex gap-1 items-end h-6">
                <div
                  className="w-1 bg-love-400 rounded-full animate-music-bar-1"
                  style={{ animationDelay: "0s" }}
                ></div>
                <div
                  className="w-1 bg-love-400 rounded-full animate-music-bar-2"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-1 bg-love-400 rounded-full animate-music-bar-3"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Song Info */}
        <div className="flex-1 min-w-0">
          <h3
            className={`font-bold text-base truncate transition-colors
            ${isActive ? "text-love-100" : "text-white group-hover:text-love-200"}
          `}
          >
            {song.title}
          </h3>
          <p className="text-sm text-love-300 truncate">{song.artist}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-love-400/80">
              {Math.floor(song.duration / 60)}:
              {String(song.duration % 60).padStart(2, "0")}
            </span>
            {song.audioUrl && (
              <span className="text-[10px] bg-love-500/20 text-love-300 px-1.5 py-0.5 rounded">
                MP3
              </span>
            )}
            {song.youtubeId && (
              <span className="text-[10px] bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded">
                YT
              </span>
            )}
          </div>
        </div>

        {/* Play Button */}
        <div className="flex-shrink-0">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all
            ${
              isActive
                ? "bg-love-500 shadow-lg shadow-love-500/50"
                : "bg-white/10 group-hover:bg-white/20"
            }`}
          >
            <span className="material-symbols-rounded text-white text-2xl">
              {isActive && isPlaying ? "pause" : "play_arrow"}
            </span>
          </div>
        </div>
      </div>

      {/* Active Indicator Bar */}
      {isActive && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-love-400 to-love-600"></div>
      )}
    </div>
  )
}
