'use client';

import React, { useState, useEffect } from 'react';
import { SectionId, StudentState, SummativeQuestion, AssessmentCategory } from '@/types';
import { SUMMATIVE_QUESTIONS, LESSON_SECTIONS } from '@/data/chapterContent';
import confetti from 'canvas-confetti';
import { 
  GraduationCap, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  RotateCcw, 
  ArrowRight, 
  ArrowLeft, 
  Award, 
  Bookmark, 
  BookOpen, 
  HelpCircle,
  FileText,
  Sparkles,
  BarChart3
} from 'lucide-react';

interface AssessmentEngineProps {
  studentState: StudentState;
  onSaveAssessmentScore: (scoreData: NonNullable<StudentState['scoreBreakdown']>, answers: Record<string, any>) => void;
  onNavigateSection: (sectionId: SectionId) => void;
}

const CATEGORY_NAMES: Record<AssessmentCategory, string> = {
  'concept-understanding': 'Concept Understanding',
  'key-terms': 'Key Terminology',
  'source-interpretation': 'Source Interpretation',
  'connections': 'Historical Connections',
  'application': 'Application & Transfer',
  'reasoning': 'Reasoning & Synthesis'
};

export const AssessmentEngine: React.FC<AssessmentEngineProps> = ({
  studentState,
  onSaveAssessmentScore,
  onNavigateSection
}) => {
  // Local answers state
  const [answers, setAnswers] = useState<Record<string, any>>(studentState.summativeAnswers || {});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(studentState.assessmentSubmitted);
  const [scoreResult, setScoreResult] = useState<NonNullable<StudentState['scoreBreakdown']> | null>(
    studentState.scoreBreakdown || null
  );

  // Retry mode state: array of question IDs to re-take
  const [retryQuestionIds, setRetryQuestionIds] = useState<string[] | null>(null);

  const activeQuestionList = retryQuestionIds
    ? SUMMATIVE_QUESTIONS.filter(q => retryQuestionIds.includes(q.id))
    : SUMMATIVE_QUESTIONS;

  const currentQuestion = activeQuestionList[currentQuestionIndex] || activeQuestionList[0];

  const handleSelectAnswer = (qId: string, val: any) => {
    setAnswers(prev => ({
      ...prev,
      [qId]: val
    }));
  };

  const calculateResults = () => {
    let totalScore = 0;
    const maxScore = 100;

    const categoryScores: Record<AssessmentCategory, { earned: number; max: number }> = {
      'concept-understanding': { earned: 0, max: 0 },
      'key-terms': { earned: 0, max: 0 },
      'source-interpretation': { earned: 0, max: 0 },
      'connections': { earned: 0, max: 0 },
      'application': { earned: 0, max: 0 },
      'reasoning': { earned: 0, max: 0 }
    };

    const reviewTopics: { sectionId: SectionId; title: string; reason: string }[] = [];
    const strongTopics: string[] = [];

    SUMMATIVE_QUESTIONS.forEach(q => {
      categoryScores[q.category].max += q.points;
      const studentAns = answers[q.id];

      let isCorrect = false;

      if (q.type === 'short-answer') {
        if (studentAns && typeof studentAns === 'string') {
          const lower = studentAns.toLowerCase();
          const matched = q.keywordsForShortAnswer?.filter(kw => lower.includes(kw.toLowerCase())) || [];
          if (matched.length >= 2 || (studentAns.length > 30 && matched.length >= 1)) {
            isCorrect = true;
          }
        }
      } else {
        if (studentAns === q.correctAnswer) {
          isCorrect = true;
        }
      }

      if (isCorrect) {
        categoryScores[q.category].earned += q.points;
        totalScore += q.points;
      } else {
        const sec = LESSON_SECTIONS.find(s => s.id === q.sectionId);
        if (sec && !reviewTopics.some(r => r.sectionId === q.sectionId)) {
          reviewTopics.push({
            sectionId: q.sectionId,
            title: sec.title,
            reason: `Review questions on "${q.learningObjective}"`
          });
        }
      }
    });

    // Populate strong topics
    LESSON_SECTIONS.forEach(sec => {
      if (!reviewTopics.some(r => r.sectionId === sec.id)) {
        strongTopics.push(sec.title);
      }
    });

    const percentage = Math.round((totalScore / maxScore) * 100);

    let masteryLevel: 'CHAPTER MASTER' | 'STRONG UNDERSTANDING' | 'DEVELOPING' | 'NEEDS MORE PRACTICE';
    if (percentage >= 90) masteryLevel = 'CHAPTER MASTER';
    else if (percentage >= 75) masteryLevel = 'STRONG UNDERSTANDING';
    else if (percentage >= 50) masteryLevel = 'DEVELOPING';
    else masteryLevel = 'NEEDS MORE PRACTICE';

    const finalResult = {
      total: totalScore,
      categoryScores,
      percentage,
      masteryLevel,
      strongTopics,
      reviewTopics
    };

    setScoreResult(finalResult);
    setIsSubmitted(true);
    onSaveAssessmentScore(finalResult, answers);

    if (percentage >= 75) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore
      }
    }
  };

  const handleStartRetryWrong = () => {
    if (!scoreResult) return;
    const wrongIds: string[] = [];

    SUMMATIVE_QUESTIONS.forEach(q => {
      const studentAns = answers[q.id];
      let isCorrect = false;

      if (q.type === 'short-answer') {
        const lower = (studentAns || '').toLowerCase();
        const matched = q.keywordsForShortAnswer?.filter(kw => lower.includes(kw.toLowerCase())) || [];
        if (matched.length >= 2) isCorrect = true;
      } else {
        if (studentAns === q.correctAnswer) isCorrect = true;
      }

      if (!isCorrect) {
        wrongIds.push(q.id);
      }
    });

    if (wrongIds.length > 0) {
      setRetryQuestionIds(wrongIds);
      setCurrentQuestionIndex(0);
      setIsSubmitted(false);
    }
  };

  const allAnswered = activeQuestionList.every(q => answers[q.id] !== undefined && answers[q.id] !== '');

  // -------------------------------------------------------------
  // VIEW: LEARNING REPORT (SUBMITTED STATE)
  // -------------------------------------------------------------
  if (isSubmitted && scoreResult) {
    return (
      <div className="py-6 px-4 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
        
        {/* Score Banner */}
        <div className="bg-white rounded-3xl border border-[#EAE0CF] p-6 sm:p-10 shadow-academic text-center space-y-5">
          
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-4 py-1.5 rounded-full border border-amber-200">
            <Award className="w-4 h-4 text-amber-600" />
            <span>Summative Assessment Report • Chapter 5</span>
          </div>

          <div className="space-y-1">
            <div className="text-4xl sm:text-6xl font-serif font-black text-[#14213D]">
              {scoreResult.total} <span className="text-2xl sm:text-3xl text-gray-400 font-sans font-normal">/ 100</span>
            </div>
            
            <div className={`text-base sm:text-lg font-serif font-bold ${
              scoreResult.percentage >= 90
                ? 'text-emerald-700'
                : scoreResult.percentage >= 75
                ? 'text-blue-700'
                : scoreResult.percentage >= 50
                ? 'text-amber-700'
                : 'text-rose-700'
            }`}>
              Mastery Status: {scoreResult.masteryLevel}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto">
            {scoreResult.percentage >= 90
              ? 'Incredible mastery! You have demonstrated deep command of ancient texts, inscriptions, and historical reasoning.'
              : scoreResult.percentage >= 75
              ? 'Great performance! You have a solid grasp of how India’s names and geographical identity evolved.'
              : 'Good start! Review the recommended sections below to reinforce concepts before testing again.'}
          </p>

          {/* Action buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            {scoreResult.reviewTopics.length > 0 && (
              <button
                onClick={handleStartRetryWrong}
                className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-xs transition-colors flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retry Incorrect Questions ({scoreResult.reviewTopics.length})</span>
              </button>
            )}

            <button
              onClick={() => {
                setRetryQuestionIds(null);
                setCurrentQuestionIndex(0);
                setIsSubmitted(false);
              }}
              className="px-6 py-3 bg-[#FAF6EE] hover:bg-[#F4ECE0] text-[#1B2A4A] border border-[#DACBBB] font-bold rounded-xl text-xs sm:text-sm transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4 text-gray-600" />
              <span>Retake Full Test</span>
            </button>
          </div>

        </div>

        {/* Category Breakdown Bars */}
        <div className="bg-white rounded-3xl border border-[#EAE0CF] p-6 sm:p-8 shadow-academic space-y-4">
          <h3 className="text-base font-serif font-bold text-[#14213D] flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-blue-700" />
            Performance by Assessment Category
          </h3>

          <div className="space-y-3">
            {(Object.keys(scoreResult.categoryScores) as AssessmentCategory[]).map(catKey => {
              const cat = scoreResult.categoryScores[catKey];
              const pct = cat.max > 0 ? Math.round((cat.earned / cat.max) * 100) : 0;

              return (
                <div key={catKey} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-gray-700">
                    <span>{CATEGORY_NAMES[catKey]}</span>
                    <span className="font-bold text-[#1B2A4A]">
                      {cat.earned} / {cat.max} pts ({pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-2.5 rounded-full transition-all duration-500 ${
                        pct >= 80 ? 'bg-emerald-600' : pct >= 60 ? 'bg-blue-600' : pct >= 40 ? 'bg-amber-500' : 'bg-rose-500'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Personalized Revision Plan */}
        <div className="bg-[#FAF6EE] rounded-3xl border border-[#DACBBB] p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg font-serif font-bold text-[#14213D] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              Your Personalized Revision Plan
            </h3>
            <p className="text-xs text-gray-600">
              Targeted recommendations based on your individual assessment answers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Strong Topics */}
            <div className="bg-white p-5 rounded-2xl border border-[#EAE0CF] space-y-3">
              <div className="text-xs font-bold uppercase text-emerald-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                You Are Strong In:
              </div>
              {scoreResult.strongTopics.length > 0 ? (
                <ul className="space-y-2 text-xs text-gray-700 font-medium">
                  {scoreResult.strongTopics.map((topic, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-gray-500 italic">Complete revision to unlock strengths.</p>
              )}
            </div>

            {/* Topics Needing Review */}
            <div className="bg-white p-5 rounded-2xl border border-[#EAE0CF] space-y-3">
              <div className="text-xs font-bold uppercase text-amber-800 flex items-center gap-1.5">
                <RotateCcw className="w-4 h-4 text-amber-600" />
                Recommended For Review:
              </div>
              {scoreResult.reviewTopics.length > 0 ? (
                <div className="space-y-3">
                  {scoreResult.reviewTopics.map((rev, i) => (
                    <div key={i} className="p-3 bg-[#FAF6EE] rounded-xl border border-[#DACBBB] flex items-center justify-between gap-2">
                      <div>
                        <div className="text-xs font-bold text-[#1B2A4A]">{rev.title}</div>
                        <div className="text-[11px] text-gray-500">{rev.reason}</div>
                      </div>
                      <button
                        onClick={() => onNavigateSection(rev.sectionId)}
                        className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold shrink-0 transition-colors"
                      >
                        Review Section →
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-emerald-700 font-semibold">
                  Fantastic! You answered questions from every section correctly.
                </p>
              )}
            </div>

          </div>
        </div>

        {/* Detailed Question Review List with Explanations */}
        <div className="bg-white rounded-3xl border border-[#EAE0CF] p-6 sm:p-8 shadow-academic space-y-6">
          <h3 className="text-base font-serif font-bold text-[#14213D] flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-700" />
            Detailed Question Explanations & Solutions
          </h3>

          <div className="space-y-4">
            {SUMMATIVE_QUESTIONS.map((q, idx) => {
              const studentAns = answers[q.id];
              let isCorrect = false;

              if (q.type === 'short-answer') {
                const lower = (studentAns || '').toLowerCase();
                const matched = q.keywordsForShortAnswer?.filter(kw => lower.includes(kw.toLowerCase())) || [];
                if (matched.length >= 2) isCorrect = true;
              } else {
                if (studentAns === q.correctAnswer) isCorrect = true;
              }

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-2xl border space-y-3 ${
                    isCorrect
                      ? 'bg-emerald-50/40 border-emerald-200'
                      : 'bg-rose-50/40 border-rose-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-white border font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 text-[#1B2A4A]">
                        {idx + 1}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                            {CATEGORY_NAMES[q.category]} • ({q.points} Points)
                          </span>
                          {q.isApplicationQuestion && (
                            <span className="text-[9px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-300">
                              APPLICATION QUESTION
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm font-serif font-bold text-[#14213D] mt-0.5">
                          {q.question}
                        </h4>
                      </div>
                    </div>

                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold shrink-0 ${
                      isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {isCorrect ? `+${q.points} Pts` : '0 Pts'}
                    </span>
                  </div>

                  {/* Student vs Best Answer */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-white p-3.5 rounded-xl border border-gray-200">
                    <div>
                      <span className="font-bold text-gray-600 uppercase text-[10px]">Your Response:</span>
                      <p className="mt-0.5 font-medium text-gray-900">
                        {q.type === 'short-answer'
                          ? (studentAns || '<No answer provided>')
                          : q.options
                          ? (q.options[studentAns] || '<No answer selected>')
                          : String(studentAns)}
                      </p>
                    </div>

                    <div>
                      <span className="font-bold text-emerald-800 uppercase text-[10px]">Best Answer:</span>
                      <p className="mt-0.5 font-medium text-emerald-900">
                        {q.type === 'short-answer'
                          ? q.correctAnswer
                          : q.options
                          ? q.options[q.correctAnswer as number]
                          : String(q.correctAnswer)}
                      </p>
                    </div>
                  </div>

                  {/* Why & Key Idea */}
                  <div className="text-xs space-y-1 bg-white/70 p-3 rounded-xl border border-gray-200">
                    <p className="text-gray-800">
                      <strong>Why:</strong> {q.explanation}
                    </p>
                    <p className="text-amber-900 font-semibold pt-1">
                      <strong>Key Idea:</strong> {q.keyIdea}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW: ACTIVE ASSESSMENT QUESTION RUNNER
  // -------------------------------------------------------------
  return (
    <div className="py-6 px-4 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Test Progress Top Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#EAE0CF] shadow-xs flex items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
            {retryQuestionIds ? 'RETRY MODE' : 'SUMMATIVE ASSESSMENT'}
          </span>
          <h3 className="text-xs sm:text-sm font-bold text-[#14213D]">
            Question {currentQuestionIndex + 1} of {activeQuestionList.length}
          </h3>
        </div>

        {/* Step indicator pills */}
        <div className="flex gap-1 overflow-x-auto max-w-[200px] sm:max-w-none">
          {activeQuestionList.map((q, idx) => {
            const isAnswered = answers[q.id] !== undefined && answers[q.id] !== '';
            const isCurrent = idx === currentQuestionIndex;

            return (
              <button
                key={q.id}
                onClick={() => setCurrentQuestionIndex(idx)}
                className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center transition-all ${
                  isCurrent
                    ? 'bg-amber-600 text-white shadow-xs'
                    : isAnswered
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-[#FAF6EE] text-gray-500 border border-[#DACBBB]'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white rounded-3xl border border-[#EAE0CF] p-6 sm:p-10 shadow-academic space-y-6">
        
        {/* Question Header & Category */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EAE0CF] pb-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-xs font-bold">
              {CATEGORY_NAMES[currentQuestion.category]}
            </span>
            {currentQuestion.isApplicationQuestion && (
              <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold">
                APPLICATION QUESTION
              </span>
            )}
          </div>
          <span className="text-xs font-bold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
            {currentQuestion.points} Points
          </span>
        </div>

        {/* Source Box if present */}
        {currentQuestion.sourceSnippet && (
          <div className="p-4 bg-[#FAF6EE] rounded-xl border border-[#DACBBB] manuscript-border text-xs sm:text-sm font-serif italic text-gray-800">
            {currentQuestion.sourceSnippet}
          </div>
        )}

        {/* Question Title */}
        <h3 className="text-base sm:text-xl font-serif font-bold text-[#14213D] leading-relaxed">
          {currentQuestion.question}
        </h3>

        {/* Multiple Choice Options */}
        {currentQuestion.options && (
          <div className="space-y-3">
            {currentQuestion.options.map((opt, optIdx) => {
              const isSelected = answers[currentQuestion.id] === optIdx;

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectAnswer(currentQuestion.id, optIdx)}
                  className={`w-full p-4 rounded-2xl border text-xs sm:text-sm text-left transition-all flex items-start gap-3.5 ${
                    isSelected
                      ? 'bg-[#1B2A4A] text-white border-[#1B2A4A] shadow-md ring-2 ring-amber-300'
                      : 'bg-[#FAF6EE] text-gray-800 border-[#DACBBB] hover:bg-white hover:border-amber-400'
                  }`}
                >
                  <span className={`w-6 h-6 rounded-full border font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 ${
                    isSelected
                      ? 'bg-amber-400 text-[#1B2A4A] border-amber-400'
                      : 'bg-white text-gray-600 border-gray-300'
                  }`}>
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span className="leading-relaxed font-medium">{opt}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Short Answer Field */}
        {currentQuestion.type === 'short-answer' && (
          <div className="space-y-2">
            <textarea
              value={answers[currentQuestion.id] || ''}
              onChange={(e) => handleSelectAnswer(currentQuestion.id, e.target.value)}
              placeholder="Write your explanation here (2–4 sentences)... e.g. Different names arose from ancient tribes, native trees, and foreign traveler perceptions."
              rows={5}
              className="w-full p-4 rounded-2xl border border-[#DACBBB] text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
            />
            <p className="text-[11px] text-gray-500">
              * Your response will be analyzed for key historical concepts and civilizational causes.
            </p>
          </div>
        )}

        {/* Nav Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-[#EAE0CF]">
          <button
            disabled={currentQuestionIndex === 0}
            onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
            className="px-4 py-2.5 rounded-xl border border-[#DACBBB] bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" /> Previous
          </button>

          {currentQuestionIndex < activeQuestionList.length - 1 ? (
            <button
              onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
              className="px-6 py-2.5 bg-[#1B2A4A] hover:bg-[#0F1829] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <span>Next Question</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={calculateResults}
              className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-academic flex items-center gap-2 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Submit Assessment</span>
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
