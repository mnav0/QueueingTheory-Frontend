import scipy as sp
import numpy as np
import queue

from ED import ED
from CT import CTSim
# from Patient import Patient
# from Doctor import Doctor
# from Laboratory import Laboratory

from os import path
import json



## TODO - ASK JJ ABOUT THE LACK OF BERNOULLI IN NEW MODEL

# #Probz
# #Not used
# def BernoulliTrial(probability, chance):
#     chance = chance or random.uniform(0, 1)
#     if chance <= probability:
#         return True
#     return False

# # ED Constructor: num_docs, patient_rate, department_size, waiting_size
# myED = ED(4, 25, 15, 12, 0.27)
# myED = ED(10, 20, 5, 15, 0.4)
# myED = ED(13, 50, 23, 18, 0.15)

myCT = CTSim(1, 40, 50, 0.6)

myCT.run()







