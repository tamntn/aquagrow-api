import csv
import json

ph_clean_text_file = '../dataset/pH_level.txt'
ph_clean_csv_file = '../dataset/pH_level.csv'
ph_clean_json_file = '../dataset/pH_level.json'

with open(ph_clean_csv_file, 'wb') as clean_csv_file:
    writer = csv.writer(clean_csv_file)
    header = ['name', 'ph_range']
    writer.writerow(header)
    with open(ph_clean_text_file, 'rb') as clean_text_file:
        lines = clean_text_file.readlines()
        for i in range(0, len(lines), 2):
            name = lines[i].strip()
            level = lines[i + 1].strip()
            row = [name, level]
            writer.writerow(row)

with open(ph_clean_json_file, 'wb') as clean_json_file:
    pH = []
    with open(ph_clean_text_file, 'rb') as clean_text_file:
        lines = clean_text_file.readlines()
        for i in range(0, len(lines), 2):
            name = lines[i].strip()
            level = lines[i + 1].strip()
            pH.append({
                "name": name,
                "pH": level
            })
    json.dump(pH, clean_json_file)
