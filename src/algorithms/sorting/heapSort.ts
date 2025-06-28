import { createSortStep, swap } from "../utils/arrayUtils";

/**
 * Heap Sort Algorithm
 * Time Complexity: O(n log n)
 * Space Complexity: O(1)
 *
 * @param arr - Array to sort
 * @yields SortStep - Each step of the sorting process for visualization
 */
export function* heapSort(
  arr: number[]
): Generator<ReturnType<typeof createSortStep>, void, unknown> {
  const n = arr.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    yield* heapify(arr, n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    yield createSortStep(arr, {
      0: "swapping",
      [i]: "swapping",
    });
    swap(arr, 0, i);

    yield createSortStep(arr, {
      [i]: "sorted",
    });

    yield* heapify(arr, i, 0);
  }

  yield createSortStep(arr, {
    0: "sorted",
  });
}

/**
 * Heapify a subtree rooted with node at index i
 * @param arr - Array to heapify
 * @param n - Size of heap
 * @param i - Index of subtree root
 */
function* heapify(
  arr: number[],
  n: number,
  i: number
): Generator<ReturnType<typeof createSortStep>, void, unknown> {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n) {
    yield createSortStep(arr, {
      [i]: "checking",
      [left]: "checking",
    });

    if (arr[left] > arr[largest]) {
      largest = left;
    }
  }

  if (right < n) {
    yield createSortStep(arr, {
      [i]: "checking",
      [right]: "checking",
    });

    if (arr[right] > arr[largest]) {
      largest = right;
    }
  }

  if (largest !== i) {
    yield createSortStep(arr, {
      [i]: "swapping",
      [largest]: "swapping",
    });
    swap(arr, i, largest);

    yield* heapify(arr, n, largest);
  }
}
