import json

FOOD_DB = {}

with open('food_data.json') as json_file:
    data = json.load(json_file)
    data = data['report']['foods']
    
    def normalize_n(n):
        # fix gm with "--" to 00
        n['gm'] = int(n['gm']) if n['gm'] != '--' else 0
        return n

    for f in data:
        #call normalize_n over each nutrient and change array to dict for quick access
        f['nutrients'] = dict(zip(map(lambda n: n['nutrient_id'], f['nutrients']), map(normalize_n, f['nutrients'])))
        FOOD_DB[f['ndbno']]=f

    # for k, v in FOOD_DB.items():
    #     print(v['name'])
    #     print(v['nutrients'])
