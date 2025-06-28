import { createSortStep } from "../utils/arrayUtils";

/**
 * Insertion Sort Algorithm
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 *
 * @param arr - Array to sort
 * @yields SortStep - Each step of the sorting process for visualization
 */
export function* insertionSort(
  arr: number[]
): Generator<ReturnType<typeof createSortStep>, void, unknown> {
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    yield createSortStep(arr, { [i]: "key" });

    while (j >= 0 && arr[j] > key) {
      yield createSortStep(arr, {
        [j]: "checking",
        [j + 1]: "checking",
      });

      arr[j + 1] = arr[j];
      j = j - 1;

      yield createSortStep(arr, { [j + 1]: "swapping" });
    }

    arr[j + 1] = key;

    yield createSortStep(arr, { [j + 1]: "swapping" });
  }
}
