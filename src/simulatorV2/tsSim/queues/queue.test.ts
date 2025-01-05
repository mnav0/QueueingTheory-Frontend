import { PriorityQueue, numberCompare } from "./PriorityQueue";
import data from "../../pySim/queue_data.json"
import { Patient } from "../Patient";
import { ED } from "../ED";


function performCommands(commands: (string | number)[][]) {
  var q = new PriorityQueue(0, numberCompare)
  for (var i = 0; i < commands.length; i++) {
    switch (commands[i][0]) {
      case "put":
        q.put(commands[i][1])
        break
      case "get":
        q.get()
        break
      case "qsize":
        q.qsize()
        break
      case "full":
        q.full()
        break
      case "empty":
        q.empty()
        break
      default:
        break
    }
  }
  return q.data
}

function runExample(testNum: number) {
  describe(`Simulator Tests ${testNum}`, () => {
    const results = data.results.reverse()
    const commands = results[testNum].commands;
    const result = results[testNum].results
    const simRes = performCommands(commands)

    test('all', () => {
      expect(simRes).toEqual(result);
    })

    test('patient-test', () => {
      var q = new PriorityQueue(0)
      const ed = new ED(5, 0.25, 15, 20)
      const a = new Patient(ed, 1)
      const b = new Patient(ed, 3)
      const c = new Patient(ed, 5)
      const d = new Patient(ed, 2)
      const e = new Patient(ed, 4)
      q.put(c)
      q.put(b)
      q.put(a)
      q.put(e)
      q.put(d)

      const patientResult = [a, d, b , e, c]
      expect(q.data).toEqual(patientResult);
    })

    

  })
}


function runAll() {
  const testAmount = data.results.length
  for (var i = 0; i < testAmount; i++) {
    runExample(i)
  }
}
//runExample(0);
runAll();




