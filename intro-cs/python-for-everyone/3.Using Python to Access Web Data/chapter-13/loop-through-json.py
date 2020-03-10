import json

data = {}
print("Countries higher than 10%")


with open('data.json') as json_file:
    data = json.load(json_file)
    for f in data['fact']:
        
        parse_val = float(f['Value'].split(" ")[0])
        if parse_val > 10.0:
            
            print(f['dims']['GBDREGION'])
            print(parse_val)
            print("\n")
    #for p in dadata['fact']ta:
        #print(p[0])