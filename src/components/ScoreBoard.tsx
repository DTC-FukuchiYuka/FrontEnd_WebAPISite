// src/components/ScoreBoard.tsx
export default function ScoreBoard({ points }:{points:number}) {
  return <p className="score">スコア：{points} pt</p>;
}
