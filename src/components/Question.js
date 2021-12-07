import { useState, useEffect } from "react";

export default function Question() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple"
    )
      .then((res) => res.json())
      .then((data) => setData(data.results))
      .catch((err) => console.log(err))
      .finally(setLoading(false));
  }, []);

  console.log(data);

  if (loading) {
    return <h1>Data is Loading!</h1>;
  }

  return (
    <div className="questions">
      <div>
        {data.map((item, index) => {
          const { correct_answer, incorrect_answers } = item;
          const answers = [correct_answer, ...incorrect_answers].sort();

          return (
            <div key="index">
              <h3 className="item">{item.question}</h3>
              <div className="options">
                {/* {answers.map((answer, i)=>{
              return <div key={i} className="option"><p>{answer}</p></div>
                })} */}
              </div>
              <br />
            </div>
          );
        })}
      </div>
      <button className="btn submit">Check answers</button>
    </div>
  );
}
