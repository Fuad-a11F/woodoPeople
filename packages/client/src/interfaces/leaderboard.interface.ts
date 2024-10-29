export interface LeaderboardItem {
  id: number
  name: string
  score: number
}

export interface LeaderboardProps {
  data: LeaderboardItem[]
}
