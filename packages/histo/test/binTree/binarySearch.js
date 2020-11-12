export const binarySearch = (arr, val) => {
  let lo = 0, hi = arr.length - 1
  while (lo <= hi) {
    const mid = Number.parseInt((hi - 1) >> 1)
    if (val === arr[mid]) {
      return mid
    } else if (val > arr[mid]) {
      lo = mid + 1
    } else if (val < arr[mid]) {
      hi = mid - 1
    }
  }
  return -1
}

const arr = [1, 3, 5, 7, 9, 10, 11, 12, 14, 15, 19, 20]

binarySearch(arr, 4) |> console.log
