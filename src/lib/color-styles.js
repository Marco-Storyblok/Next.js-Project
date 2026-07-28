const hexColorPattern = /^#(?:[\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i;

export function getColorStyles(colors) {
  return Object.fromEntries(
    Object.entries(colors).filter(
      ([, value]) => typeof value === "string" && hexColorPattern.test(value),
    ),
  );
}
