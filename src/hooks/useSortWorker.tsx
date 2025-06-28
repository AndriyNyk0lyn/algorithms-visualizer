import { ALGORITHM_CONFIG, type AlgorithmName, type SortStep } from "@/algorithms";
import { useEffect, useRef, useState, useCallback } from "react";

interface WorkerRequest {
  command: "start" | "step";
  algorithm: AlgorithmName;
  array: number[];
}

interface StepMessage {
  status: "step";
  data: SortStep;
}

interface DoneMessage {
  status: "done";
}

export function useSortWorker(
  onStep: (step: SortStep) => void,
  onDone?: () => void
) {
  const workerRef = useRef<Worker | null>(null);
  const speedRef = useRef<number>(50);
  const [isSorting, setIsSorting] = useState(false);
  const isSortingRef = useRef(false);
  useEffect(() => {
    try {
      workerRef.current = new Worker(
        new URL("../workers/sortWorker.ts?worker", import.meta.url),
        { type: "module" }
      );

      const handleMessage = (e: MessageEvent<StepMessage | DoneMessage>) => {
        if (e.data.status === "step") {
          onStep(e.data.data);
          setTimeout(() => {
            if (isSortingRef.current) {
              workerRef.current!.postMessage({
                command: "step",
              } as WorkerRequest);
            }
          }, ALGORITHM_CONFIG.SPEED_MULTIPLIER - speedRef.current);
        } else if (e.data.status === "done") {
          isSortingRef.current = false;
          setIsSorting(false);
          onDone?.();
        }
      };

      workerRef.current.addEventListener("message", handleMessage);
    } catch (error) {
      console.error("Failed to create worker:", error);
    }

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const start = useCallback(
    (algorithm: AlgorithmName, array: number[], speed: number) => {
      if (!workerRef.current) return;
      speedRef.current = speed;
      isSortingRef.current = true;
      setIsSorting(true);
      workerRef.current.postMessage({
        command: "start",
        algorithm,
        array,
      } as WorkerRequest);
    },
    []
  );
  const stop = useCallback(() => {
    isSortingRef.current = false;
    setIsSorting(false);
  }, []);

  return { start, stop, isSorting };
}
