#author Rolando Leija
from flask import Flask, request
import json
from flask import jsonify
from bson import json_util
from bson.objectid import ObjectId
from pymongo import MongoClient
import random

# Flask
app = Flask(__name__)
connection = MongoClient('ec2-54-245-43-185.us-west-2.compute.amazonaws.com', 27017)
db = connection.CANDI
def toJson(data):
	"""Convert Mongo object(s) to JSON"""
	return json.dumps(data, default=json_util.default)

def genUserID(data):
    data = data.lower().replace(" ", "")
    data = data[0:7]
    return data + str(random.randrange(100, 1001, 2))

@app.route('/JobOffers', methods=['GET'])
def JobOffers():
  if request.method == 'GET':
    results = db['JobOffers'].find()
    json_results = []
    for result in results:
        json_results.append(result)
    return toJson(result)

@app.route('/registro/', methods=['POST'])
def insert():
    user = db['Users']
    idfirst = request.json['id']
    password = request.json['password']
    name = request.json['name']
    mail = request.json['mail']
    profesion = request.json['profesion']
    #skills = request.json['skills']
    #phone = request.json['phone']
    iduser = genUserID(name)

    user.insert({'_id': iduser, 'Password': password, 'CreationDate' : 'Wed Fri 09 2016 13:36:48 GMT-0500', 'Active' : 'true', 'EmailAddress' : mail, 'Name': name, 'JobSeeker' : {'Profession': profesion }})
    #,'JobSeeker' : {'Profession': profesion, 'Skills': [skills], 'Phone' : phone } })
    results = user.find_one({"User_id": '"' + str(iduser) + '"' })

    json_results = []
    for result in results:
        json_results.append(result)
    return toJson(result)

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  response.headers.add('Candier', 'by OCCMundial')
  return response

if __name__ == '__main__':
  app.run(debug=True)
