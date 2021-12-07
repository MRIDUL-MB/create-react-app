import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

export default function Question() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

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
                isSelected: false
              })),
            correct_answer: ans.correct_answer,
            question: ans.question,
            id: nanoid()
          }))
        )
      )
      .catch((err) => console.log(err))
      .finally(setLoading(false));
  }, []);

  console.log(data);

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

  if (loading) {
    return <h1>Data is Loading!</h1>;
  }

  return (
    <div className="questions">
      {data.map((quiz) => (
        <div key={quiz.id}>
          <h3>{quiz.question}</h3>
          <br />
          <div>
            {quiz.answers.map((ans) => (
              <p
                className={`option  ${ans.isSelected && "selected"}`}
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
    </div>
  );
}
