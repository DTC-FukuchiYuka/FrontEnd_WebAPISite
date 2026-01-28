import { useNavigate } from "react-router-dom";
import Result from "../../result/Result";
import "./quiz.css";
import { useEffect, useState } from "react";
import dogBreeds from "../../../data/dog-data.json";
import correctImage from "../../../assets/animal_quiz_maru.png";
import incorrectImage from "../../../assets/animal_quiz_batsu.png";


const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [quizData, setQuizData] = useState<Array<{ imageUrl: string; options: Array<{ key: string; name: string }> }>>([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [correctBreed, setCorrectBreed] = useState("");
  const [feedbackImage, setFeedbackImage] = useState<string | null>(null); // 〇か✕の画像表示用
  const points = localStorage.getItem("point")? parseInt(localStorage.getItem("point")!, 10)
  : 0;

  useEffect(() => {
    // クイズデータの初期化
    const fetchQuizData = async () => {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await response.json();
      const imageUrl =  data.message;

      // 画像URLから犬種名を抽出
      const breed = imageUrl.split("/")[4];
      setSelectedImage(imageUrl);
      setCorrectBreed(breed);

      // ほかの選択肢をランダムに選択
      const otherOptions = dogBreeds
        .filter((dog) => dog.key !== breed) // 正解以外の犬種をフィルタリング
        .sort(() => 0.5 - Math.random()) // ランダムにシャッフル
        .slice(0, 3); // 3つの選択肢を取得

        // 正解とほかの選択肢をシャッフル
        const options =[
          {
            key : breed,
            name: dogBreeds.find((dog) => dog.key === breed)?.name || breed,
          },
          ...otherOptions,
        ].sort(() => 0.5 - Math.random());

        setQuizData([{ imageUrl, options}]);
    };
    
    fetchQuizData();
  },
  [currentQuestion]);

  const handleAnswer = (selectedOption: string) => {
    // 正解かどうかを判定
    const isCorrect = selectedOption === correctBreed;
    
    // フィードバック画像の設定
    setFeedbackImage(isCorrect ? correctImage : incorrectImage);

    if (isCorrect){
      setCorrectAnswers(correctAnswers + 1);
      localStorage.setItem("point", (points + 1).toString());
    }

    // 3秒後にフィードバック画像を非表示にして次の質問へ
    setTimeout(() => {
      setFeedbackImage(null); // フィードバック画像を非表示
      if (currentQuestion +1 === 10) {
        setIsQuizCompleted(true);
      } else {
        setCurrentQuestion(currentQuestion + 1);
      }
    }, 3000);
  };

  if (isQuizCompleted) {
    return <Result correctAnswers={correctAnswers}/>;
  }
  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <p>{currentQuestion +1}</p>
        <button className="round-button" onClick={() => navigate("/")}/>
      </div>

      <h2 className="quiz-question">
        Q{currentQuestion + 1} この犬種の名前は？
      </h2>
      {selectedImage && (
        <img src = {selectedImage} alt = "クイズ画像" className = "quiz-image"/>
      )}
      <div className = "quiz-options">
        {quizData[0]?.options.map((option: { key: string; name: string }, index: number) => (
          <button 
          key ={index}
          className = "quiz-option"
          onClick={() => handleAnswer(option.key)}
          disabled = {!!feedbackImage}  // フィードバック表示中は選択肢を選べないようにする 
          >
            {option.name}
          </button>
        ))}
      </div>
      {feedbackImage && (
        <img
        src = {feedbackImage}
        alt = "フィードバック画像"
        className = "feedback-image"
        />
      )}
    </div>
  );
};
export default Quiz;