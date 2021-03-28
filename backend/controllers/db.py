import os
import json
import requests
import pymongo
import sys
from bson.objectid import ObjectId
from dotenv import load_dotenv
from pathlib import Path
from operator import itemgetter

import numpy as np  # linear algebra
import pandas as pd  # for processing data CSV file (e.g. pd.read_csv)


# Libraries for Recommendation System
from scipy.sparse import csr_matrix
from sklearn.neighbors import NearestNeighbors

env_path = Path('.') / '.env'
load_dotenv(dotenv_path=env_path)

mongoDBConnection = os.getenv('MONGO_URI')
#client = pymongo.MongoClient(mongoDBConnection)

client = pymongo.MongoClient(mongoDBConnection)
db = client['ecommerceDB']

def KNN(ratings, data_products):
    #print(data_products)
    #print(ratings)
    data_rating = ratings
    data_products = data_products

    product = data_products.loc[:, {"_id", "name"}]
    rating = data_rating.loc[:, {"_id", "rating", "user"}]
    
    data = pd.merge(product, rating)
    data = data.iloc[:8,:]
    #print(data)
    userProductTable = data.pivot_table(index=["name"], columns="user", values='rating').fillna(0)
    userProductTable.head(8)

    queryIndex = np.random.choice(userProductTable.shape[0])
    #print("chosen product is: ", userProductTable.index[queryIndex])

    userProductTableMatrix = csr_matrix(userProductTable.values)
    model_knn = NearestNeighbors(metric='cosine', algorithm='brute')
    model_knn.fit(userProductTableMatrix)
    distances, indices = model_knn.kneighbors(userProductTable.iloc[queryIndex,:].values.reshape(1,-1),n_neighbors=6)

    name = []
    distance = []
    
    for i in range(0, len(distances.flatten())):
        if i != 0:
            name.append(userProductTable.index[indices.flatten()[i]])
            distance.append(distances.flatten()[i])

    m=pd.Series(name,name='name')
    d=pd.Series(distance,name='distance')
    recommend = pd.concat([m, d], axis=1)
    #print(recommend)
    recommend = recommend.sort_values('distance',ascending=False)
   # print(m)
    #print(d)

    #print('Recommendations for {0}:\n'.format(userProductTable.index[queryIndex]))

    #for i in range(0, recommend.shape[0]):
        #print('{0}:{1}, with distance of {2}'.format(i, recommend['product'].iloc[i], recommend['distance'].iloc[i]))
    result = recommend.to_json(orient="records")
    parsed = json.loads(result)
    return json.dumps(parsed, indent=4)



def findProducts():

    collection = db['products']

    return collection.find({}, {"_id": True, "name": True})

def findRatings():

    ratings = []
    collection = db['products']

    return collection.find({}, { '_id': True, 'reviews':{'rating':True, 'user': True }})

def getData():
    products = findProducts()
    ratings = findRatings()

    # load data sets
    data_products = pd.DataFrame(list(products))
    data_ratings = pd.DataFrame(list(ratings))


    restructuredData = []
    for item in data_ratings['reviews']:

        for i in item:
            restructuredData.append({'rating': i['rating'], 'user': i['user']})

    data_restructured =  pd.DataFrame(list(restructuredData))
    

    del data_ratings['reviews']

    ## allocating data sets titles and columns in the dataframe therefore readible for the algo
    dataframes = [data_ratings, data_restructured]
    ratings = data_ratings.join(data_restructured).fillna(0)
    return(ratings, data_products)



def main():
    # get the data we want
    ratings, data_products = getData()

    
#product_in = sys.stdin.readlines()
#   print(product_in)

    # comuter sum
    results = KNN(ratings, data_products)

    # return sum

    print(results)
    #'sys.stdout.write(results)
    #sys.stdout.flush()
    


if __name__ == '__main__':
    main()