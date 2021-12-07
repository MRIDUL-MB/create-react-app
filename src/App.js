import { useState } from "react";
import Welcome from "./components/Welcome";
import "./styles.css";

export default function App() {
  const [welcome, setWelcome] = useState(true);
  return (
    <div>{welcome && <Welcome handleQuiz={() => setWelcome(false)} />}</div>
  );
}
