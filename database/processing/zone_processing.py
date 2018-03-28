import csv
import json
import pprint

zone_csv = "../dataset/zone.csv"
zone_json = "../dataset/zone.json"

zones = {
    '1A': '-60 to -55',
    '1B': '-55 to -50',
    '2A': '-50 to -45',
    '2B': '-45 to -40',
    '3A': '-40 to -35',
    '3B': '-35 to -30',
    '4A': '-30 to -25',
    '4B': '-25 to -20',
    '5A': '-20 to -15',
    '5B': '-15 to -10',
    '6A': '-10 to -5',
    '6B': '-5 to 0',
    '7A': '0 to 5',
    '7B': '5 to 10',
    '8A': '10 to 15',
    '8B': '15 to 20',
    '9A': '20 to 25',
    '9B': '25 to 30',
    '10A': '30 to 35',
    '10B': '35 to 40',
    '11A': '40 to 45',
    '11B': '45 to 50',
}

zones_general = {
    '1': '-60 to -50',
    '2': '-50 to -40',
    '3': '-40 to -30',
    '4': '-30 to -20',
    '5': '-20 to -10',
    '6': '-10 to 0',
    '7': '0 to 10',
    '8': '10 to 20',
    '9': '20 to 30',
    '10': '30 to 40',
    '11': '40 to 50',
}

with open(zone_json, 'wb') as output:
    zone_dict = []
    with open(zone_csv, 'rb') as input:
        reader = csv.reader(input)
        header = reader.next()
        rows = [row for row in reader if row]
        for row in rows:
            zipcode = row[0]
            zone = row[1]
            range = row[2]
            if not any(item['zone'] == zone for item in zone_dict):
                zone_dict.append({
                    'zone': zone,
                    'range': range,
                    'zipcodes': [zipcode]
                })
            else:
                for item in zone_dict:
                    if item['zone'] == zone:
                        item['zipcodes'].append(zipcode)

    json.dump(zone_dict, output)