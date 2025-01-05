import json
from json import JSONEncoder
from os import path

import numpy as np
import queue
import csv

### Toy simulation looking at CT utilization ratios

class CTSim():
    def __init__(self, num_CTs, patient_rate, CT_rate, chance, mode="rich"):
        self.time = 0
        self.num_CTs = num_CTs
        self.CT_rate = CT_rate
        self.mode = mode
        self.chance = chance

        self.CTList = []
        self.PTList = []

        self.total_waiting_CT = 0
        self.total_pts_finished = 0

        self.patient_rate = patient_rate ## patient rate in terms of new patients per hour
        for i in range(num_CTs):
            self.CTList.append(CT(self, CT_rate))

        self.times = []
        self.waitRoomVolume = []
        self.departmentVolume = []

    def get_time(self):
        """getter for children"""
        return self.time

    def get_next_patient(self):
        if len(self.PTList) > 0:
            newpt = self.PTList.pop()
            return newpt
        else:
            return None

    def generate_patient_prob(self):
        """generate a patient based on a bernoulli process, place it if there's room...
        current behavior - patients LWBS when there is no room in the WR"""
        probability = self.chance or np.random.uniform(0,1)
        if probability <= (self.patient_rate / float(60)):
            self.PTList.append(Patient(self))

    def finish_patient(self, patient):
        self.total_pts_finished += 1

    def get_avg_wait(self):
        if self.total_pts_finished > 0:
            return round(self.total_waiting_CT / self.total_pts_finished, 1)
        else:
            return 0

    def get_utilization_ratio(self):
        return round(self.patient_rate / (self.num_CTs * self.CT_rate), 2)

        
    def update(self):
        """main function for the MVC model. calls an update for every agent within the ED
        starts by checking whether to generate a patient, then runs an update for each agent
        """
        self.collectMetrics()

        self.generate_patient_prob()

        for pt in self.PTList:
            pt.update()
            self.total_waiting_CT += 1

        for ct in self.CTList:
            ct.update()
 
        self.time += 1

    ## BELOW ADDED BY TJS
    def collectMetrics(self):
        self.times.append(self.time)
        self.waitRoomVolume.append(self.total_waiting_CT)
        self.departmentVolume.append(len(self.CTList) + len(self.PTList))


    def run(self, duration=200):
        for i in range(duration):
            self.update()
        self.WriteJSON()

    def WriteJSON(self):
        dataCT = {}
        dataCT['args'] = {
            'numCTs': self.num_CTs,
            'patientRate': self.patient_rate,
            'CTRate': self.CT_rate,
            'chance': self.chance
        }

        dataCT['ans'] = {
            'time': self.time,
            'times': self.times,
            'waitRoomVolume': self.waitRoomVolume,
            'departmentVolume': self.departmentVolume,
        }

        with open(path.join(path.dirname(__file__), 'dataCT.json'), 'r+') as outfile:
            jsonResult = json.load(outfile)
            temp = jsonResult['results']
            temp.append(dataCT)
            outfile.seek(0)
            json.dump({"results": temp}, outfile, indent=2)
            outfile.truncate()




class Patient():
    def __init__(self, ED):
        self.ED = ED
        self.start_time = self.ED.get_time()
        self.waiting_time = 0

    def get_waiting(self):
        return self.waiting_time

    def update(self):
        self.waiting_time += 1

class CT():
    def __init__(self, ED, CT_rate):
        self.ED = ED
        self.CT_rate = CT_rate
        self.current_patient = None

    def update(self):
        if self.current_patient == None:
            self.current_patient = self.ED.get_next_patient()
        else:
            probability = self.ED.chance or np.random.uniform(0,1)
            if probability <= (self.CT_rate / float(60)):
                self.ED.finish_patient(self.current_patient)
                self.current_patient = None