export const formatCash = (str) => {
  return str.split('').reverse().reduce((prev, next, index) => {
    return ((index % 3) ? next : (next + ',')) + prev
  })
}
const format = {
  formatCash
}
export default format 