export const getDexNumber = (path) => {
  // Match a number at the end of a slash, before a hyphen
  const match = path?.match(/\/(\d+)-/)
  return match ? parseInt(match[1], 10) : null
}