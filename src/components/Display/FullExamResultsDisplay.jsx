// import React, { useState } from 'react';
// import { Trophy, Target, BookOpen, TrendingUp, Zap, Play, ChevronLeft, Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';

// // Detailed Answer Review Component
// const DetailedAnswerReview = ({ examData, answers, sectionType, startPart, endPart }) => {
//   const [showExplanations, setShowExplanations] = useState(true);

//   const reviewData = [];
  
//   for (let part = startPart; part <= endPart; part++) {
//     const partData = examData?.parts?.[`part${part}`];
//     if (!partData?.questions) continue;

//     partData.questions.forEach((q, qIndex) => {
//       const key = `${sectionType}-part${part}-q${qIndex + 1}`;
//       const userAnswer = answers[key];
//       const isCorrect = userAnswer === q.correct;
      
//       reviewData.push({
//         partNum: part,
//         questionNum: qIndex + 1,
//         question: q,
//         userAnswer,
//         isCorrect,
//         key
//       });
//     });
//   }

//   return (
//     <div className="space-y-6">
//       {/* Toggle Button */}
//       <div className="flex justify-center">
//         <button
//           onClick={() => setShowExplanations(!showExplanations)}
//           className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
//         >
//           {showExplanations ? (
//             <>
//               <EyeOff className="w-5 h-5" />
//               Ẩn giải thích
//             </>
//           ) : (
//             <>
//               <Eye className="w-5 h-5" />
//               Hiện giải thích chi tiết
//             </>
//           )}
//         </button>
//       </div>

//       {/* Answers List */}
//       <div className="space-y-4">
//         {reviewData.map((item) => {
//           const { partNum, questionNum, question, userAnswer, isCorrect } = item;

//           return (
//             <div
//               key={item.key}
//               className={`p-5 rounded-xl border-2 transition-all hover:shadow-lg ${
//                 isCorrect
//                   ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300'
//                   : 'bg-gradient-to-r from-red-50 to-rose-50 border-red-300'
//               }`}
//             >
//               {/* Question Header */}
//               <div className="flex items-start gap-3 mb-3">
//                 <div className={`p-2 rounded-full ${
//                   isCorrect ? 'bg-green-500' : 'bg-red-500'
//                 }`}>
//                   {isCorrect ? (
//                     <CheckCircle className="w-6 h-6 text-white" />
//                   ) : (
//                     <XCircle className="w-6 h-6 text-white" />
//                   )}
//                 </div>
//                 <div className="flex-1">
//                   <p className="text-sm font-semibold text-gray-600 mb-1">
//                     Part {partNum} - Câu {questionNum}
//                   </p>
//                   <p className="font-bold text-gray-900 text-lg">
//                     {question.question}
//                   </p>
//                 </div>
//               </div>

//               {/* Answer Details */}
//               <div className="ml-14 space-y-2">
//                 <div className="flex items-center gap-2 flex-wrap">
//                   <span className="text-sm font-semibold text-gray-700">
//                     Câu trả lời của bạn:
//                   </span>
//                   <span className={`font-bold px-3 py-1 rounded-lg ${
//                     isCorrect
//                       ? 'bg-green-200 text-green-800'
//                       : 'bg-red-200 text-red-800'
//                   }`}>
//                     {userAnswer !== undefined 
//                       ? `${String.fromCharCode(65 + userAnswer)}. ${question.options[userAnswer]}`
//                       : 'Chưa chọn'}
//                   </span>
//                 </div>

//                 {!isCorrect && (
//                   <div className="flex items-center gap-2 flex-wrap">
//                     <span className="text-sm font-semibold text-gray-700">
//                       Đáp án đúng:
//                     </span>
//                     <span className="font-bold px-3 py-1 rounded-lg bg-green-200 text-green-800">
//                       {String.fromCharCode(65 + question.correct)}. {question.options[question.correct]}
//                     </span>
//                   </div>
//                 )}

