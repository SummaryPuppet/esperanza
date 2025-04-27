export type Emotion =
  | "feliz"
  | "triste"
  | "molesta"
  | "medo"
  | "surpresa"
  | "desgosto"
  | "neutral";

export class EmotionService {
  private static instance: EmotionService | null = null;
  private currentEmotion: Emotion = "neutral";

  public static getInstance(): EmotionService {
    if (this.instance === null) {
      this.instance = new EmotionService();
    }
    return this.instance;
  }

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
