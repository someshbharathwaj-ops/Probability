import { AppShell } from "@/features/learning/components/app-shell";
import {
  formulaDeck,
  graphNodes,
  problems,
  simulations,
  topics,
} from "@/features/learning/content/catalog";

export function LearningDashboard() {
  return (
    <AppShell
      topics={topics}
      formulas={formulaDeck}
      problems={problems}
      graphNodes={graphNodes}
      simulations={simulations}
    />
  );
}
