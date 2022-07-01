export default function compactMap<T, U>(
  iterable: Iterable<T>,
  callback: (element: T) => U | null | undefined,
): U[] {
  let result: U[] = [];
  for (const element of iterable) {
    const mappedElement = callback(element);
    if (mappedElement) {
      result.push(mappedElement);
    }
  }

  return result;
}
