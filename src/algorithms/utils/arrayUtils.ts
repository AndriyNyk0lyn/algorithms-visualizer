export interface SortStep {
  array: number[];
  highlights: { [key: number]: string };
}

/**
 * Swaps two elements in an array
 * @param arr - The array to perform swap on
 * @param i - First index
 * @param j - Second index
 */
export function swap(arr: number[], i: number, j: number): void {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

/**
 * Creates a copy of an array with highlights for visualization
 * @param arr - The original array
 * @param highlights - Object mapping indices to highlight types
 * @returns SortStep object with array copy and highlights
 */
export function createSortStep(arr: number[], highlights: { [key: number]: string } = {}): SortStep {
  return {
    array: [...arr],
    highlights
  };
}

/**
 * Generates a random array of specified size
 * @param size - Size of the array
 * @param min - Minimum value (default: 10)
 * @param max - Maximum value (default: 510)
 * @returns Random array
 */
export function generateRandomArray(size: number, min: number = 10, max: number = 510): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min)) + min);
}

/**
 * Checks if an array is sorted in ascending order
 * @param arr - Array to check
 * @returns True if sorted, false otherwise
 */
export function isSorted(arr: number[]): boolean {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) {
      return false;
    }
  }
  return true;
} 