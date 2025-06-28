import { createSortStep } from "../utils/arrayUtils";

/**
 * Shell Sort Algorithm
 * Time Complexity: O(n^1.5) to O(n^2) depending on gap sequence
 * Space Complexity: O(1)
 *
 * @param arr - Array to sort
 * @yields SortStep - Each step of the sorting process for visualization
 */
export function* shellSort(
  arr: number[]
): Generator<ReturnType<typeof createSortStep>, void, unknown> {
  const n = arr.length;

  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j;

      for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
        yield createSortStep(arr, {
          [j]: "checking",
          [j - gap]: "checking",
        });

        arr[j] = arr[j - gap];

        yield createSortStep(arr, {
          [j]: "swapping",
          [j - gap]: "swapping",
        });
      }

      arr[j] = temp;

      if (j !== i) {
        yield createSortStep(arr, {
          [j]: "current",
        });
      }
    }
  }

  for (let i = 0; i < n; i++) {
    yield createSortStep(arr, {
      [i]: "sorted",
    });
  }
}
