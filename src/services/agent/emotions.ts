export type Emotion =
  | "feliz"
  | "triste"
  | "molesta"
  | "medo"
  | "surpresa"
  | "desgosto"
  | "neutral";

export class EmotionService {
  private currentEmotion: Emotion = "neutral";

  getEmotion(): Emotion {
    return this.currentEmotion;
  }

  setEmotion(emotion: Emotion) {
    this.currentEmotion = emotion;
  }
  randomizeEmotion() {
    const emotions: Emotion[] = ["feliz", "neutral", "triste", "molesta"];
    this.currentEmotion = emotions[Math.floor(Math.random() * emotions.length)];
  }
}
