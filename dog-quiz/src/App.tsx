import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import dogsImage1 from "./assets/animal_quiz_maru.png";
import dogsImage2 from "./assets/animal_quiz_batsu.png";
import MyRank from "./features/myRank/pages/MyRank";

/**
 * メインコンポーネント
 */
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* ホーム画面 */}
        <Route path="/" element={<Home />} />
        {/* マイランク画面 */}
        <Route path="/my-rank" element={<MyRank />} />
      </Routes>
    </Router>
  );
};

export default App;

/**
 * ホーム画面
 */
const Home: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // アプリを開いたときにlocalStorageにpointを初期化
    if (!localStorage.getItem("point")) {
      localStorage.setItem("point", "0");
    }
  }, []);

  return (
    <div className="app">
      <h1 className="title">犬種クイズ</h1>
      <img src={dogsImage1} alt="犬クイズ_マル" width={180} />
      <img src={dogsImage2} alt="犬クイズ_バツ" width={180} />
      <div className="button-container">
        <button className="start-button">スタート</button>
        {/* マイランクボタン */}
        <button
          className="rank-button"
          onClick={() => navigate("/my-rank")} // ボタンを押下したら "/my-rank" に遷移
        >
          マイランク
        </button>
      </div>
    </div>
  );
};
