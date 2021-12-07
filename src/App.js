import { useState } from "react";
import Welcome from "./components/Welcome";
import Question from "./components/Question";
import "./styles.css";

export default function App() {
  const [welcome, setWelcome] = useState(true);
  return (
    <div>
      {welcome ? (
        <Welcome handleQuiz={() => setWelcome(false)} />
      ) : (
        <Question />
      )}
    </div>
  );
}
