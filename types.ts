export interface Song {
  id: string
  title: string
  artist: string
  youtubeId?: string // Optional: for YouTube videos
  audioUrl?: string // Optional: for local audio files
  duration: number // in seconds (approximate)
  coverUrl: string
}

export const PLAYLIST: Song[] = [
  {
    id: "1",
    title: "A Thousand Years",
    artist: "Christina Perri",
    audioUrl: "/music/crepusculo.mp3",
    duration: 285,
    coverUrl: "https://img.youtube.com/vi/rtOvBOTyX00/maxresdefault.jpg",
  },
  {
    id: "2",
    title: "Mil Vidas",
    artist: "Mora",
    audioUrl: "/music/milvidas.mp3",
    duration: 200,
    coverUrl: "https://img.youtube.com/vi/OxyGjeiw0OI/maxresdefault.jpg",
  },
]
