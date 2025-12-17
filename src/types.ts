export interface EmotionAnalysis {
  emotionLabel: string;
  understanding: string;
  actionableSteps: string[];
}

export type ViewState = 'devNotice' | 'input' | 'analyzing' | 'results';
