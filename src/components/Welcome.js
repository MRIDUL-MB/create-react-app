export default function Welcome(props) {
  return (
    <div className="welcome">
      <h1>Quizzical</h1>
      <p>A Quiz App created on React</p>
      <button className="btn" onClick={props.handleQuiz}>
        Start Quiz
      </button>
    </div>
  );
}
