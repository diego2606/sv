import React, { useEffect, useRef, useState } from "react"

interface AudioPlayerProps {
  audioUrl: string
  isPlaying: boolean
  volume: number // 0-100
  onProgress: (currentTime: number, duration: number) => void
  onEnded: () => void
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioUrl,
  isPlaying,
  volume,
  onProgress,
  onEnded,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isReady, setIsReady] = useState(false)

  // Handle audio source changes
  useEffect(() => {
    setIsReady(false)
    if (audioRef.current) {
      audioRef.current.load()
    }
  }, [audioUrl])

  // Handle ready state
  const handleCanPlay = () => {
    setIsReady(true)
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.error("Error playing audio:", err)
      })
    }
  }

  // Handle play/pause
  useEffect(() => {
    if (!audioRef.current || !isReady) return

    if (isPlaying) {
      audioRef.current.play().catch((err) => {
        console.error("Error playing audio:", err)
      })
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying, isReady])

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
    }
  }, [volume])

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      onProgress(audioRef.current.currentTime, audioRef.current.duration)
    }
  }

  return (
    <audio
      ref={audioRef}
      src={audioUrl}
      onTimeUpdate={handleTimeUpdate}
      onEnded={onEnded}
      onCanPlay={handleCanPlay}
      onLoadedMetadata={handleCanPlay}
      className="hidden"
      preload="auto"
    />
  )
}
