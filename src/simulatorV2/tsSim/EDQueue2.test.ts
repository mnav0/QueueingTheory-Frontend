import RunEDQueueSimple, { EDProps } from "./ED";
import { InputNode2 } from "src/state/useStateContext"
import data from "../pySim/data.json"

function runExample(testNum: number) {
  describe(`Simulator Tests ${testNum}`, () => {
    const results = data.results.reverse()
    const answers = results[testNum].ans;

    const args: EDProps = results[testNum].args;
    //console.log(args)
    const result = RunEDQueueSimple(args);

    const { time, times, waitRoomVolume, departmentVolume, erackVolume } = result
    // const chartData = {
    //   waitRoomVolume: waitRoomVolume,
    //   times: times,
    //   departmentVolume: departmentVolume,
    //   erackVolume: erackVolume
    // }

    test('same Results', () => {
      //expect(chartData).toContainAllKeys(Object.keys(answers))
      expect(results[8].args).toEqual(results[5].args);
      expect(results[8].ans).toEqual(results[5].ans);
      
    });
  


    test('data types', () => {
      //expect(chartData).toContainAllKeys(Object.keys(answers))
      expect(times).toBeArray();
      expect(waitRoomVolume).toBeArray();
      expect(departmentVolume).toBeArray();
      expect(erackVolume).toBeArray();
    });


    test('times', () => {
      expect(times).toEqual(answers.times);
    })

    test('wrVol', () => {
      expect(waitRoomVolume).toEqual(answers.waitRoomVolume);
    })

    test('deptVol', () => {
      expect(departmentVolume).toEqual(answers.departmentVolume);
    })

    test('erackVol', () => {
      expect(erackVolume).toEqual(answers.erackVolume);
    })

    test("all", () => {
      //expect(result).toEqual(answers)
    })
  })
}


function runAll() {
  let testAmount = data.results.length
  for (var i = 0; i < testAmount; i++) {
    runExample(i)
  }
}

runAll();




