import React from "react";
import { motion } from "framer-motion";
import StatBox from "../components/ui/StatBox";
import { CheckCircle, Book, BarChart3 } from "lucide-react";

export default function StatsView({ completedWords, totalWords }) {
  const percent = ((completedWords.length / totalWords) * 100).toFixed(1);

  return (
    <motion.div
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <StatBox
        label="Từ đã học"
        value={completedWords.length}
        icon={CheckCircle}
        trend={+percent}
      />
      <StatBox
        label="Tổng số từ"
        value={totalWords}
        icon={Book}
        trend={0}
      />
      <StatBox
        label="Tiến độ"
        value={`${percent}%`}
        icon={BarChart3}
        trend={percent > 50 ? +percent : 0}
      />
    </motion.div>
  );
}
