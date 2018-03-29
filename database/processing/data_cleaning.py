import json
import csv
import pprint
import time

uf_data_file = '../dataset/uf_data_raw.json'
uf_data_clean_file = '../dataset/uf_data_clean.json'
uf_data_final_file = '../dataset/uf_data_final.json'
pH_file = '../dataset/pH_level.json'

productKeys = []
productKeysToBeRemoved = ['Size', 'Form', 'Dimensions', 'Weight', 'Packet', 'categories', 'types', 'Sow per 1,000 Sq. Ft.',
                          'Garlic Hardneck Type', 'Broadcast Rate per Acre', 'Best Time to Sow', 'Sub Type', 'Corn Use',
                          'Ear Length', 'Color', 'Beet Shape', 'Resistance', 'Fruit Weight', 'Tomato Leaf Type', 'Seed Count',
                          'Vine', 'Shape', 'Fruit Length', 'Uses', 'Yield', 'Corn Seed Type', 'Seeds Per Pound',
                          'Bean Seed Color', 'Cubic Inches', 'Seeds Per Gram', 'Seeds Per Ounce', 'Asparagus']


# Remove unnecessary product fields
# From Urban Farmer scraped raw data
def deleteUnecessaryProductProperties():
    with open(uf_data_clean_file, 'wb') as output_file:
        with open(uf_data_file, 'rb') as input_file:
            data = json.load(input_file)
            for category in data:
                mains = data[category]
                for main in mains:
                    products = main['products']
                    for product in products:
                        for key in productKeysToBeRemoved:
                            product.pop(key, None)

            json.dump(data, output_file)
            input_file.close()
        output_file.close()


# Get a list of all product properties
def getListOfAllProductProperties():
    with open(uf_data_clean_file, 'rb') as input_file:
        data = json.load(input_file)
        for category in data:
            mains = data[category]
            for main in mains:
                products = main['products']
                for product in products:
                    for key in product:
                        if key not in productKeys:
                            productKeys.append(key)


# Denormalize all products
def denormalizeProductData():
    with open(uf_data_final_file, 'wb') as output_file:
        plants = []
        with open(uf_data_clean_file, 'rb') as input_file:
            data = json.load(input_file)
            for category in data:
                mains = data[category]
                for main_product in mains:
                    main = main_product['main']
                    main_pic = main_product['main_pic']
                    main_url = main_product['main_url']
                    products = main_product['products']
                    for sub_product in products:
                        newPlant = {}
                        newPlant['category'] = category
                        newPlant['main'] = main
                        newPlant['main_pic'] = main_pic
                        newPlant['main_url'] = main_url
                        for key in sub_product:
                            newPlant[key] = sub_product[key]
                        plants.append(newPlant)

            json.dump(editProductData(plants), output_file)
            input_file.close()
        output_file.close()


# Edit Plant Properties
# Add pH property
def editProductData(plants):
    with open(pH_file, 'rb') as pH_data_file:
        pH_data = json.load(pH_data_file)
        plantKeys = {
            'Zones': 'zones',
            'Botanical Name': 'botanicalName',
            'Days To Maturity': 'daysToMaturity',
            'Breed': 'breed',
            'Life Cycle': "lifeCycle",
            'Sow Depth': "sowDepth",
            'Growing Conditions': "growingConditions",
            'Sow Method': "sowMethod",
            'Germination': "germination",
            'Disease Resistance': "diseaseResistance",
            'Fruit Color': "fruitColor",
            'Plant Spacing': "plantSpacing",
            'Row Spacing': "rowSpacing",
            'Maturity': "maturity",
            'Fruit': "fruit",
            'Plant Height': "plantHeight",
            'Sun': "sun",
            'Additional Characteristics': "additionalCharacteristics",
            'Carrot Weight': "carrotWeight",
            'Endive Head Type': "endiveHeadType",
            'Corn Height': "cornHeight",
            'Eggplant Type': "eggplantType",
            'Garlic Type': "garlicType"
        }
        count = 0
        for plant in plants:
            # Convert Zones String to Array
            if 'Zones' in plant:
                plant['Zones'] = plant['Zones'].replace(' ', '').split(',')
            # Convert Zones String to Array
            if 'Germination' in plant:
                plant['Germination'] = plant['Germination'].replace(' ', '').split(',')
            # Fix Sow Method Consistency
            if 'Sow Method' in plant:
                if plant['Sow Method'] in ['TransplantDirect Sow', 'Direct SowTransplant']:
                    plant['Sow Method'] = 'Direct Sow, Transplant'
            # Edit all keys' naming
            for oldKey in plantKeys:
                if oldKey in plant:
                    newKey = plantKeys[oldKey]
                    plant[newKey] = plant[oldKey]
                    plant.pop(oldKey, None)
            # Manually add pH range for product's name that matches value in pH data
            if plant['product'] == 'Spearmint':
                plant['pH_range'] = ["5.5", "7.5"]
            elif plant['product'] == 'Peppermint':
                plant['pH_range'] = ["6.0", "7.5"]
            elif plant['product'] == 'Sweet William':
                plant['pH_range'] = ["6.0", "7.5"]
            elif plant['product'] == 'Pampas':
                plant['pH_range'] = ["6.0", "8.0"]
            elif plant['product'] == 'Red Currant':
                plant['pH_range'] = ["5.5", "7.0"]
            # If plant main matches value in pH data, add pH range for that main
            for pH_plant in pH_data:
                if plant['main'] == pH_plant['name']:
                    plant['pH_range'] = pH_plant['pH']

    return plants


start = time.time()
# deleteUnecessaryProductProperties()
getListOfAllProductProperties()
denormalizeProductData()
pprint.pprint(productKeys)
print(len(productKeys))
end = time.time()
print "Data processing took", str(int((end - start) * 1000)), "miliseconds."
