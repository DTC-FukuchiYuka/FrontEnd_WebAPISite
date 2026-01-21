// src/pages/Home.tsx
import { useQuiz } from '../hooks/useQuiz';
import QuizCard from '../components/QuizCard';
import ScoreBoard from '../components/ScoreBoard';
import BadgeList from '../components/BadgeList';

export default function Home() {
  const { state, actions } = useQuiz();
  return (
    <div className="container">
      <header><h1>犬種クイズ</h1></header>
      <ScoreBoard points={state.points} />
      <BadgeList badges={state.badges} />
      <QuizCard state={state} actions={actions} />
    </div>
  );
}
