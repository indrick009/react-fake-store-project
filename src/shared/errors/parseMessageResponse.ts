export function parseMessages(data: any) {
  if (typeof data === 'string') return data;
  if (!!data.message) return data.message;
  const entries = Object.entries(data);
  const messages = entries.map((e) => (e as string[])[1][0].toString());
  return messages.join(";");
}
