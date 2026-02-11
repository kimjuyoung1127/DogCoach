function normalize(input: string): string {
  return input.trim().toLowerCase();
}

export function matchSearch(source: string, query: string): boolean {
  const src = normalize(source);
  const q = normalize(query);

  if (!q) return true;
  return src.includes(q);
}

