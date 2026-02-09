/* src/components/FullExam/components/ExamScreen/ExamScreen.jsx */

import React, { memo, useMemo } from 'react';
import { AlertCircle, ChevronLeft, ChevronRight, Flag, ArrowRight } from 'lucide-react';
import ContentDisplay from '../../../Display/ContentDisplay';
import { COLORS } from '../../constants/colors';
import { EXAM_STRUCTURE } from '../../constants/examConfig';
import { QuestionCard } from './QuestionCard';
import { PartNavigation } from '../Navigation/PartNavigation';

/**
 * Main Exam Screen - Display questions and handle answers
 * Responsible for:
 * - Showing exam content (listening/reading)
 * - Rendering questions
 * - Handling answer selection
 * - Navigation between parts
 */
export const ExamScreen = memo(({
  examData,
  section,              // 'listening' or 'reading'
  part,                 // Current part number
  answers,              // Object: { "listening-part1-q1": 0, ... }
  onSelectAnswer,       // (questionNum, optionIndex) => void
  onNavigatePart,       // (newPart) => void
  onNextSection,        // () => void
  onSubmit,             // () => void
  onAudioStart,         // () => void
  onAudioEnd,           // () => void
  isLastListeningPart,  // boolean
  isLastReadingPart,    // boolean
  playedParts = [],     // Array of played listening parts
  isAudioPlaying = false,
}) => {
  const cfg = EXAM_STRUCTURE[section];

  // Get current part data
  const partData = useMemo(() => {
    if (!examData?.parts) return null;
    const partKey = `part${part}`;
    return examData.parts[partKey] || null;
  }, [examData, part]);

  if (!partData) {
    return (
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="text-center py-20">
          <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600">Loading part data...</p>
        </div>
      </div>
    );
  }

  // Calculate question range
  const partNumber = part;
  const startQuestion = ((partNumber - (section === 'listening' ? 1 : 5)) * cfg.questionsPerPart) + 1;
  const endQuestion = startQuestion + cfg.questionsPerPart - 1;

  return (
    <div className="max-w-7xl mx-auto px-8 py-6 space-y-6 pb-32">
      {/* Content Display (Audio/Reading) */}
      {section === 'listening' ? (
        <div className="relative z-20">
          <ContentDisplay
            partData={partData}
            selectedPart={`part${part}`}
            currentQuestionIndex={0}
            testType={section}
            examId="exam1"
            isPartPlayed={playedParts.includes(part)}
            onAudioStart={onAudioStart}
            onAudioEnd={onAudioEnd}
          />
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-slate-200 p-8">
          <h3 className="text-lg font-bold text-slate-900 mb-4">
            Reading Content
          </h3>
          <ContentDisplay
            partData={partData}
            selectedPart={`part${part}`}
            currentQuestionIndex={0}
            testType={section}
            examId="exam1"
            isPartPlayed={false}
            onAudioStart={() => {}}
            onAudioEnd={() => {}}
          />
        </div>
      )}

      {/* Questions Section */}
      <div className="bg-white rounded-lg p-6 border border-slate-200">
        <h3 className="font-bold text-lg mb-6 text-slate-900">
          Part {partNumber}: Questions {startQuestion} – {endQuestion}
        </h3>

        {/* Questions List */}
        <div className="space-y-4">
          {partData?.questions && partData.questions.length > 0 ? (
            partData.questions.map((question, idx) => {
              const questionNum = idx + 1;
              const questionKey = `${section}-part${part}-q${questionNum}`;
              const selectedAnswer = answers[questionKey];

              return (
                <QuestionCard
                  key={questionKey}
                  question={question}
                  questionNum={questionNum}
                  selectedAnswer={selectedAnswer}
                  onAnswerSelect={(optionIndex) => onSelectAnswer(questionNum, optionIndex)}
                  questionKey={questionKey}
                />
              );
            })
          ) : (
            <div className="text-center py-8 text-slate-600">
              <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No questions available for this part</p>
            </div>
          )}
        </div>
      </div>

      {/* Part Navigation */}
      <PartNavigation
        currentPart={part}
        totalParts={cfg.parts}
        startPartNumber={section === 'listening' ? 1 : 5}
        answers={answers}
        section={section}
        questionsPerPart={cfg.questionsPerPart}
        onPartChange={onNavigatePart}
        playedParts={section === 'listening' ? playedParts : []}
        isAudioPlaying={isAudioPlaying}
      />

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        {/* Previous Part Button */}
        <button
          onClick={() => {
            const minPart = section === 'listening' ? 1 : 5;
            if (part > minPart && !isAudioPlaying) {
              onNavigatePart(part - 1);
            }
          }}
          disabled={part === (section === 'listening' ? 1 : 5) || isAudioPlaying}
          className="flex-1 py-4 rounded-lg font-bold flex items-center justify-center gap-2 disabled:opacity-50 text-white transition-all duration-200"
          style={{ backgroundColor: COLORS.blue }}
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Previous Part</span>
        </button>

        {/* Next/Submit Button */}
        {isLastReadingPart ? (
          <button
            onClick={onSubmit}
            disabled={isAudioPlaying}
            className="flex-1 py-4 rounded-lg font-bold flex items-center justify-center gap-2 text-white transition-all duration-200 disabled:opacity-50"
            style={{ backgroundColor: '#DC2626' }}
          >
            <Flag className="w-5 h-5" />
            <span>Submit Test</span>
          </button>
        ) : isLastListeningPart ? (
          <button
            onClick={onNextSection}
            disabled={isAudioPlaying}
            className="flex-1 py-4 rounded-lg font-bold flex items-center justify-center gap-2 text-white transition-all duration-200 disabled:opacity-50"
            style={{ backgroundColor: COLORS.orange }}
          >
            <ArrowRight className="w-5 h-5" />
            <span>Go to Reading</span>
          </button>
        ) : (
          <button
            onClick={() => {
              if (!isAudioPlaying) {
                onNavigatePart(part + 1);
              }
            }}
            disabled={isAudioPlaying}
            className="flex-1 py-4 rounded-lg font-bold flex items-center justify-center gap-2 text-white transition-all duration-200 disabled:opacity-50"
            style={{ backgroundColor: COLORS.blue }}
          >
            <span>Next Part</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
});

ExamScreen.displayName = 'ExamScreen';
export default ExamScreen;