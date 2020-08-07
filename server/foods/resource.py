from flask_restful import Resource, abort, reqparse
from . import FOOD_DB


class Food(Resource):
    def get(self, food_id):
        if food_id not in FOOD_DB:
            abort(404, message="Food {} doesn't exist".format(food_id))
        return FOOD_DB[food_id]


parser = reqparse.RequestParser()
parser.add_argument(
    'size', help='page size should be a number', location='args', type=int, default=10
)
parser.add_argument(
    'offset', help='offset should be a number', location='args', type=int, default=0
)

def pair(s):
    p = s.split(',')
    if len(p) > 2:
        raise "invalid number of values"
    if len(p) == 1:
        p.append(p[0])
    return tuple(map(int, p))

parser.add_argument(
    'prot', help='protein filter should be a number or 2 (comma separated) pair of numbers', location='args', type=pair, default=(0, -1)
)

parser.add_argument(
    'fat', help='fat filter should be a number or 2 (comma separated) pair of numbers', location='args', type=pair, default=(0, -1)
)

parser.add_argument(
    'carb', help='carbohydrate filter should be a number or 2 (comma separated) pair of numbers', location='args', type=pair, default=(0, -1)
)
parser.add_argument(
    'sugar', help='sugar filter should be a number or 2 (comma separated) pair of numbers', location='args', type=pair, default=(0, -1)
)

class Foods(Resource):
    def get(self):

        args = parser.parse_args()
        size = args['size']
        offset = args['offset']

        filters = {
            '203': args['prot'],
            '204': args['fat'],
            '205': args['carb'],
            '269': args['sugar']
        }
        #print(filters)
        def matches(food):
            for k, v in filters.items():
                gms = food['nutrients'][k]['gm']
                if gms < v[0] or (gms >v[1] and v[1] != -1):
                    return False
            return True

        return list(filter(matches, FOOD_DB.values()))[offset:offset+size]
