import dogsImage from "./assets/animal_quiz.png";

const App: React.FC = () => {
  return (
    <div className="app">
      <h1 className="title">犬種クイズ</h1>
      <img src={dogsImage} alt="犬クイズ" className="image" />
      <div className="button-container">
        <button className="start-button">スタート</button>
        <button className="rank-button">マイランク</button>
      </div>
    </div>
  );
};

export default App;
