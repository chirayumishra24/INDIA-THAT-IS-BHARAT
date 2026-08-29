export type SectionId = 
  | 'intro'
  | 'roadmap'
  | 'activity-arena'
  | 'dual-name'
  | 'bharat-origin'
  | 'jambudvipa'
  | 'sindhu-to-india'
  | 'foreign-travelers'
  | 'geographical-unity'
  | 'cultural-tapestry'
  | 'revision'
  | 'assessment'
  | 'learning-report'
  | 'teacher-dashboard';

export type ConfidenceRating = 'need-help' | 'getting-it' | 'understand' | 'can-explain';

export interface KeyConceptCard {
  id: string;
  term: string;
  pronunciation?: string;
  title: string;
  definition: string;
  explanation: string;
  chapterReference: string;
  rememberNote: string;
  iconName?: string;
}

export interface SourceArtifact {
  id: string;
  title: string;
  era: string;
  location: string;
  languageScript: string;
  sourceType: 'inscription' | 'manuscript' | 'text' | 'travelogue' | 'constitution';
  originalSnippet: string;
  transliteration?: string;
  translation: string;
  whatWeSee: string;
  whatItTellsUs: string;
  whatWeLearn: string;
  importantTerm: string;
  thinkPrompt: string;
}

export interface EtymologyStep {
  id: string;
  stage: number;
  name: string;
  languageOrPeople: string;
  approxDate: string;
  phoneticRule: string;
  meaningAndContext: string;
  sourceOrDoc: string;
}

export interface SortItem {
  id: string;
  text: string;
  categoryId: string;
  explanation: string;
}

export interface SortCategory {
  id: string;
  title: string;
  description: string;
}

export interface MisconceptionItem {
  id: string;
  statement: string;
  isTrue: boolean;
  explanation: string;
  chapterReference: string;
}

export interface ThinkConnectOption {
  id: string;
  text: string;
  isBest: boolean;
  feedback: string;
}

export interface ThinkConnectItem {
  id: string;
  ideaA: string;
  ideaB: string;
  question: string;
  options: ThinkConnectOption[];
  modelExplanation: string;
}

export interface KeyTerm {
  id: string;
  term: string;
  iast?: string;
  devanagari?: string;
  shortDefinition: string;
  chapterContext: string;
  textbookExample: string;
  usagePrompt: string;
  keywordsExpected: string[];
}

export interface FormativeCheck {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  takeaway: string;
}

export interface ComicDialogue {
  speaker: string;
  role: string;
  quote: string;
  context: string;
  takeaway: string;
}

export interface LessonSection {
  id: SectionId;
  number: number;
  title: string;
  subtitle: string;
  sourceReference: string;
  durationMinutes: number;
  shortExplanation: string;
  keyWords: string[];
  comicFeature?: {
    imageSrc: string;
    imageAlt: string;
    title: string;
    subtitle: string;
    eraBadge: string;
    dialogues: ComicDialogue[];
  };
  conceptCards?: KeyConceptCard[];
  sources?: SourceArtifact[];
  etymologySteps?: EtymologyStep[];
  sortActivity?: {
    instruction: string;
    categories: SortCategory[];
    items: SortItem[];
  };
  misconceptions?: MisconceptionItem[];
  thinkConnect?: ThinkConnectItem[];
  keyTerms?: KeyTerm[];
  buildTheIdea?: {
    instruction: string;
    pieces: { id: string; role: string; text: string }[];
    correctOrder: string[];
    completeNarrative: string;
  };
  formativeCheck: FormativeCheck;
  keyTakeaway: string;
}

export type AssessmentCategory = 
  | 'concept-understanding'
  | 'key-terms'
  | 'source-interpretation'
  | 'connections'
  | 'application'
  | 'reasoning';

export interface SummativeQuestion {
  id: string;
  sectionId: SectionId;
  category: AssessmentCategory;
  type: 'mcq' | 'multi-select' | 'true-false' | 'source-analysis' | 'ordering' | 'short-answer';
  points: number;
  question: string;
  isApplicationQuestion?: boolean;
  sourceSnippet?: string;
  options?: string[];
  correctAnswer: number | number[] | boolean | string[] | string;
  explanation: string;
  keyIdea: string;
  sourceReference: string;
  difficulty: 'Easy' | 'Medium' | 'Challenging';
  learningObjective: string;
  keywordsForShortAnswer?: string[];
}

export interface StudentState {
  currentSectionId: SectionId;
  completedSections: string[];
  confidenceRatings: Record<string, ConfidenceRating>;
  bookmarks: string[];
  notes: Record<string, string>;
  formativeAnswers: Record<string, number>;
  summativeAnswers: Record<string, any>;
  assessmentSubmitted: boolean;
  scoreBreakdown?: {
    total: number;
    categoryScores: Record<AssessmentCategory, { earned: number; max: number }>;
    percentage: number;
    masteryLevel: 'CHAPTER MASTER' | 'STRONG UNDERSTANDING' | 'DEVELOPING' | 'NEEDS MORE PRACTICE';
    strongTopics: string[];
    reviewTopics: { sectionId: SectionId; title: string; reason: string }[];
  };
}
