export default function Utils() {
  function generateID() {
    return crypto.randomUUID();
  }

  return { generateID };
}
