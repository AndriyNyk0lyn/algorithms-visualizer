import type { SortStep } from "../algorithms/sorting";
import {
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
  heapSort,
  shellSort,
} from "../algorithms/sorting";

const algorithms = {
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
  heapSort,
  shellSort,
} as const;

let currentGenerator: Generator<SortStep, void, unknown> | null = null;

self.onmessage = (
  e: MessageEvent<{
    command: "start" | "step";
    algorithm: keyof typeof algorithms;
    array: number[];
  }>
) => {
  if (e.data.command === "start") {
    currentGenerator = algorithms[e.data.algorithm](e.data.array.slice());
    postNext();
  } else if (e.data.command === "step") {
    postNext();
  }
};

function postNext(): void {
  if (!currentGenerator) return;

  const result = currentGenerator.next();

  if (result.done) {
    self.postMessage({ status: "done" });
    currentGenerator = null;
  } else {
    self.postMessage({ status: "step", data: result.value });
  }
}
