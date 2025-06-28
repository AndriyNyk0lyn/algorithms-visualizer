import type { SortStep } from "../algorithms/sorting";
import {
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
} from "../algorithms/sorting";

const algorithms = {
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
} as const;

self.onmessage = (
  e: MessageEvent<{
    command: "start" | "step";
    algorithm: keyof typeof algorithms;
    array: number[];
  }>
) => {
  if (e.data.command === "start") {
    const gen = algorithms[e.data.algorithm](e.data.array.slice());
    postNext(gen);
  }
};

function postNext(gen: Generator<SortStep, void, unknown>): void {
  const result = gen.next();
  if (result.done) {
    self.postMessage({ status: "done" });
  } else {
    self.postMessage({ status: "step", data: result.value });
    postNext(gen);
  }
}
