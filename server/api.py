from flask import Flask
from flask_restful import  Api
from foods.resource import Food, Foods

app = Flask(__name__)
api = Api(app)
api.add_resource(Food, '/food', '/food/<string:food_id>') 
api.add_resource(Foods, '/foods', '/foods') 

if __name__ == "__main__":
  app.run(debug=True)