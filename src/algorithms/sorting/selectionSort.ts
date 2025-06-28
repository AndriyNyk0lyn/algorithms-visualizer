import { createSortStep, swap } from "../utils/arrayUtils";

/**
 * Selection Sort Algorithm
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 *
 * @param arr - Array to sort
 * @yields SortStep - Each step of the sorting process for visualization
 */
export function* selectionSort(
  arr: number[]
): Generator<ReturnType<typeof createSortStep>, void, unknown> {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < n; j++) {
      yield createSortStep(arr, {
        [i]: "current",
        [j]: "checking",
        [minIndex]: "min",
      });

      if (arr[j] < arr[minIndex]) {
        minIndex = j;

        yield createSortStep(arr, {
          [i]: "current",
          [j]: "checking",
          [minIndex]: "min",
        });
      }
    }

    swap(arr, i, minIndex);

    yield createSortStep(arr, {
      [i]: "swapping",
      [minIndex]: "swapping",
    });
  }
}
