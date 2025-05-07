export function isEmpty(
  val: null | undefined | object | string | any[],
): boolean {
  return (
    val == null ||
    (typeof val === "object" && Object.keys(val).length === 0) ||
    (Array.isArray(val) && val.length === 0) ||
    (typeof val === "string" && val.length === 0)
  );
}
