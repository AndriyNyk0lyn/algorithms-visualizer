export function memoize<A extends unknown[], R>(fn: (...a: A) => R) {
  const cache = new Map<string, R>();
  return (...a: A): R => {
    const k = JSON.stringify(a);
    if (cache.has(k)) return cache.get(k)!;
    const v = fn(...a);
    cache.set(k, v);
    return v;
  };
}

export function once<A extends unknown[], R>(fn: (...a: A) => R) {
  let ran = false;
  let val: R;
  return (...a: A) => {
    if (!ran) {
      ran = true;
      val = fn(...a);
    }
    return val!;
  };
}

export function debounce<A extends unknown[]>(
  fn: (...a: A) => void,
  ms: number
) {
  let t: NodeJS.Timeout | null = null;
  return (...a: A) => {
    if (t) clearTimeout(t);
    t = setTimeout(() => fn(...a), ms);
  };
}

function curry<A, B, C, R>(fn: (a: A, b: B, c: C) => R) {
  return (a: A) => (b: B) => (c: C) => fn(a, b, c);
}

const join = (a: string, b: string, c: string) => `${a}-${b}-${c}`;
const curriedJoin = curry(join);
console.log(curriedJoin("a")("b")("c"));