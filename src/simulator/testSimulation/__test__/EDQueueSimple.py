import datetime
import random
from collections import deque
# import matplotlib.pyplot as plt
import json
from json import JSONEncoder

####################
# v1 - only uniform implemented
#
####################


###################
# MAJOR VARIABLES
#
# providerNum  - number of doctors
# patientSpeed - arrival rate in patients/hour
# probability - probability model
# workupTime - time of workup in minutes
####################



def BernoulliTrial(probability, chance):
    # chance is between 0 and 1 non inclusive and mandated at 0.325
    # chance =  0.325
    chance = chance or random.uniform(0, 1)
    if chance <= probability:
        return True
    return False

def WriteJSON(sim):

    data = {}
    data['args'] = [{
        'provNumber': sim.providerNum,
        'patientSpeed': sim.patientSpeed,
        'workupTime': sim.workupTime,
        'probability': sim.probability,
        'chance': sim.chance
    }]

    data['ans'] = [{
        'time': sim.time,
        'times': sim.times,
        'waits': sim.waits,
        'totals': sim.totals,
        'queueLengths': sim.queueLengths,
    }]

    with open('data.json', 'r+') as outfile:
        jsonResult = json.load(outfile)
        temp = jsonResult['results']
        print("temp: " + str(len(temp)))
        temp.append(data)
        print("temp: " + str(len(temp)))
        outfile.seek(0)
        json.dump({"results": temp}, outfile, indent=2)
        outfile.truncate()
        

class ED:
    def __init__(self, probability, providerNum, patientSpeed, workupTime, chance):
        self.probability = probability
        self.providerNum = providerNum
        self.chance = chance
        if patientSpeed > 60:
            patientSpeed = 60
        self.patientSpeed = patientSpeed
        self.workupTime = workupTime
        self.time = 0  # simulation time
        self.patientTime = 0  # minutes per new patient (uniform)
        self.queue = deque([])
        self.docs = []
        self.patients = []
        self.queueLengths = []  # size of waiting room
        self.waitTimes = []  # average wait time to be seen
        self.totalTimes = []  # total end to end time
        ####### STATS ########
        self.times = []
        self.waits = []
        self.totals = []

    def update(self):
        self.time += 1
        ########## Uniform Version ################
        if self.probability == 'Uniform':  # time to generate a patient?
            if self.patientTime <= 0:
                newpatient = Patient(self)
                self.queue.append(newpatient)
                self.patients.append(newpatient)
                self.patientTime = (60 // self.patientSpeed)
            else:
                self.patientTime -= 1

        ###########################################
        ########## Bernoulli Version ##############
        else:
            # patientSpeed is pts/hour, change to patients/minute probability
            if BernoulliTrial(self.patientSpeed / 60, self.chance):
                self.queue.append(Patient(self))
        ###########################################

        for doc in self.docs:
            doc.update()

        self.queueLengths.append(len(self.queue))

        # stats colleciton
        self.times.append(self.time)
        if len(self.waitTimes) == 0:
            self.waits.append(0)
        else:
            self.waits.append(sum(self.waitTimes) / float(len(self.waitTimes)))
        if len(self.totalTimes) == 0:
            self.totals.append(0)
        else:
            self.totals.append(sum(self.totalTimes) / float(len(self.totalTimes)))

    def run(self, duration=300):
        self.time = 0
        for i in range(self.providerNum):
            self.docs.append(Doctor(self))
        while self.time < duration:
            self.update()
        
        WriteJSON(self)
        print("time " + str(self.time))
        print("times " + str(self.times))
        print("waits " + str(self.waits))
        print("totals " + str(self.totals))
        # self.makeGraphs()

    # def makeGraphs(self):
    #     plt.figure()
    #     titletext = "ED statistics for " + str(self.providerNum) + " doctors"
    #     plt.suptitle(titletext)
    #     plt.subplot(311)
    #     plt.plot(self.times, self.queueLengths)
    #     plt.axis(ymin=0)
    #     plt.locator_params(axis='y', tight=True, nbins=4)
    #     plt.ylabel("WR Volume")
    #     plt.subplot(312)
    #     plt.plot(self.times, self.waits)
    #     plt.ylabel("Mean Wait Time")
    #     plt.axis(ymin=0)
    #     plt.locator_params(axis='y', tight=True, nbins=4)
    #     plt.subplot(313)
    #     plt.plot(self.times, self.totals)
    #     plt.ylabel("Mean LOS")
    #     plt.xlabel("Time (minutes)")
    #     plt.axis(ymin=0)
    #     plt.locator_params(axis='y', tight=True, nbins=4)
    #     plt.tight_layout(rect=[0, 0.03, 1, 0.95], h_pad = 0.5) # magic
    #     plt.show()
    #     return



class Doctor:
    ID = 0  # initialize class variable

    def __init__(self, ED):
        Doctor.ID += 1
        self.ID = Doctor.ID
        self.ED = ED
        self.workupTime = self.ED.workupTime
        self.workupDuration = 0
        self.patient = None
        # print("Doctor", self.ID, "created")

    def update(self):
        if self.patient is None:
            if len(self.ED.queue) == 0:
                return
            else:
                self.patient = self.ED.queue.popleft()
                self.patient.update()

        ################### uniform version ##############
        else:
            self.workupDuration += 1
            if self.workupDuration >= self.workupTime:
                self.patient.update()
                self.patient = None
                self.workupDuration = 0

class Patient:
    ID = 0  # initialize class variable

    def __init__(self, ED):
        Patient.ID += 1
        self.ID = Patient.ID
        self.ED = ED
        self.startTime = self.ED.time
        self.seenTime = None
        self.endTime = None
        # print("Patient", self.ID, "created at time", self.startTime)

    def update(self):
        if self.seenTime is None:
            # picked up from rack
            self.seenTime = self.ED.time
            self.ED.waitTimes.append(self.seenTime - self.startTime)
        else:
            # finished workup
            self.endTime = self.ED.time
            self.ED.totalTimes.append(self.endTime - self.startTime)
            # print("Patient", self.ID, "total workup time:", self.endTime - self.startTime)


ED('Bernoulli', 6, 50, 35, 0.325).run()
