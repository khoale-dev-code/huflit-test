import React, { useState } from "react";
import { motion } from "framer-motion";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

export default function QuizView() {
  const questions = [
    {
      question: "Từ nào có nghĩa là 'cuộc họp'?",
      options: ["meeting", "factory", "product", "price"],
      correct: "meeting",
    },
    {
      question: "Từ nào có nghĩa là 'máy tính xách tay'?",
      options: ["phone", "tablet", "laptop", "keyboard"],
      correct: "laptop",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (option) => {
    setSelected(option);
    if (option === questions[current].correct) setScore(score + 1);
    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent(current + 1);
        setSelected(null);
      } else {
        setFinished(true);
      }
    }, 800);
  };

  if (finished)
    return (
      <motion.div
        className="text-center space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="text-3xl font-extrabold text-indigo-700">Hoàn thành!</h2>
        <p className="text-lg text-gray-600">
          Bạn trả lời đúng{" "}
          <span className="text-indigo-600 font-bold">{score}</span> /
          {questions.length} câu.
        </p>
        <Button variant="primary" onClick={() => window.location.reload()}>
          Làm lại
        </Button>
      </motion.div>
    );

  return (
    <Card className="max-w-xl mx-auto p-8 text-center space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">
        Câu {current + 1} / {questions.length}
      </h3>
      <p className="text-2xl font-bold text-indigo-700">
        {questions[current].question}
      </p>
      <div className="grid gap-3">
        {questions[current].options.map((option, index) => (
          <Button
            key={index}
            variant={
              selected === option
                ? option === questions[current].correct
                  ? "success"
                  : "danger"
                : "secondary"
            }
            onClick={() => handleAnswer(option)}
            disabled={!!selected}
          >
            {option}
          </Button>
        ))}
      </div>
    </Card>
  );
}
