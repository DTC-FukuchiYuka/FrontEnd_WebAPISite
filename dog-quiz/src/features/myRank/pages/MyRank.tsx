import { useNavigate } from "react-router-dom";
import "./MyRank.css";
import { useState } from "react";
import bronze from "../../../assets/bronze.png";
import silver from "../../../assets/silver.png";
import gold from "../../../assets/gold.png";
/**
 * マイランクコンポーネント
 */
const MyRank: React.FC = () => {
  const navigate = useNavigate();

  const [points] = useState<number>(() => {
    const storedPoints = localStorage.getItem("point");
    return storedPoints ? parseInt(storedPoints, 10) : 0;
  });

  // バッジの画像をポイントに応じて選択
  const getBadgeImage = (level: "初級" | "中級" | "上級") => {
    if (level === "初級" && points >= 10) {
      return bronze;
    }
    if (level === "中級" && points >= 50) {
      return silver;
    }
    if (level === "上級" && points >= 100) {
      return gold;
    }
    return undefined; // デフォルトは no badge
  };

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
        {/* 初級 */}
        <div className="badge-container">
          {getBadgeImage("初級") ? (
            <img
              src={getBadgeImage("初級")}
              alt="初級バッジ"
              className="badge-image"
            />
          ) : (
            <div className="badge-circle">no badge</div>
          )}

          <p className="badge-label">初級</p>
        </div>
        {/* 中級 */}
        <div className="badge-container">
          {getBadgeImage("中級") ? (
            <img
              src={getBadgeImage("中級")}
              alt="中級バッジ"
              className="badge-image"
            />
          ) : (
            <div className="badge-circle">no badge</div>
          )}

          <p className="badge-label">中級</p>
        </div>
        {/* 上級 */}
        <div className="badge-container">
          {getBadgeImage("上級") ? (
            <img
              src={getBadgeImage("上級")}
              alt="上級バッジ"
              className="badge-image"
            />
          ) : (
            <div className="badge-circle">no badge</div>
          )}

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
