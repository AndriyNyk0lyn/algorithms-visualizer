import { createSortStep, swap } from "../utils/arrayUtils";

/**
 * Bubble Sort Algorithm
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 *
 * @param arr - Array to sort
 * @yields SortStep - Each step of the sorting process for visualization
 */
export function* bubbleSort(
  arr: number[]
): Generator<ReturnType<typeof createSortStep>, void, unknown> {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      yield createSortStep(arr, {
        [j]: "checking",
        [j + 1]: "checking",
      });

      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);

        yield createSortStep(arr, {
          [j]: "swapping",
          [j + 1]: "swapping",
        });
      }
    }
  }
}
