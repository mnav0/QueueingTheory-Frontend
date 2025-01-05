import queue
from os import path
import json
from Patient import Patient
from ED import ED


# test needs empty, length, put, get, full

# use an dictionary of these words


class ObjWithID:
    ID = 0
    def __init__(self):
        self.ID = ObjWithID.ID
        ObjWithID.ID += 1

    def encode(self):
        return self.ID
        pass

    def isEqualTo(self, other):
        return other.ID != None

    def __lt__(self, other):
        # p1 < p2 calls p1.__lt__(p2)
        return self.ID < other.ID
    
    def __eq__(self, other):
        # p1 == p2 calls p1.__eq__(p2)
        return self.ID == other.ID

    def __gt__(self, other):
        # p1 < p2 calls p1.__lt__(p2)
        return self.ID > other.ID

    

obj1 = ObjWithID()
obj2 = ObjWithID()
obj3 = ObjWithID()
obj4 = ObjWithID()

class QTest():
    commands = [
        ("put", 0),
        ("put", -1),
        ("put", 2),
        ("put", 10),
        ("put", -40),
        ("put", -3)

        ]

    ed = ED(5, 25, 15, 20)
    commands = [
        ("put", Patient(ed, 4)),
        ("put", Patient(ed, 1)),
        ("put", Patient(ed, 3)),
        ("put", Patient(ed, 2)),
        
        ]


    def performCommands(self):
        q = queue.PriorityQueue()
        res = []
        for com in self.commands:
            if com[0] == "put":
                q.put(com[1])
            if com[0] == "get":
                q.get()
            if com[0] == "qsize":
                q.qsize()
            if com[0] == "empty":
                q.empty()
            if com[0] == "full":
                q.full()
        for i in range(q.qsize()):
            res.append(q.get())
        return res



    def WriteJSON(self):
            data = {}
            data['commands'] = self.commands
            result = self.performCommands()
            data['results'] = result

            with open(path.join(path.dirname(__file__), 'queue_data.json'), 'r+') as outfile:
                jsonResult = json.load(outfile)
                temp = jsonResult['results']
                print("temp: " + str(len(temp)))
                temp.append(data)
                print("temp: " + str(len(temp)))
                outfile.seek(0)
                json.dump({"results": temp}, outfile, indent=2)
                outfile.truncate()

test = QTest()
#test.performCommands()
#test.WriteJSON()

