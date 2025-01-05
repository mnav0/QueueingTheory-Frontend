import { Patient } from "../Patient"
import { of } from "ramda"

// empty, get, qsize, ,put
export class PriorityQueue {
  data: Array<any>
  length: number
  max: number
  compare: (a: any, b: any) => number

  constructor(max: number = -1, compare: (a: any, b: any) => number = defaultCompare) {
    this.data = []
    this.length = this.data.length
    this.compare = compare
    this.max = max
  }

  full() {
    return ((this.max > 0) && (this.length === this.max))
  }

  empty() {
    return this.length === 0
  }

  put(item: any) {
    if (this.full()) {
      return
    }

    if (this.empty()) {
      this.data.push(item)
    } else {
      var i = 0
      while (this.compare(this.data[i], item) < 0) {
        i++
        if (i === this.length) {
          break
        }
      }
      this.data.splice(i, 0, item)
  }
    this.length++
}

  qsize() {
    return this.length
  }

  get() {
    if (this.length === 0) {
      return undefined;
    }
    this.length--
    return this.data.pop()

  }

  peek() {
    return this.data[0];
  }

}

export function numberCompare(a: number, b: number) {
  return a < b ? -1 : a > b ? 1 : 0;
}

function defaultCompare(a: Patient, b: Patient) {
  return a.ESI < b.ESI ? -1 : a.ESI > b.ESI ? 1 : 0;
}
