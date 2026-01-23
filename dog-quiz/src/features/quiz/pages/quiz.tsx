import React from "react";
import "./quiz.css";

interface QuizProps {
  question: string;
  imageUrl: string;
  options: string[];
}

const Quiz: React.FC<QuizProps> = ({ question, imageUrl, options }) => {
  const handleOptionClick = (option: string) => {
    alert(`選択肢「${option}」が選ばれました！`);
  };

  return (
    <div className="quiz-container">
      {/* 閉じるボタン */}
      <div className="close-button" onClick={() => alert("クイズを閉じました！")}>
        ×
      </div>

      {/* ヘッダー */}
      <div className="header">1/10</div>

      {/* 質問 */}
      <h1 className="question">{question}</h1>

      {/* 画像 */}
      <div className="image-container">
        <img src={imageUrl} alt="クイズ画像" />
      </div>

      {/* 選択肢 */}
      <div className="options">
        {options.map((option, index) => (
          <button
            key={index}
            className="option"
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;

// 使用例:
// <Quiz
//   question="この犬種の名前は？"
//   imageUrl="dog-image.jpg"
//   options={["グレート・デーン", "ダンスク・スヴェンスク・ゴールフンド", "秋田犬", "アッペンツェラー"]}
// />