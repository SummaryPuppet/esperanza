import { Goal, defaultGoals } from "./goals";

export class Planner {
  private goals: Goal[] = [...defaultGoals];

  getTopGoal(): Goal {
    return this.goals.sort((a, b) => {
      const priorityOrder = {
        "very-high": 1,
        high: 2,
        medium: 3,
        low: 4,
        "very-low": 5,
      };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    })[0];
  }

  addGoal(goal: Goal) {
    this.goals.push(goal);
  }
}