//                 {/* Explanation */}
//                 {showExplanations && question.explanation && (
//                   <div className="mt-3 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
//                     <p className="text-sm font-semibold text-blue-900 mb-1">
//                       💡 Giải thích:
//                     </p>
//                     <p className="text-sm text-gray-800 leading-relaxed">
//                       {question.explanation}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// const FullExamResultsDisplay = ({ 
//   results, 
//   level, 
//   totalCorrect, 
//   resultsSaved, 
//   progressLoading, 
//   currentUser,
//   examData,
//   answers,
//   onRetry,
//   onBack
// }) => {
//   const [showDetailedAnswers, setShowDetailedAnswers] = useState(false);

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className={`bg-gradient-to-r ${level.color} rounded-2xl shadow-xl p-6 md:p-8 text-white text-center`}>
//         <Trophy className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 animate-bounce" />
//         <h1 className="text-3xl md:text-4xl font-black mb-2">🎉 KẾT QUẢ BÀI THI</h1>
//         <p className="text-base md:text-lg opacity-90">Bạn đã hoàn thành tất cả 8 parts!</p>
//         <div className="inline-block px-6 py-2 bg-white/20 rounded-full border-2 border-white/50 mt-3">
//           <p className="font-bold text-sm md:text-base">
//             {level.emoji} Xếp loại: <span className="text-lg md:text-xl">{level.label}</span>
//           </p>
//         </div>
//         {resultsSaved && currentUser && (
//           <p className="text-white/90 text-sm font-semibold mt-2 bg-white/20 px-3 py-1 rounded-full inline-block">
//             ✅ Kết quả đã được lưu vào hồ sơ
//           </p>
//         )}
//         {progressLoading && (
//           <p className="text-white/90 text-sm font-semibold mt-2">⏳ Đang lưu kết quả...</p>
//         )}
//       </div>

//       {/* Score Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {/* Listening Score */}
//         <div className="bg-white rounded-xl shadow-lg border-2 border-blue-200 p-6 text-center hover:shadow-xl transition-shadow">
//           <Target className="w-12 h-12 text-blue-600 mx-auto mb-3" />
//           <p className="text-gray-600 font-semibold mb-2">LISTENING</p>
//           <p className={`text-5xl font-black ${level.text} mb-2`}>
//             {results.listening.points}
//           </p>
//           <p className="text-sm text-gray-500">
//             {results.listening.correct}/20 câu đúng
//           </p>
//           <div className="mt-3 pt-3 border-t border-gray-200">
//             <div className="flex justify-between text-xs text-gray-600 mb-1">
//               <span>Tỷ lệ</span>
//               <span className="font-bold">
//                 {((results.listening.correct / 20) * 100).toFixed(0)}%
//               </span>
//             </div>
//             <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
//               <div
//                 className="h-full bg-blue-500 transition-all"
//                 style={{ width: `${(results.listening.correct / 20) * 100}%` }}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Reading Score */}
//         <div className="bg-white rounded-xl shadow-lg border-2 border-green-200 p-6 text-center hover:shadow-xl transition-shadow">
//           <BookOpen className="w-12 h-12 text-green-600 mx-auto mb-3" />
//           <p className="text-gray-600 font-semibold mb-2">READING</p>
//           <p className={`text-5xl font-black ${level.text} mb-2`}>
//             {results.reading.points}
//           </p>
//           <p className="text-sm text-gray-500">
//             {results.reading.correct}/40 câu đúng
//           </p>
//           <div className="mt-3 pt-3 border-t border-gray-200">
//             <div className="flex justify-between text-xs text-gray-600 mb-1">
//               <span>Tỷ lệ</span>
//               <span className="font-bold">
//                 {((results.reading.correct / 40) * 100).toFixed(0)}%
//               </span>
//             </div>
//             <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
//               <div
//                 className="h-full bg-green-500 transition-all"
//                 style={{ width: `${(results.reading.correct / 40) * 100}%` }}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Average Score */}
//         <div className="bg-white rounded-xl shadow-lg border-2 border-amber-200 p-6 text-center hover:shadow-xl transition-shadow">
//           <TrendingUp className="w-12 h-12 text-amber-600 mx-auto mb-3" />
//           <p className="text-gray-600 font-semibold mb-2">TRUNG BÌNH</p>
//           <p className="text-5xl font-black bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent mb-2">
//             {results.average.toFixed(1)}
//           </p>
//           <p className="text-sm text-gray-500">
//             Tổng: {totalCorrect}/60 câu
//           </p>
//           <div className="mt-3 pt-3 border-t border-gray-200">
//             <div className="flex justify-between text-xs text-gray-600 mb-1">
//               <span>Tỷ lệ</span>
//               <span className="font-bold">
//                 {((totalCorrect / 60) * 100).toFixed(0)}%
//               </span>
//             </div>
//             <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
//               <div
//                 className="h-full bg-amber-500 transition-all"
//                 style={{ width: `${(totalCorrect / 60) * 100}%` }}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Progress Bar */}
//       <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6">
//         <div className="flex justify-between items-center mb-3">
//           <h3 className="text-lg font-bold text-gray-800">📊 Tiến độ hoàn thành</h3>
//           <span className="text-sm font-semibold text-gray-600">
//             {totalCorrect} / 60 câu đúng
//           </span>
//         </div>
//         <div className="bg-gray-200 rounded-full h-6 overflow-hidden shadow-inner">
//           <div
//             className="h-full transition-all duration-1000 ease-out flex items-center justify-end pr-3"
//             style={{
//               width: `${(totalCorrect / 60) * 100}%`,
//               backgroundColor:
//                 results.average >= 70 ? '#10b981' :
//                 results.average >= 50 ? '#f59e0b' : '#ef4444'
//             }}
//           >
//             <span className="text-white text-xs font-bold">
//               {((totalCorrect / 60) * 100).toFixed(1)}%
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Detailed Results by Part */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//         {/* Listening Parts Breakdown */}
//         <div className="bg-white rounded-lg shadow-md border-2 border-blue-300 p-5">
//           <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
//             <Play className="w-5 h-5" /> LISTENING (Parts 1-4)
//           </h3>
//           <div className="space-y-2 mb-4 text-sm">
//             <div className="flex justify-between p-2 bg-blue-50 rounded">
//               <span className="text-gray-700">Câu đúng:</span>
//               <span className="font-bold text-blue-600">
//                 {results.listening.correct}/20
//               </span>
//             </div>
//             <div className="flex justify-between p-2 bg-blue-50 rounded">
//               <span className="text-gray-700">Điểm:</span>
//               <span className="font-bold text-blue-600">
//                 {results.listening.points}/100
//               </span>
//             </div>
//             <div className="flex justify-between p-2 bg-blue-50 rounded">
//               <span className="text-gray-700">Tỷ lệ:</span>
//               <span className="font-bold text-blue-600">
//                 {((results.listening.correct / 20) * 100).toFixed(1)}%
//               </span>
//             </div>
//           </div>
//           <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
//             <p className="font-bold text-blue-900 mb-2 text-xs">📊 Chi tiết từng part:</p>
//             <div className="grid grid-cols-4 gap-1.5">
//               {[1, 2, 3, 4].map(part => {
//                 const partCorrect = results.listeningByPart[part] || 0;
//                 const percentage = (partCorrect / 5) * 100;
                
