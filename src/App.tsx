import { useState } from 'react';
import { ViewState, EmotionAnalysis } from './types';
import { SHOW_DEMO_NOTICES, QUESTION_TEXTS } from './constants';
import { generateMockAnalysis } from './mockData';
import { DevNoticeView } from './components/DevNoticeView';
import { InputView } from './components/InputView';
import { AnalyzingView } from './components/AnalyzingView';
import { ResultsView } from './components/ResultsView';

function App() {
  const [viewState, setViewState] = useState<ViewState>(SHOW_DEMO_NOTICES ? 'devNotice' : 'input');
  const [analysis, setAnalysis] = useState<EmotionAnalysis | null>(null);
  const [sessionCount, setSessionCount] = useState(0);

  const questionText = QUESTION_TEXTS[Math.min(sessionCount, QUESTION_TEXTS.length - 1)];

  const handleProceedFromDevNotice = () => {
    setViewState('input');
  };

  const handleInputProceed = () => {
    setViewState('analyzing');
  };

  const handleAnalysisComplete = () => {
    const mockAnalysis = generateMockAnalysis();
    setAnalysis(mockAnalysis);
    setViewState('results');
  };

  const handleStartOver = () => {
    setViewState('input');
    setAnalysis(null);
    setSessionCount(prev => prev + 1);
  };

  const handleClose = () => {
    setViewState('input');
    setAnalysis(null);
    setSessionCount(0);
  };

  if (viewState === 'devNotice') {
    return <DevNoticeView onProceed={handleProceedFromDevNotice} />;
  }

  if (viewState === 'input') {
    return <InputView questionText={questionText} onProceed={handleInputProceed} />;
  }

  if (viewState === 'analyzing') {
    return <AnalyzingView onAnalysisComplete={handleAnalysisComplete} />;
  }

  if (viewState === 'results' && analysis) {
    return (
      <ResultsView
        analysis={analysis}
        onStartOver={handleStartOver}
        onClose={handleClose}
      />
    );
  }

  return null;
}

export default App;
