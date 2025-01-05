import RunCTQueue, { CTSimProps } from "./CTSim";
import data from '../pySim/dataCT.json'
import { InputNodeCT } from "src/state/useStateContext";

function runCTExample(testNum: number) {
  describe(`CT Simulator Tests ${testNum}`, () => {
    const results = data.results.reverse()
    const answers = results[testNum].ans;

    const args: InputNodeCT = results[testNum].args;
    const result = RunCTQueue(args);

    const { time, times, waitRoomVolume, departmentVolume } = result

    test('data types', () => {
      expect(times).toBeArray();
      expect(waitRoomVolume).toBeArray();
      expect(departmentVolume).toBeArray();
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
  })
}


function runAll() {
  let testAmount = data.results.length
  for (var i = 0; i < testAmount; i++) {
    runCTExample(i)
  }
}

runAll();




