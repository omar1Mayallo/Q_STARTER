/**
 * Convert a snake_case string to regular sentence case.
 * @param {string} input - The input string in snake_case format.
 * @returns {string} The formatted string in regular sentence case.
 */
export function formatToRegularString(input: string): string {
  const words = input.split("_");

  const formattedString = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return formattedString;
}
