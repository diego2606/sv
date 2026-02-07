import React from "react"

interface StoryCardProps {
  title: string
  icon: string
  text: string
  imageLabel: string
  imageUrl?: string
  delay?: string
  reverse?: boolean
}

export const StoryCard: React.FC<StoryCardProps> = ({
  title,
  icon,
  text,
  imageLabel,
  imageUrl,
  delay = "0s",
  reverse = false,
}) => {
  return (
    <div
      className="glass-strong rounded-3xl p-6 md:p-8 w-full max-w-4xl mx-auto mb-8 transform transition-all duration-700 hover:scale-[1.01]"
      style={{ animationDelay: delay }}
    >
      <div
        className={`flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} gap-6 md:gap-10 items-center`}
      >
        {/* Photo Area */}
        <div className="w-full md:w-5/12 aspect-[3/4] rounded-xl overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={imageLabel}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-black/20 border-2 border-dashed border-love-500/30 flex flex-col items-center justify-center text-love-300/50 hover:bg-love-900/10 hover:border-love-500/50 transition-colors cursor-pointer group">
              <span className="material-symbols-rounded text-4xl mb-2 group-hover:scale-110 transition-transform">
                add_a_photo
              </span>
              <span className="text-xs uppercase tracking-widest font-semibold">
                {imageLabel}
              </span>
            </div>
          )}
        </div>

        {/* Text Content */}
        <div className="w-full md:w-7/12 text-center md:text-left">
          <div
            className={`flex items-center gap-3 mb-4 text-love-400 justify-center ${reverse ? "md:justify-end" : "md:justify-start"}`}
          >
            <span className="material-symbols-rounded text-2xl">{icon}</span>
            <h2 className="text-2xl font-bold text-white">{title}</h2>
          </div>
          <p className="text-love-100/90 leading-relaxed text-sm md:text-base">
            {text}
          </p>
        </div>
      </div>
    </div>
  )
}