//                 return (
//                   <div key={part} className="bg-white rounded p-2 text-center border border-blue-200 text-xs">
//                     <p className="font-bold text-gray-600">Part {part}</p>
//                     <p className="text-lg font-black text-blue-600">{partCorrect}</p>
//                     <p className="text-[10px] text-gray-500">/5 câu</p>
//                     <div className="mt-1 bg-gray-200 rounded-full h-1 overflow-hidden">
//                       <div
//                         className="h-full bg-blue-500"
//                         style={{ width: `${percentage}%` }}
//                       />
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>

//         {/* Reading Parts Breakdown */}
//         <div className="bg-white rounded-lg shadow-md border-2 border-green-300 p-5">
//           <h3 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
//             <BookOpen className="w-5 h-5" /> READING (Parts 5-8)
//           </h3>
//           <div className="space-y-2 mb-4 text-sm">
//             <div className="flex justify-between p-2 bg-green-50 rounded">
//               <span className="text-gray-700">Câu đúng:</span>
//               <span className="font-bold text-green-600">
//                 {results.reading.correct}/40
//               </span>
//             </div>
//             <div className="flex justify-between p-2 bg-green-50 rounded">
//               <span className="text-gray-700">Điểm:</span>
//               <span className="font-bold text-green-600">
//                 {results.reading.points}/100
//               </span>
//             </div>
//             <div className="flex justify-between p-2 bg-green-50 rounded">
//               <span className="text-gray-700">Tỷ lệ:</span>
//               <span className="font-bold text-green-600">
//                 {((results.reading.correct / 40) * 100).toFixed(1)}%
//               </span>
//             </div>
//           </div>
//           <div className="bg-green-50 rounded-lg p-3 border border-green-200">
//             <p className="font-bold text-green-900 mb-2 text-xs">📊 Chi tiết từng part:</p>
//             <div className="grid grid-cols-4 gap-1.5">
//               {[1, 2, 3, 4].map(part => {
//                 const partCorrect = results.readingByPart[part] || 0;
//                 const percentage = (partCorrect / 10) * 100;
                
