import { createSortStep } from "../utils/arrayUtils";

/**
 * Merge Sort Algorithm
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 *
 * @param arr - Array to sort
 * @param start - Start index of the subarray
 * @param end - End index of the subarray
 * @yields SortStep - Each step of the sorting process for visualization
 */
export function* mergeSort(
  arr: number[],
  start: number = 0,
  end: number = arr.length - 1
): Generator<ReturnType<typeof createSortStep>, void, unknown> {
  if (end - start <= 0) return;

  const mid = Math.floor((start + end) / 2);

  yield* mergeSort(arr, start, mid);
  yield* mergeSort(arr, mid + 1, end);

  yield* merge(arr, start, mid, end);
}

/**
 * Merges two sorted subarrays into a single sorted array
 *
 * @param arr - The main array
 * @param start - Start index of the first subarray
 * @param mid - End index of the first subarray (start of second subarray - 1)
 * @param end - End index of the second subarray
 * @yields SortStep - Each step of the merging process for visualization
 */
function* merge(
  arr: number[],
  start: number,
  mid: number,
  end: number
): Generator<ReturnType<typeof createSortStep>, void, unknown> {
  const leftSize = mid - start + 1;
  const rightSize = end - mid;

  const left = new Array(leftSize);
  const right = new Array(rightSize);

  for (let i = 0; i < leftSize; i++) {
    left[i] = arr[start + i];
  }
  for (let i = 0; i < rightSize; i++) {
    right[i] = arr[mid + 1 + i];
  }

  let i = 0,
    j = 0,
    k = start;

  while (i < leftSize && j < rightSize) {
    yield createSortStep(arr, {
      [start + i]: "checking",
      [mid + 1 + j]: "checking",
    });

    if (left[i] <= right[j]) {
      arr[k] = left[i];
      i++;
    } else {
      arr[k] = right[j];
      j++;
    }

    yield createSortStep(arr, { [k]: "swapping" });
    k++;
  }

  while (i < leftSize) {
    arr[k] = left[i];
    yield createSortStep(arr, { [k]: "swapping" });
    i++;
    k++;
  }

  while (j < rightSize) {
    arr[k] = right[j];
    yield createSortStep(arr, { [k]: "swapping" });
    j++;
    k++;
  }
}
