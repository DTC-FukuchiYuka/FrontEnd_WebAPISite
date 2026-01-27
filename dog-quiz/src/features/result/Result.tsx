import { useNavigate } from "react-router-dom";
import "./resutl.css";

/*
コンポーネント
*/
const Result: React.FC <{ correctAnswers: number}> = ({correctAnswers}) =>{
    const navigate = useNavigate();

    const handleShare = () => {
        const text = encodeURIComponent(
        "犬種クイズに挑戦してみませんか？ #犬種クイズ",
    );
    const url = encodeURIComponent(
        //URLを記載
        "https://FrontEnd-MTG/Dog-quiz.com"
    );

    // TwitterのURL作成と共有
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=?${text}&url=${url}`;
    // 「`」は、変数を入れることができる。文字列は「"」か「'」を使用

    window.open(twitterShareUrl, "_blank");
    };

    return (
        <>    // divが複数ある場合、<></> or <div></div>でまとめる
        <div className = "result-container">
            <h2>結果発表</h2>
            <p>正解数: {correctAnswers}</p>
            <p>ポイント数: {localStorage.getItem("point")}</p>
        </div>

        <div className="button-container">
            <button className="share-button" onClick={() => handleShare()}>
                共有する
            </button>
            <button className="share-button" onClick={() => navigate("/")}>
                トップへ戻る
            </button>

        </div>
        </>
    );
    };

    export default Result;