//                 return (
//                   <div key={part} className="bg-white rounded p-2 text-center border border-green-200 text-xs">
//                     <p className="font-bold text-gray-600">Part {part + 4}</p>
//                     <p className="text-lg font-black text-green-600">{partCorrect}</p>
//                     <p className="text-[10px] text-gray-500">/10 câu</p>
//                     <div className="mt-1 bg-gray-200 rounded-full h-1 overflow-hidden">
//                       <div
//                         className="h-full bg-green-500"
//                         style={{ width: `${percentage}%` }}
//                       />
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Performance Analysis */}
//       <div className="bg-white rounded-xl shadow-lg border-2 border-purple-200 p-6">
//         <h3 className="text-xl font-bold text-purple-900 mb-4 flex items-center gap-2">
//           📈 Phân tích kết quả
//         </h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="space-y-3">
//             <h4 className="font-bold text-gray-800 text-sm">🎯 Điểm mạnh:</h4>
//             <div className="space-y-2">
//               {results.listening.correct >= 15 && (
//                 <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
//                   <span className="text-green-600">✓</span>
//                   <span className="text-sm text-gray-700">Listening xuất sắc</span>
//                 </div>
//               )}
//               {results.reading.correct >= 30 && (
//                 <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
//                   <span className="text-green-600">✓</span>
//                   <span className="text-sm text-gray-700">Reading rất tốt</span>
//                 </div>
//               )}
//               {Object.values(results.listeningByPart).some(v => v === 5) && (
//                 <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
//                   <span className="text-green-600">✓</span>
//                   <span className="text-sm text-gray-700">Có part Listening làm hoàn hảo</span>
//                 </div>
//               )}
//               {Object.values(results.readingByPart).some(v => v === 10) && (
//                 <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
//                   <span className="text-green-600">✓</span>
//                   <span className="text-sm text-gray-700">Có part Reading làm hoàn hảo</span>
//                 </div>
//               )}
//             </div>
//           </div>
          
//           <div className="space-y-3">
//             <h4 className="font-bold text-gray-800 text-sm">💡 Cần cải thiện:</h4>
//             <div className="space-y-2">
//               {results.listening.correct < 12 && (
//                 <div className="flex items-center gap-2 p-2 bg-orange-50 rounded-lg">
//                   <span className="text-orange-600">!</span>
//                   <span className="text-sm text-gray-700">Listening cần luyện tập thêm</span>
//                 </div>
//               )}
//               {results.reading.correct < 24 && (
//                 <div className="flex items-center gap-2 p-2 bg-orange-50 rounded-lg">
//                   <span className="text-orange-600">!</span>
//                   <span className="text-sm text-gray-700">Reading cần tăng cường</span>
//                 </div>
//               )}
//               {(() => {
//                 const weakestListening = Object.entries(results.listeningByPart)
//                   .sort((a, b) => a[1] - b[1])[0];
//                 if (weakestListening && weakestListening[1] < 3) {
//                   return (
//                     <div className="flex items-center gap-2 p-2 bg-orange-50 rounded-lg">
//                       <span className="text-orange-600">!</span>
//                       <span className="text-sm text-gray-700">
//                         Part {weakestListening[0]} Listening ({weakestListening[1]}/5)
//                       </span>
//                     </div>
//                   );
//                 }
//               })()}
//               {(() => {
//                 const weakestReading = Object.entries(results.readingByPart)
//                   .sort((a, b) => a[1] - b[1])[0];
//                 if (weakestReading && weakestReading[1] < 6) {
//                   return (
//                     <div className="flex items-center gap-2 p-2 bg-orange-50 rounded-lg">
//                       <span className="text-orange-600">!</span>
//                       <span className="text-sm text-gray-700">
//                         Part {parseInt(weakestReading[0]) + 4} Reading ({weakestReading[1]}/10)
//                       </span>
//                     </div>
//                   );
//                 }
//               })()}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Feedback */}
//       <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-5">
//         <h4 className="text-lg font-bold text-amber-900 mb-3 flex items-center gap-2">
//           <Zap className="w-5 h-5" /> 💡 Nhận xét
//         </h4>
//         <div className="space-y-2 text-sm text-gray-700">
//           {results.average >= 80 && (
//             <p>✅ <strong>Tuyệt vời!</strong> Kết quả xuất sắc. Tiếp tục duy trì và cải thiện thêm.</p>
//           )}
//           {results.average >= 60 && results.average < 80 && (
//             <>
//               <p>✅ <strong>Khá tốt!</strong> Tiến bộ tốt. Tập trung vào các phần còn yếu.</p>
//               {results.listening.correct < 12 && <p>📌 Listening: Cần luyện tập thêm kỹ năng nghe.</p>}
//               {results.reading.correct < 24 && <p>📌 Reading: Tăng cường luyện đọc hiểu.</p>}
//             </>
//           )}
//           {results.average >= 40 && results.average < 60 && (
//             <p>⚡ <strong>Cần cải thiện!</strong> Luyện tập đều đặn, tập trung vào phần yếu.</p>
//           )}
//           {results.average < 40 && (
//             <p>⚠️ <strong>Hãy cố gắng thêm!</strong> Luyện từ vựng, ngữ pháp, kỹ năng cơ bản.</p>
//           )}
//         </div>
//       </div>

