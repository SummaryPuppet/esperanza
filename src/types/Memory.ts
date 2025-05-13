import { Priority } from "@/types/priority";

/**
 * Interface that defines the structure of a memory.
 * @interface Memory
 */
export interface Memory {
  /** Unique identifier for the memory */
  id: string;
  /** Textual content of the memory */
  content: string;
  /** Creation timestamp in milliseconds */
  timestamp: number;
  /** Memory type based on its origin */
  type: "user" | "agent" | "system";
  /** Priority level of the memory */
  priority: Priority;
  /** Tags for classification and search */
  tags: string[];
}
