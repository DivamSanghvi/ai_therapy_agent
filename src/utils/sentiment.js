export function analyzeSentiment(message) {
  const positiveWords = ["happy","good","better","great","wonderful","excited","positive","grateful"];
  const negativeWords = ["sad","bad","terrible","awful","depressed","anxious","worried","stressed"];
  const lower = message.toLowerCase();
  const pos = positiveWords.filter(w => lower.includes(w)).length;
  const neg = negativeWords.filter(w => lower.includes(w)).length;
  if (pos > neg) return "positive";
  if (neg > pos) return "negative";
  return "neutral";
}
