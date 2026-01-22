import { useNavigate } from "react-router-dom";
import "./MyRank.css";
import { useState } from "react";
/**
 * マイランクコンポーネント
 */
const MyRank: React.FC = () => {
  const navigate = useNavigate();

  const [points] = useState<number>(() => {
    const storedPoints = localStorage.getItem("point");
    return storedPoints ? parseInt(storedPoints, 10) : 0;
  });

  const handleShare = () => {
    const text = encodeURIComponent(
      "犬種クイズアプリで遊んでいます！あなたも挑戦してみませんか？ #犬種クイズ",
    );
    const url = encodeURIComponent(" https://example.com "); // アプリのURLに置き換えてください
    const twitterShareUrl = ` https://twitter.com/intent/tweet?text=${text}&url=${url}`;

    // Twitter の共有フォームに遷移
    window.open(twitterShareUrl, "_blank");
  };

  return (
    <div className="my-rank-container">
      <h2 className="points-title">ポイント数：{points}</h2>
      <h2 className="points-title mt-30">所有バッジ：</h2>
      <div className="badge-row">
        <div className="badge-container">
          <div className="badge-circle">no badge</div>
          <p className="badge-label">初級</p>
        </div>
        <div className="badge-container">
          <div className="badge-circle">no badge</div>
          <p className="badge-label">中級</p>
        </div>
        <div className="badge-container">
          <div className="badge-circle">no badge</div>
          <p className="badge-label">上級</p>
        </div>
      </div>
      <div className="button-container">
        <button className="share-button" onClick={handleShare}>
          共有する
        </button>
        <button className="back-button" onClick={() => navigate("/")}>
          トップに戻る
        </button>
      </div>
    </div>
  );
};

export default MyRank;
