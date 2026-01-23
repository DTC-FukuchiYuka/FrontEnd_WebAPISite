import { useNavigate } from "react-router-dom";
import "./result.css";
/**
 * 結果コンポーネント
 */
const Result: React.FC<{ correctAnswers: number }> = ({ correctAnswers }) => {
  const navigate = useNavigate();

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
    <>
      <div className="result-container">
        <h2>結果発表</h2>
        <p>正解数: {correctAnswers}</p>
        <p>ポイント数: {localStorage.getItem("point")}</p>
      </div>

      <div className="button-container">
        <button className="share-button" onClick={handleShare}>
          共有する
        </button>
        <button className="back-button" onClick={() => navigate("/")}>
          トップに戻る
        </button>
      </div>
    </>
  );
};

export default Result;
