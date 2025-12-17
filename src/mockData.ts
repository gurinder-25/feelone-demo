import { EmotionAnalysis } from './types';

const emotions: EmotionAnalysis[] = [
  {
    emotionLabel: "Overwhelm & Anxiety",
    understanding: "You're experiencing a state of emotional overwhelm, where multiple stressors are converging and creating a sense of being unable to cope. This is your mind's way of signaling that you're carrying too much mental load. What you're feeling is valid and common - it's not a weakness, but rather a sign that you need to pause and recalibrate.",
    actionableSteps: [
      "Practice the 5-4-3-2-1 grounding technique: Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, and 1 you taste",
      "Write down everything on your mind for 10 minutes without filtering - this helps externalize the mental clutter",
      "Take 3 deep breaths, inhaling for 4 counts, holding for 4, exhaling for 6 - this activates your parasympathetic nervous system",
      "Identify one small task you can complete in the next 15 minutes to regain a sense of control"
    ]
  },
  {
    emotionLabel: "Deep Sadness",
    understanding: "You're moving through a period of profound sadness, which is one of the most honest and human emotions we can experience. This feeling is telling you that something matters deeply to you. Rather than pushing it away, acknowledging this sadness is an act of self-compassion and emotional courage.",
    actionableSteps: [
      "Allow yourself to feel without judgment - set a timer for 15 minutes to simply be with the emotion",
      "Reach out to one trusted person and share how you're feeling, even if it's just a text saying 'I'm having a hard day'",
      "Engage in gentle movement like a short walk or stretching to help process the emotion physically",
      "Create a comfort routine: warm tea, soft lighting, comforting music - small acts of self-care matter"
    ]
  },
  {
    emotionLabel: "Confusion & Uncertainty",
    understanding: "You're in a space of ambiguity where the path forward isn't clear. This uncertainty can feel destabilizing, but it's also a natural part of growth and transition. Your mind is processing multiple possibilities, and the discomfort you feel is actually your psyche working to find clarity.",
    actionableSteps: [
      "Journal on these prompts: 'What do I know for certain?' and 'What am I afraid of?'",
      "Break down the confusion into smaller, specific questions you can address one at a time",
      "Talk it out loud - sometimes hearing yourself explain the situation brings unexpected clarity",
      "Give yourself permission to not have all the answers right now - clarity often comes with time and patience"
    ]
  },
  {
    emotionLabel: "Quiet Joy",
    understanding: "You're experiencing a gentle, peaceful form of contentment that doesn't need to be loud or dramatic. This is a beautiful state of being present and appreciative of the moment. Sometimes we overlook this quieter form of happiness, but it's one of the most sustainable and nourishing emotional states.",
    actionableSteps: [
      "Take a moment to consciously acknowledge what's bringing you this feeling - name it out loud or write it down",
      "Share your positive state with someone else - joy multiplies when expressed",
      "Capture this moment in your mind as a 'memory bookmark' you can return to during harder times",
      "Consider what contributed to this feeling so you can intentionally create space for it again"
    ]
  },
  {
    emotionLabel: "Restless Energy",
    understanding: "You're experiencing an activation of your nervous system that needs an outlet. This restless energy isn't necessarily negative - it's your body's way of signaling that you have untapped momentum that wants to be channeled. The key is directing this energy constructively rather than letting it spiral into anxiety.",
    actionableSteps: [
      "Move your body vigorously for 10-15 minutes: dancing, jumping jacks, a quick run - anything that matches the energy level",
      "Channel it into a productive burst: tackle that task you've been postponing, clean a space, organize something",
      "If it's late, try progressive muscle relaxation: tense and release each muscle group to discharge the energy",
      "Set a clear intention or goal for the next hour to give the energy a direction"
    ]
  }
];

export const generateMockAnalysis = (): EmotionAnalysis => {
  const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
  return randomEmotion;
};
