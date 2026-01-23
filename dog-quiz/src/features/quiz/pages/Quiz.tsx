/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import Result from "../../result/pages/Result";
import "./quiz.css";
import { useEffect, useState } from "react";
import { dogBreeds } from "../../../data/dogBreeds";
import correctImage from "../../../assets/mark_maru.png"; // 丸画像のパス
import incorrectImage from "../../../assets/mark_batsu.png"; // バツ画像のパス

const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [quizData, setQuizData] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [correctBreed, setCorrectBreed] = useState("");
  const [feedbackImage, setFeedbackImage] = useState<string | null>(null); // 丸・バツの画像表示用
  const points = localStorage.getItem("point")
    ? parseInt(localStorage.getItem("point")!, 10)
    : 0;

  useEffect(() => {
    // クイズデータの初期化
    const fetchQuizData = async () => {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await response.json();
      const imageUrl = data.message;

      // 犬種を抽出
      const breed = imageUrl.split("/")[4]; // breedsの後の犬種を取得
      setSelectedImage(imageUrl);
      setCorrectBreed(breed);

      // 他の選択肢をランダムに選択
      const otherOptions = dogBreeds
        .filter((dog) => dog.key !== breed) // 正解以外の犬種を抽出
        .sort(() => 0.5 - Math.random()) // ランダムに並び替え
        .slice(0, 3); // 3つ選択

      // 正解と他の選択肢をシャッフル
      const options = [
        {
          key: breed,
          name: dogBreeds.find((dog) => dog.key === breed)?.name || breed,
        },
        ...otherOptions,
      ].sort(() => 0.5 - Math.random());

      setQuizData([{ imageUrl, options }]);
    };

    fetchQuizData();
  }, [currentQuestion]);

  const handleAnswer = (selectedOption: string) => {
    // 正解かどうかを判定
    const isCorrect = selectedOption === correctBreed;

    // 丸・バツの画像を表示
    setFeedbackImage(isCorrect ? correctImage : incorrectImage);

    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
      localStorage.setItem("point", (points + 1).toString());
    }

    // 3秒後に次の問題へ進む
    setTimeout(() => {
      setFeedbackImage(null); // フィードバック画像を非表示
      if (currentQuestion + 1 === 10) {
        setIsQuizCompleted(true);
      } else {
        setCurrentQuestion(currentQuestion + 1);
      }
    }, 3000);
  };

  if (isQuizCompleted) {
    return <Result correctAnswers={correctAnswers} />;
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <p>{currentQuestion + 1} / 10</p>
        <button className="round_btn" onClick={() => navigate("/")} />
      </div>
      <h2 className="quiz-question">
        Q{currentQuestion + 1}. この犬種の名前は？
      </h2>
      {selectedImage && (
        <img src={selectedImage} alt="クイズ画像" className="quiz-image" />
      )}
      <div className="quiz-options">
        {quizData[0]?.options.map((option: any, index: number) => (
          <button
            key={index}
            className="quiz-option"
            onClick={() => handleAnswer(option.key)}
            disabled={!!feedbackImage} // フィードバック表示中は選択肢を選べないようにする
          >
            {option.name}
          </button>
        ))}
      </div>
      {feedbackImage && (
        <img
          src={feedbackImage}
          alt="フィードバック画像"
          className="feedback-image"
        />
      )}
    </div>
  );
};

export default Quiz;
