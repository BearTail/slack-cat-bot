export function hiraganaToKatakana(text: string): string {
  return text.replace(/[ぁ-ん]/g, function(s) {
    return String.fromCharCode(s.charCodeAt(0) + 0x60);
  });
}

export function getRandomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max));
}

export function randomSelect<T>(array: T[]): T {
  const index = getRandomInt(array.length);
  return array[index];
}
