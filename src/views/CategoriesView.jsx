import React from "react";
import { motion } from "framer-motion";
import Card from "../components/ui/Card";
import { LEVELS } from "../constants/levels";
import { BookOpen } from "lucide-react";

export default function CategoriesView() {
  const categories = [
    { name: "Công việc", words: 20 },
    { name: "Kinh doanh", words: 25 },
    { name: "Công nghệ", words: 15 },
    { name: "Du lịch", words: 18 },
    { name: "Mua sắm", words: 22 },
  ];

  return (
    <motion.div
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {categories.map((cat, index) => (
        <Card key={index} className="p-6 hover:shadow-2xl cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-100 rounded-full">
              <BookOpen className="text-indigo-600 w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{cat.name}</h3>
              <p className="text-sm text-gray-500">
                {cat.words} từ vựng • Cấp độ{" "}
                <span className="font-medium text-indigo-600">
                  {LEVELS[index % LEVELS.length]}
                </span>
              </p>
            </div>
          </div>
        </Card>
      ))}
    </motion.div>
  );
}
