import React from "react";
import { motion } from "framer-motion";
import WordCard from "../components/WordCard";

export default function FlashcardsView({
  vocabularyData,
  completedWords,
  onSpeak,
  playingId,
  onComplete,
}) {
  return (
    <motion.div
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {vocabularyData.map((word, index) => (
        <WordCard
          key={index}
          {...word}
          onSpeak={() => onSpeak(word.word, index)}
          isPlaying={playingId === index}
          onComplete={() => onComplete(word.word)}
          isCompleted={completedWords.includes(word.word)}
        />
      ))}
    </motion.div>
  );
}
