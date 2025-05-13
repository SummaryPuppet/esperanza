import { Priority } from "../../types/priority";

export interface Goal {
  id: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  priority: Priority;
}

export const defaultGoals: Goal[] = [
  {
    id: "1",
    description: "Complete the project report",
    status: "pending",
    priority: "high",
  },
  {
    id: "2",
    description: "Prepare for the upcoming presentation",
    status: "in-progress",
    priority: "medium",
  },
  {
    id: "3",
    description: "Schedule a meeting with the team",
    status: "completed",
    priority: "low",
  },
];
