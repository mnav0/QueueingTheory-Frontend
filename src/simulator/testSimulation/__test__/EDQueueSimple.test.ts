import  RunEDQueueSimple  from "../../runSimulation/EDQueueSimple.worker";
import { InputNode } from "src/state/useStateContext"
import data from "./data.json"

function runExample(testNum: number) {
  describe(`Simulator Tests ${testNum}`, () => {
    const results = data.results.reverse()
    const answers = results[testNum].ans[0];

    const args: InputNode = results[testNum].args[0];
    const result = RunEDQueueSimple(args);

    const { times, waits, totals, queueLengths, time } = result
    // const chartData = {
    //   time: time,
    //   queueLengths: queueLengths,
    //   times: times,
    //   waits: waits,
    //   totals: totals
    // }

    // test('data types', () => {
    //   expect(chartData).toContainAllKeys(Object.keys(answers))
    //   expect(times).toBeArray();
    //   expect(waits).toBeArray();
    //   expect(totals).toBeArray();
    //   expect(queueLengths).toBeArray();
    //   expect(time).toBeNumber();
    // });


    test('times', () => {
      expect(times).toEqual(answers.times);
    })

    test('waits', () => {
      expect(waits).toEqual(answers.waits);
    })

    test('totals', () => {
      expect(totals).toEqual(answers.totals);
    })

    test('queueLengths', () => {
      expect(queueLengths).toEqual(answers.queueLengths);
    })

    // test("all", () => {
    //   expect(result).toEqual(answers)
    // })
  })
}


function runAll() {
  let testAmount = data.results.length
  for (var i = 0; i < testAmount; i++) {
    runExample(i)
  }
}

runAll();




