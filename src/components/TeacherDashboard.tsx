'use client';

import React, { useState } from 'react';
import { SectionId } from '@/types';
import { TEACHER_DATA_SUMMARY, SUMMATIVE_QUESTIONS, LESSON_SECTIONS } from '@/data/chapterContent';
import { 
  School, 
  Users, 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  BarChart3, 
  BookOpen, 
  FileText, 
  Download, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface TeacherDashboardProps {
  onNavigateSection: (sectionId: SectionId) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ onNavigateSection }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'worksheet'>('overview');

  return (
    <div className="py-6 px-4 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Teacher Dashboard Header */}
      <div className="bg-[#1B2A4A] text-white rounded-3xl p-6 sm:p-10 shadow-academic flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300 bg-white/10 px-3 py-1 rounded-full">
            <School className="w-4 h-4 text-amber-400" />
            <span>Teacher Mode • Instructional Analytics</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Class VI Social Science — Chapter 5 Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-gray-300">
            Monitor class mastery, diagnose learning gaps, and review curriculum alignment.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-[#1B2A4A] rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Print / Export Report</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#DACBBB] pb-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
            activeTab === 'overview'
              ? 'bg-[#1B2A4A] text-white'
              : 'bg-white text-gray-700 border border-[#DACBBB] hover:bg-amber-50'
          }`}
        >
          <BarChart3 className="w-4 h-4" /> Class Overview
        </button>

        <button
          onClick={() => setActiveTab('curriculum')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
            activeTab === 'curriculum'
              ? 'bg-[#1B2A4A] text-white'
              : 'bg-white text-gray-700 border border-[#DACBBB] hover:bg-amber-50'
          }`}
        >
          <BookOpen className="w-4 h-4" /> Question Curriculum Matrix
        </button>

        <button
          onClick={() => setActiveTab('worksheet')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
            activeTab === 'worksheet'
              ? 'bg-[#1B2A4A] text-white'
              : 'bg-white text-gray-700 border border-[#DACBBB] hover:bg-amber-50'
          }`}
        >
          <FileText className="w-4 h-4" /> Printable Lesson Outline
        </button>
      </div>

      {/* Tab 1: Class Overview & Metrics */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          
          {/* 4 Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-[#EAE0CF] shadow-xs space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase">
                <Users className="w-4 h-4 text-blue-600" /> Completion Rate
              </div>
              <div className="text-2xl font-serif font-bold text-[#14213D]">
                {TEACHER_DATA_SUMMARY.studentsCompleted} / {TEACHER_DATA_SUMMARY.totalStudentsEnrolled}
              </div>
              <div className="text-[11px] text-emerald-700 font-semibold">
                89.4% students finished
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#EAE0CF] shadow-xs space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase">
                <Award className="w-4 h-4 text-amber-600" /> Class Average
              </div>
              <div className="text-2xl font-serif font-bold text-[#14213D]">
                {TEACHER_DATA_SUMMARY.classAverageScore} <span className="text-sm font-sans font-normal text-gray-400">/ 100</span>
              </div>
              <div className="text-[11px] text-blue-700 font-semibold">
                Strong Understanding
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#EAE0CF] shadow-xs space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Avg Confidence
              </div>
              <div className="text-2xl font-serif font-bold text-[#14213D]">
                {TEACHER_DATA_SUMMARY.classAverageConfidence}
              </div>
              <div className="text-[11px] text-gray-600">
                Self-reported by learners
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#EAE0CF] shadow-xs space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase">
                <AlertTriangle className="w-4 h-4 text-rose-600" /> Action Required
              </div>
              <div className="text-2xl font-serif font-bold text-rose-700">
                1 Topic
              </div>
              <div className="text-[11px] text-rose-700 font-semibold">
                Trade Routes & Geography
              </div>
            </div>
          </div>

          {/* Topic Mastery Distribution */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EAE0CF] shadow-academic space-y-4">
            <h3 className="text-base font-serif font-bold text-[#14213D]">
              Topic Mastery Across Class Cohort
            </h3>

            <div className="space-y-4">
              {TEACHER_DATA_SUMMARY.topicMastery.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-gray-800">{item.topic}</span>
                    <span className={`font-bold ${
                      item.masteryPct >= 85 ? 'text-emerald-700' : item.masteryPct >= 75 ? 'text-blue-700' : 'text-amber-800'
                    }`}>
                      {item.masteryPct}% ({item.status})
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-2.5 rounded-full ${
                        item.masteryPct >= 85 ? 'bg-emerald-600' : item.masteryPct >= 75 ? 'bg-blue-600' : 'bg-amber-500'
                      }`}
                      style={{ width: `${item.masteryPct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Teacher Revision Recommendations */}
          <div className="bg-[#FAF6EE] p-6 rounded-3xl border border-[#DACBBB] space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-700" />
              Recommended In-Class Revision For Tomorrow:
            </div>
            <ul className="space-y-2 text-xs text-gray-700 font-medium">
              {TEACHER_DATA_SUMMARY.recommendedClassRevision.map((rec, i) => (
                <li key={i} className="flex items-start gap-2 bg-white p-3 rounded-xl border border-[#EAE0CF]">
                  <span className="text-amber-700 font-bold">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      )}

      {/* Tab 2: Question Curriculum Matrix */}
      {activeTab === 'curriculum' && (
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-[#EAE0CF] shadow-academic space-y-4">
            <h3 className="text-base font-serif font-bold text-[#14213D]">
              Assessment Items Aligned to NCERT Chapter 5
            </h3>

            <div className="space-y-4">
              {SUMMATIVE_QUESTIONS.map((q, idx) => (
                <div
                  key={q.id}
                  className="bg-[#FAF6EE] p-5 rounded-2xl border border-[#DACBBB] space-y-2 text-xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#1B2A4A] bg-white px-2 py-0.5 rounded border border-[#DACBBB]">
                        Q{idx + 1} • {q.points} Pts
                      </span>
                      <span className="font-semibold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        {q.category}
                      </span>
                      <span className="text-gray-500 font-medium">
                        Difficulty: <strong>{q.difficulty}</strong>
                      </span>
                    </div>

                    <span className="text-[10px] text-gray-500 font-mono">
                      Ref: {q.sourceReference}
                    </span>
                  </div>

                  <p className="font-serif font-bold text-sm text-[#14213D] pt-1">
                    {q.question}
                  </p>

                  <div className="bg-white p-3 rounded-xl border border-[#EAE0CF] space-y-1">
                    <div>
                      <strong className="text-emerald-800">Correct Answer:</strong>{' '}
                      {q.type === 'short-answer'
                        ? q.correctAnswer
                        : q.options
                        ? q.options[q.correctAnswer as number]
                        : String(q.correctAnswer)}
                    </div>
                    <div className="text-gray-600">
                      <strong>Learning Objective:</strong> {q.learningObjective}
                    </div>
                    <div className="text-gray-600">
                      <strong>Explanation:</strong> {q.explanation}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Printable Lesson Outline */}
      {activeTab === 'worksheet' && (
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#EAE0CF] shadow-academic space-y-6">
          <div className="border-b border-[#EAE0CF] pb-4">
            <h3 className="text-xl font-serif font-bold text-[#14213D]">
              Class VI Social Science — Chapter 5 Teaching Outline
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              NCERT "Exploring Society: India and Beyond" • Theme B: Tapestry of the Past
            </p>
          </div>

          <div className="space-y-4">
            {LESSON_SECTIONS.map(sec => (
              <div key={sec.id} className="p-4 bg-[#FAF6EE] rounded-xl border border-[#DACBBB] space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-sm text-[#14213D]">
                    Part {sec.number}: {sec.title}
                  </h4>
                  <span className="text-xs text-gray-500 font-medium">{sec.durationMinutes} mins</span>
                </div>
                <p className="text-xs text-gray-700">{sec.shortExplanation}</p>
                <div className="text-[11px] text-amber-900 font-medium">
                  <strong>Key Takeaway:</strong> {sec.keyTakeaway}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
