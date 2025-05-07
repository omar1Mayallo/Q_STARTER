export default function generateArrOfNum(number: number): number[] {
  return [...Array(number).keys()].map((_, index) => index + 1);
}