//       {/* View Detailed Answers Button */}
//       {examData && answers && (
//         <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border-2 border-indigo-300 p-6">
//           <div className="text-center">
//             <button
//               onClick={() => setShowDetailedAnswers(!showDetailedAnswers)}
//               className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
//             >
//               {showDetailedAnswers ? (
//                 <>
//                   <EyeOff className="w-6 h-6" />
//                   Ẩn chi tiết đáp án
//                 </>
//               ) : (
//                 <>
//                   <Eye className="w-6 h-6" />
//                   Xem chi tiết đáp án và giải thích
//                 </>
//               )}
//             </button>
//             <p className="text-sm text-gray-600 mt-3">
//               {showDetailedAnswers 
//                 ? '⬆️ Click để ẩn phần chi tiết' 
//                 : '📝 Xem lại từng câu hỏi, đáp án đúng và giải thích chi tiết'}
//             </p>
//           </div>
//         </div>
//       )}

//       {/* Detailed Answers Section */}
//       {showDetailedAnswers && examData && answers && (
//         <>
//           {/* LISTENING Detailed Review */}
//           <div className="bg-white rounded-xl shadow-lg border-2 border-blue-300 p-6">
//             <h3 className="text-2xl font-black text-blue-900 mb-6 flex items-center gap-2 border-b-4 border-blue-400 pb-3">
//               <Play className="w-7 h-7" />
//               Chi tiết đáp án LISTENING (Parts 1-4)
//             </h3>
//             <DetailedAnswerReview
//               examData={examData}
//               answers={answers}
//               sectionType="listening"
//               startPart={1}
//               endPart={4}
//             />
//           </div>

//           {/* READING Detailed Review */}
//           <div className="bg-white rounded-xl shadow-lg border-2 border-green-300 p-6">
//             <h3 className="text-2xl font-black text-green-900 mb-6 flex items-center gap-2 border-b-4 border-green-400 pb-3">
//               <BookOpen className="w-7 h-7" />
//               Chi tiết đáp án READING (Parts 5-8)
//             </h3>
//             <DetailedAnswerReview
//               examData={examData}
//               answers={answers}
//               sectionType="reading"
//               startPart={5}
//               endPart={8}
//             />
//           </div>
//         </>
//       )}

//       {/* Action Buttons */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//         <button
//           onClick={onRetry}
//           className="py-3 md:py-4 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white rounded-lg font-bold shadow-lg transition-all text-sm md:text-base"
//         >
//           <Play className="inline w-4 h-4 mr-2" /> Làm lại
//         </button>
//         <button
//           onClick={onBack}
//           className="py-3 md:py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-bold shadow-lg transition-all text-sm md:text-base"
//         >
//           <ChevronLeft className="inline w-4 h-4 mr-2" /> Quay lại
//         </button>
//       </div>

//       {/* Motivational Message */}
//       <div className={`bg-gradient-to-r ${
//         results.average >= 70
//           ? 'from-green-100 to-emerald-100 border-green-300'
//           : 'from-orange-100 to-yellow-100 border-orange-300'
//       } rounded-xl border-2 p-6 text-center`}>
//         <p className="text-lg font-bold text-gray-800 mb-2">
//           {results.average >= 90 && '🎉 Tuyệt vời! Bạn đã làm xuất sắc!'}
//           {results.average >= 70 && results.average < 90 && '👏 Rất tốt! Tiếp tục cố gắng nhé!'}
//           {results.average >= 50 && results.average < 70 && '💪 Khá tốt! Hãy luyện tập thêm để tiến bộ hơn!'}
//           {results.average < 50 && '📚 Đừng nản chí! Hãy xem lại bài và thử lại nhé!'}
//         </p>
//         <p className="text-sm text-gray-600">
//           Luyện tập thường xuyên sẽ giúp bạn cải thiện kỹ năng! 🚀
//         </p>
//       </div>
//     </div>
//   );
// };

// export default FullExamResultsDisplay;