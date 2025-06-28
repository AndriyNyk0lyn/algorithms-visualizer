export const HIGHLIGHT_COLORS = {
  checking: "#facc15", // yellow-400
  swapping: "#ef4444", // red-500
  current: "#3b82f6", // blue-500
  min: "#22c55e", // green-500
  key: "#a855f7", // purple-500
  pivot: "#f97316", // orange-500
  pointer: "#ec4899", // pink-500
  sorted: "#10b981", // emerald-500
} as const;

export const DEFAULT_ARRAY_CONFIG = {
  MIN_VALUE: 10,
  MAX_VALUE: 510,
} as const;

export const ALGORITHM_NAMES = {
  BUBBLE_SORT: "bubbleSort",
  SELECTION_SORT: "selectionSort",
  INSERTION_SORT: "insertionSort",
  MERGE_SORT: "mergeSort",
  QUICK_SORT: "quickSort",
} as const;

export const ALGORITHM_DISPLAY_NAMES = {
  [ALGORITHM_NAMES.BUBBLE_SORT]: "Bubble Sort",
  [ALGORITHM_NAMES.SELECTION_SORT]: "Selection Sort",
  [ALGORITHM_NAMES.INSERTION_SORT]: "Insertion Sort",
  [ALGORITHM_NAMES.MERGE_SORT]: "Merge Sort",
  [ALGORITHM_NAMES.QUICK_SORT]: "Quick Sort",
} as const;

export const ALGORITHM_OPTIONS = Object.entries(ALGORITHM_DISPLAY_NAMES).map(
  ([value, label]) => ({
    label,
    value,
  })
);

export const ALGORITHM_CONFIG = {
  MIN_SPEED: 1,
  MAX_SPEED: 100,
  SPEED_STEP: 1,
  DEFAULT_SPEED: 50,
  DEFAULT_ARRAY_SIZE: 100,
  DEFAULT_ALGORITHM: ALGORITHM_NAMES.BUBBLE_SORT,
  MIN_ARRAY_SIZE: 5,
  MAX_ARRAY_SIZE: 1000,
  SPEED_MULTIPLIER: 101, // Used in delay calculation: 101 - speed
} as const;
