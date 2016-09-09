#author Rolando Leija
from flask import Flask, request
import json
from bson import json_util
from bson.objectid import ObjectId
from pymongo import MongoClient

# Flask
app = Flask(__name__)

# MongoDB connection
#MONGO_HOST = 'http://ec2-54-245-43-185.us-west-2.compute.amazonaws.com/'
#var comments = db.Matches.find({User_id: "jopuca"},{"JobOffer_id": true})
#var OfersIds = comments.map(function(c) { return c.JobOffer_id; });
#db.JobOffers.find({"_id": {$nin: OfersIds}});



connection = MongoClient('ec2-54-245-43-185.us-west-2.compute.amazonaws.com', 27017)
db = connection.CANDI
def toJson(data):
	"""Convert Mongo object(s) to JSON"""
	return json.dumps(data, default=json_util.default)

@app.route('/JobOffers', methods=['GET'])
def JobOffers():

  if request.method == 'GET':
    #lim = int(request.args.get('limit', 10))
    #off = int(request.args.get('offset', 0))
    #comments = db['Matches'].find({"User_id": "jopuca"},{"JobOffer_id": "true"})
    results = db['JobOffers'].find()
    json_results = []
    #match = []
    #joboffer = []
    #merged = {}
    # get a list of ids and author_ids for every message
    #for iden in db['Matches'].find({"User_id": "jopuca"},{"JobOffer_id": "true"}):
        #match.append(iden['_id'])
    # iterate through every author_ids to find the corresponding username
    #for _id, job in joboffer:
     #   db['JobOffers'].find({""},{"_id":true})

    #    author = coll_user.find_one({"_id": item}, {"username": 1})
    #    merged = dict(chain((match.items() + joboffer.items())))

    for result in results:
        json_results.append(result)
    return toJson(result)

#@app.route('/sightings/<sighting_id>', methods=['GET'])
#def sighting(sighting_id):
#  """Return specific UFO sighting
#  ex) GET /sightings/123456
# """
#  if request.method == 'GET':
#    result = db['ufo'].find_one({'_id': ObjectId(sighting_id)})
#    return toJson(result)

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  return response

if __name__ == '__main__':
  app.run(debug=True)
