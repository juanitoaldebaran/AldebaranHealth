export interface Question {
  id: number;
  question: string;
  reverse_scored?: boolean;
  category?: string;
}

export interface PSS10Results {
  total_score: number;
  stress_level: string;
  stress_description: string;
  color: string;
  max_possible_score: number;
  percentage: number;
}

export interface AnalysisResults {
  pss10_results: PSS10Results;
  ml_prediction: {
    predicted_level: string;
    confidence: number;
    probabilities: Record<string, number>;
  };
  analysis: {
    high_stress_indicators: Array<{
      question_id: number;
      category: string;
      concern: string;
    }>;
    positive_indicators: Array<{
      question_id: number;
      category: string;
      strength: string;
    }>;
    key_concerns: string[];
    strengths: string[];
  };
  recommendations: string[];
  risk_assessment: {
    level: string;
    urgency: string;
    color: string;
  };
  timestamp: string;
}