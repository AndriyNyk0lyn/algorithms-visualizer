import { generateRandomArray, HIGHLIGHT_COLORS } from "@/algorithms";

export function drawCanvas(
  ctx: CanvasRenderingContext2D,
  arr: number[],
  highlights: Record<number, keyof typeof HIGHLIGHT_COLORS> = {}
) {
  const w = ctx.canvas.width / arr.length;
  const hMax = Math.max(...arr);
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  arr.forEach((v, i) => {
    ctx.fillStyle = highlights[i] ? HIGHLIGHT_COLORS[highlights[i]] : "#a78bfa";
    const h = (v / hMax) * ctx.canvas.height * 0.95;
    ctx.fillRect(i * w, ctx.canvas.height - h, w, h);
  });
}

export function dropArray(canvas: HTMLCanvasElement, size: number): number[] {
  const { width } = canvas.getBoundingClientRect();
  canvas.width = width;
  canvas.height = width * 0.4;
  const ctx = canvas.getContext("2d")!;
  const arr = generateRandomArray(size);
  drawCanvas(ctx, arr);
  return arr;
}
