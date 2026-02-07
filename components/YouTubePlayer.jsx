import React, { useEffect, useRef } from "react"

export const YouTubePlayer = ({
  videoId,
  isPlaying,
  volume,
  onProgress,
  onEnded,
}) => {
  const playerRef = useRef < any > null
  const progressInterval = (useRef < number) | (null > null)
  const containerRef = useRef < HTMLDivElement > null
  const playerIdRef = useRef(
    `youtube-player-${Math.random().toString(36).substr(2, 9)}`,
  )

  useEffect(() => {
    // Load YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement("script")
      tag.src = "https://www.youtube.com/iframe_api"
      const firstScriptTag = document.getElementsByTagName("script")[0]
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)

      window.onYouTubeIframeAPIReady = () => {
        createPlayer()
      }
    } else {
      createPlayer()
    }

    return () => {
      if (progressInterval.current) {
        window.clearInterval(progressInterval.current)
        progressInterval.current = null
      }
      if (playerRef.current) {
        try {
          playerRef.current.destroy()
        } catch (e) {
          console.error("Error destroying YouTube player:", e)
        }
        playerRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Handle Song Change
  useEffect(() => {
    if (playerRef.current && playerRef.current.loadVideoById) {
      playerRef.current.loadVideoById(videoId)
      if (!isPlaying) {
        playerRef.current.pauseVideo()
      }
    }
  }, [videoId])

  // Handle Play/Pause
  useEffect(() => {
    if (playerRef.current && playerRef.current.getPlayerState) {
      if (isPlaying) {
        playerRef.current.playVideo()
      } else {
        playerRef.current.pauseVideo()
      }
    }
  }, [isPlaying])

  // Handle Volume
  useEffect(() => {
    if (playerRef.current && playerRef.current.setVolume) {
      playerRef.current.setVolume(volume)
    }
  }, [volume])

  const createPlayer = () => {
    if (window.YT && !playerRef.current && containerRef.current) {
      playerRef.current = new window.YT.Player(playerIdRef.current, {
        height: "0",
        width: "0",
        videoId: videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          playsinline: 1,
        },
        events: {
          onReady: (event) => {
            event.target.setVolume(volume)
            if (isPlaying) event.target.playVideo()
          },
          onStateChange: (event) => {
            // YT.PlayerState.ENDED is 0
            if (event.data === 0) {
              onEnded()
            }
            // Playing
            if (event.data === 1) {
              startProgressTracking()
            } else {
              stopProgressTracking()
            }
          },
        },
      })
    }
  }

  const startProgressTracking = () => {
    if (progressInterval.current) clearInterval(progressInterval.current)
    progressInterval.current = window.setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        const current = playerRef.current.getCurrentTime()
        const duration = playerRef.current.getDuration()
        onProgress(current, duration)
      }
    }, 1000)
  }

  const stopProgressTracking = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current)
      progressInterval.current = null
    }
  }

  return <div ref={containerRef} id={playerIdRef.current} className="hidden" />
}
