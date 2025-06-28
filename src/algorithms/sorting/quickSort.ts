import { createSortStep, swap } from "../utils/arrayUtils";

/**
 * Quick Sort Algorithm
 * Time Complexity: O(n log n) average, O(n²) worst case
 * Space Complexity: O(log n) average, O(n) worst case
 *
 * @param arr - Array to sort
 * @param low - Start index of the subarray
 * @param high - End index of the subarray
 * @yields SortStep - Each step of the sorting process for visualization
 */
export function* quickSort(
  arr: number[],
  low: number = 0,
  high: number = arr.length - 1
): Generator<ReturnType<typeof createSortStep>, void, unknown> {
  if (low < high) {
    const partitionGenerator = partition(arr, low, high);
    let result = partitionGenerator.next();

    while (!result.done) {
      yield result.value;
      result = partitionGenerator.next();
    }

    const pi = result.value as number;

    yield* quickSort(arr, low, pi - 1);
    yield* quickSort(arr, pi + 1, high);
  }
}

/**
 * Partitions the array around a pivot element
 *
 * @param arr - The array to partition
 * @param low - Start index
 * @param high - End index (pivot position)
 * @yields SortStep - Each step of the partitioning process for visualization
 * @returns The final position of the pivot
 */
function* partition(
  arr: number[],
  low: number,
  high: number
): Generator<ReturnType<typeof createSortStep>, number, unknown> {
  const pivot = arr[high];
  let i = low - 1;

  yield createSortStep(arr, { [high]: "pivot" });

  for (let j = low; j < high; j++) {
    yield createSortStep(arr, {
      [j]: "checking",
      [i]: "pointer",
      [high]: "pivot",
    });

    if (arr[j] < pivot) {
      i++;
      swap(arr, i, j);

      yield createSortStep(arr, {
        [i]: "swapping",
        [j]: "swapping",
        [high]: "pivot",
      });
    }
  }

  swap(arr, i + 1, high);

  yield createSortStep(arr, {
    [i + 1]: "swapping",
    [high]: "swapping",
  });

  return i + 1;
}
