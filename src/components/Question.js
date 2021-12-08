import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

export default function Question() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [count, setCount] = useState(0);
  const [play, setPlay] = useState(false);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://opentdb.com/api.php?amount=10")
      .then((res) => res.json())
      .then((data) =>
        setData(
          data.results.map((ans) => ({
            answers: [ans.correct_answer, ...ans.incorrect_answers]
              .sort()
              .map((item) => ({
                answer: item,
                id: nanoid(),
                isSelected: false,
                isCorrected: false,
                isWrong: false
              })),
            correct_answer: ans.correct_answer,
            question: ans.question,
            id: nanoid()
          }))
        )
      )
      .catch((err) => console.log(err))
      .finally(setLoading(false));
  }, [reset]);

  useEffect(() => {
    setCorrectAnswer(data.map((item) => item.correct_answer));
  }, [data]);

  // console.log(data);

  function handleSelect(id, parent_id) {
    setData((prev) => {
      return prev.map((item) =>
        item.id === parent_id
          ? {
              ...item,
              answers: item.answers.map((ans) =>
                ans.id === id
                  ? { ...ans, isSelected: !ans.isSelected }
                  : { ...ans, isSelected: false }
              )
            }
          : { ...item }
      );
    });
  }

  function handleSubmit() {
    if (play) {
      setReset(true);
      setPlay(false);
    } else {
      setData((prev) => {
        return prev.map((item) => ({
          ...item,
          answers: item.answers.map((ans, index) => {
            return ans.answer === item.correct_answer
              ? {
                  ...ans,
                  isCorrected: !ans.isCorrected,
                  isWrong: ans.isSelected
                }
              : { ...ans, isWrong: ans.isSelected };
          })
        }));
      });

      const newArray = data.map((item) =>
        item.answers.map((ans) => ans.isSelected === true && ans.answer)
      );

      const answerArray = newArray.map((item) =>
        item.find((ans) => ans !== false)
      );
      for (let i = 0; i < 10; i++) {
        if (correctAnswer[i] === answerArray[i]) {
          setCount((prev) => prev + 1);
        }
      }
      setPlay(true);
    }
  }

  if (loading) {
    return <h1>Data is Loading!</h1>;
  }

  return (
    <div className="questions">
      {data.map((quiz) => (
        <div key={quiz.id}>
          <h3>{quiz.question}</h3>
          <br />
          <div className="options">
            {quiz.answers.map((ans) => (
              <p
                className={`option  ${ans.isSelected && "selected"}
                ${ans.isWrong && "wrong"}
                ${ans.isCorrected && "corrected"}`}
                key={ans.id}
                onClick={() => handleSelect(ans.id, quiz.id)}
              >
                {ans.answer}
              </p>
            ))}
          </div>
          <br />
        </div>
      ))}
      <div className="submit">
        {play && <h4>Your Score is {count}/10</h4>}
        <button className="btn" onClick={handleSubmit}>
          {play ? "Play Again" : "Check answers"}
        </button>
      </div>
    </div>
  );
}
