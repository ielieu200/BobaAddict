from pymongo import MongoClient

class Database(object):
        URI = "mongodb://127.0.0.1:27017"
        DATABASE = None

        @staticmethod
        def initialize():
            client = MongoClient(Database.URI)
            Database.DATABASE = client['bobaDB']

        @staticmethod
        def insert(collection, data):
            result = Database.DATABASE[collection].insert_one(data)
            result_id = str(result.inserted_id)
            return result_id

        @staticmethod
        def find(collection, query):
            return Database.DATABASE[collection].find(query)
        
        @staticmethod
        def find_one(collection, query):
            return Database.DATABASE[collection].find_one(query)
        
        