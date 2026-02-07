import React, { useEffect, useRef, useState } from "react"

export const AudioPlayer = ({
  audioUrl,
  isPlaying,
  volume,
  onProgress,
  onEnded,
}) => {
  const audioRef = useRef(null)
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
  }

  // Handle play/pause
  useEffect(() => {
    if (!audioRef.current || !isReady) return

    if (isPlaying) {
      const playPromise = audioRef.current.play()
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.error("Error playing audio:", err)
        })
      }
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
    if (audioRef.current && audioRef.current.duration) {
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
