'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { TRAVELER_DOSSIERS, TravelerDossier } from '@/data/activityGamesData';
import { Coins, Gavel, CheckCircle2, Award, Sparkles, HelpCircle, ShieldCheck } from 'lucide-react';

interface TravelerAuctionProps {
  onGameComplete?: (winner: 'lion' | 'peacock' | 'tie', scores: { lion: number; peacock: number }) => void;
}

export const TravelerAuction: React.FC<TravelerAuctionProps> = ({ onGameComplete }) => {
  const [phase, setPhase] = useState<'auction' | 'quiz' | 'results'>('auction');
  const [currentLotIndex, setCurrentLotIndex] = useState(0);

  // Coins & Possession
  const [coins, setCoins] = useState({ lion: 500, peacock: 500 });
  const [teamOwnership, setTeamOwnership] = useState<Record<string, 'lion' | 'peacock'>>({});
  const [currentBid, setCurrentBid] = useState(100);
  const [highestBidder, setHighestBidder] = useState<'lion' | 'peacock' | null>(null);

  // Scores
  const [scores, setScores] = useState({ lion: 0, peacock: 0 });

  // Quiz phase states
  const [activeQuizIndex, setActiveQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);

  const activeLot: TravelerDossier = TRAVELER_DOSSIERS[currentLotIndex];

  // Flattened questions for the quiz phase
  const allUnlockedQuestions = Object.entries(teamOwnership).flatMap(([travelerId, team]) => {
    const dossier = TRAVELER_DOSSIERS.find(t => t.id === travelerId);
    if (!dossier) return [];
    return dossier.unlockedQuestions.map(q => ({ ...q, travelerName: dossier.name, teamOwner: team }));
  });

  const handlePlaceBid = (team: 'lion' | 'peacock') => {
    const nextBid = highestBidder ? currentBid + 25 : activeLot.baseCost;
    if (coins[team] < nextBid) return;

    setCurrentBid(nextBid);
    setHighestBidder(team);
  };

  const handleHammerDown = () => {
    if (highestBidder) {
      // Deduct coins & record ownership
      setCoins(prev => ({
        ...prev,
        [highestBidder]: prev[highestBidder] - currentBid
      }));
      setTeamOwnership(prev => ({
        ...prev,
        [activeLot.id]: highestBidder
      }));
    }

    // Move to next auction lot
    if (currentLotIndex + 1 < TRAVELER_DOSSIERS.length) {
      setCurrentLotIndex(prev => prev + 1);
      setCurrentBid(TRAVELER_DOSSIERS[currentLotIndex + 1].baseCost);
      setHighestBidder(null);
    } else {
      // Transition to Quiz Showdown
      setPhase('quiz');
    }
  };

  const handleAnswerQuestion = (idx: number) => {
    if (selectedAnswer !== null || !allUnlockedQuestions[activeQuizIndex]) return;
    const currentQ = allUnlockedQuestions[activeQuizIndex];
    setSelectedAnswer(idx);

    const isCorrect = idx === currentQ.correctIndex;
    if (isCorrect) {
      setScores(prev => ({
        ...prev,
        [currentQ.teamOwner]: prev[currentQ.teamOwner] + currentQ.points
      }));
      setQuizFeedback(`✅ Correct! ${currentQ.explanation}`);
    } else {
      setQuizFeedback(`❌ Incorrect! ${currentQ.explanation}`);
    }
  };

  const handleNextQuizQuestion = () => {
    if (activeQuizIndex + 1 < allUnlockedQuestions.length) {
      setActiveQuizIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setQuizFeedback(null);
    } else {
      // Final Results calculation (Points + leftover coins bonus)
      const finalLion = scores.lion + Math.floor(coins.lion / 10);
      const finalPeacock = scores.peacock + Math.floor(coins.peacock / 10);
      setScores({ lion: finalLion, peacock: finalPeacock });
      setPhase('results');
      confetti({ particleCount: 100, spread: 70 });
      const winner = finalLion > finalPeacock ? 'lion' : finalPeacock > finalLion ? 'peacock' : 'tie';
      onGameComplete?.(winner, { lion: finalLion, peacock: finalPeacock });
    }
  };

  return (
    <div className="w-full text-[#14213D] space-y-4">
      {/* Top Banner & Coin Vault */}
      <div className="bg-amber-50/80 backdrop-blur-md rounded-2xl border border-amber-200 p-4 sm:p-5 mb-6 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Gavel className="w-5 h-5 text-amber-700" />
            <div>
              <h2 className="text-lg font-black text-amber-950 uppercase tracking-wide">
                Activity 3 • Ancient Traveler Auction
              </h2>
              <p className="text-xs text-gray-700 font-medium">
                {phase === 'auction' ? 'Phase 1: Bid Gold to Win Traveler Knowledge Packs' : 'Phase 2: The Grand Knowledge Showdown'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Lion Treasury */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-100 border border-amber-400 rounded-xl">
              <span className="text-lg">🦁</span>
              <div>
                <div className="text-[10px] uppercase font-bold text-amber-900">Team Lion</div>
                <div className="text-xs font-black text-amber-950 flex items-center gap-1">
                  <Coins className="w-3 h-3 text-amber-600" /> {coins.lion} Gold
                </div>
              </div>
            </div>

            {/* Peacock Treasury */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-teal-100 border border-teal-400 rounded-xl">
              <span className="text-lg">🦚</span>
              <div>
                <div className="text-[10px] uppercase font-bold text-teal-900">Team Peacock</div>
                <div className="text-xs font-black text-teal-950 flex items-center gap-1">
                  <Coins className="w-3 h-3 text-teal-600" /> {coins.peacock} Gold
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PHASE 1: AUCTION */}
      {phase === 'auction' && (
        <div className="space-y-6">
          {/* Active Traveler Card On the Block */}
          <div className="bg-white border-4 border-amber-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden text-black">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-24 h-24 rounded-2xl bg-amber-100 border-2 border-amber-400 flex items-center justify-center text-5xl shadow-inner flex-shrink-0">
                {activeLot.avatarIcon}
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-1">
                  <span className="px-2.5 py-0.5 bg-amber-200 text-amber-950 text-[10px] font-black rounded-full border border-amber-400 uppercase">
                    Lot {currentLotIndex + 1} of {TRAVELER_DOSSIERS.length}
                  </span>
                  <span className="text-xs text-gray-700 font-bold">{activeLot.century}</span>
                  <span className="text-xs text-amber-900 font-black">• {activeLot.origin}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-black">{activeLot.name}</h3>
                <p className="text-sm sm:text-base text-gray-800 font-semibold mt-2 leading-relaxed">
                  {activeLot.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {activeLot.factsLearned.map((f, i) => (
                    <span
                      key={i}
                      className="text-xs bg-amber-50 border border-amber-300 rounded-lg px-2.5 py-1 text-black font-bold flex items-center gap-1 shadow-xs"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" /> {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* Live Bid Box */}
              <div className="bg-amber-50/80 border-2 border-amber-500 rounded-2xl p-5 text-center min-w-[200px] shadow-md">
                <span className="text-xs font-black uppercase tracking-wider text-gray-700 block">
                  Current High Bid
                </span>
                <div className="text-3xl sm:text-4xl font-black text-amber-900 my-1 font-mono flex items-center justify-center gap-1">
                  <Coins className="w-7 h-7 text-amber-600" /> {currentBid}
                </div>
                <span className="text-xs text-black font-black block">
                  {highestBidder
                    ? highestBidder === 'lion'
                      ? '🦁 Team Lion Leads!'
                      : '🦚 Team Peacock Leads!'
                    : 'Opening Bid'}
                </span>
              </div>
            </div>

            {/* Bidding Buttons */}
            <div className="mt-8 pt-6 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={() => handlePlaceBid('lion')}
                disabled={coins.lion < (highestBidder ? currentBid + 25 : activeLot.baseCost)}
                className="py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-black rounded-xl text-xs uppercase tracking-wider transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                🦁 Bid +25 Gold (Team Lion)
              </button>

              <button
                onClick={handleHammerDown}
                className="py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Gavel className="w-4 h-4" /> Hammer Down / Pass Lot ➔
              </button>

              <button
                onClick={() => handlePlaceBid('peacock')}
                disabled={coins.peacock < (highestBidder ? currentBid + 25 : activeLot.baseCost)}
                className="py-3 px-4 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-black font-black rounded-xl text-xs uppercase tracking-wider transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                🦚 Bid +25 Gold (Team Peacock)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PHASE 2: QUIZ SHOWDOWN */}
      {phase === 'quiz' && (
        <div className="bg-white border-4 border-indigo-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl text-black">
          {allUnlockedQuestions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-700 font-bold mb-4">No travelers were purchased during auction!</p>
              <button
                onClick={() => setPhase('results')}
                className="px-6 py-2.5 bg-amber-500 text-black font-black rounded-xl text-xs"
              >
                View Final Treasury
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-gray-700">
                    Question {activeQuizIndex + 1} of {allUnlockedQuestions.length}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                      allUnlockedQuestions[activeQuizIndex].teamOwner === 'lion'
                        ? 'bg-amber-100 text-amber-950 border border-amber-300'
                        : 'bg-teal-100 text-teal-950 border border-teal-300'
                    }`}
                  >
                    Owned by {allUnlockedQuestions[activeQuizIndex].teamOwner === 'lion' ? 'Team Lion 🦁' : 'Team Peacock 🦚'}
                  </span>
                </div>

                <span className="text-xs text-amber-900 font-black">
                  {allUnlockedQuestions[activeQuizIndex].points} Points at Stake
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-black mb-6">
                {allUnlockedQuestions[activeQuizIndex].question}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {allUnlockedQuestions[activeQuizIndex].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswerQuestion(i)}
                    disabled={selectedAnswer !== null}
                    className={`p-4 sm:p-5 rounded-2xl border-2 text-left text-sm sm:text-base font-black transition-all cursor-pointer ${
                      selectedAnswer === i
                        ? i === allUnlockedQuestions[activeQuizIndex].correctIndex
                          ? 'bg-emerald-100 border-emerald-600 text-emerald-950 ring-2 ring-emerald-400'
                          : 'bg-rose-100 border-rose-600 text-rose-950 ring-2 ring-rose-400'
                        : 'bg-white border-gray-300 text-black hover:bg-amber-50 hover:border-amber-400 shadow-sm'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {quizFeedback && (
                <div className="p-4 bg-amber-50 border-2 border-amber-300 rounded-xl mb-4 text-sm font-bold text-black">
                  {quizFeedback}
                </div>
              )}

              {selectedAnswer !== null && (
                <button
                  onClick={handleNextQuizQuestion}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-black rounded-xl text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  Next Question ➔
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* PHASE 3: RESULTS PODIUM */}
      {phase === 'results' && (
        <div className="bg-white border-4 border-amber-500/60 rounded-3xl p-8 text-center shadow-2xl text-black">
          <Award className="w-14 h-14 text-amber-500 mx-auto mb-3" />
          <h2 className="text-3xl font-black text-black mb-2">
            {scores.lion > scores.peacock
              ? '🦁 Team Lion Claims the Merchant Crown!'
              : scores.peacock > scores.lion
              ? '🦚 Team Peacock Claims the Merchant Crown!'
              : 'Honorable Tie Across Both Civilizations!'}
          </h2>
          <p className="text-base font-bold text-gray-700 mb-6 max-w-lg mx-auto">
            Strategic bidding and historical recall have crowned the grandest travelers of ancient Bharat.
          </p>

          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8 text-left">
            <div className="p-4 bg-amber-950/60 border border-amber-500 rounded-2xl">
              <div className="text-xs text-amber-400 font-bold uppercase">Team Lion Final</div>
              <div className="text-3xl font-black text-white">{scores.lion} pts</div>
              <div className="text-[10px] text-gray-400 mt-1">Includes treasury gold bonus</div>
            </div>
            <div className="p-4 bg-teal-950/60 border border-teal-500 rounded-2xl">
              <div className="text-xs text-teal-400 font-bold uppercase">Team Peacock Final</div>
              <div className="text-3xl font-black text-white">{scores.peacock} pts</div>
              <div className="text-[10px] text-gray-400 mt-1">Includes treasury gold bonus</div>
            </div>
          </div>

          <button
            onClick={() => {
              setPhase('auction');
              setCurrentLotIndex(0);
              setCoins({ lion: 500, peacock: 500 });
              setTeamOwnership({});
              setCurrentBid(TRAVELER_DOSSIERS[0].baseCost);
              setHighestBidder(null);
              setScores({ lion: 0, peacock: 0 });
              setActiveQuizIndex(0);
              setSelectedAnswer(null);
              setQuizFeedback(null);
            }}
            className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-black rounded-xl text-xs uppercase tracking-wider transition-all shadow-xl"
          >
            Run New Auction ↺
          </button>
        </div>
      )}
    </div>
  );
};
