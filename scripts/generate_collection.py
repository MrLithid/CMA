import sqlite3
from pathlib import Path, PureWindowsPath
import json

databaseFileName = PureWindowsPath("lib\\CMA-test\\cma-artworks.db")
JSON_DIR_PATH = PureWindowsPath("src\\json")
COLLECTION_FILE = Path(JSON_DIR_PATH) / 'collection.json'

DATABASE = Path(databaseFileName)

ARTWORK_QUERY = '''
SELECT DISTINCT
artwork.id,
artwork.accession_number,
artwork.title,
artwork.tombstone,
department.name AS department_name
FROM artwork
JOIN (department JOIN artwork__department ON department.id = artwork__department.department_id) ON artwork.id = artwork__department.artwork_id
'''

CREATOR_QUERY = '''
SELECT DISTINCT
creator.role,
creator.description
FROM artwork__creator
JOIN creator ON creator.id = artwork__creator.creator_id
WHERE artwork__creator.artwork_id = '%s'
'''

def results(query):
    connection = sqlite3.connect(str(DATABASE))
    connection.row_factory = sqlite3.Row
    db = connection.cursor()
    result = db.execute(query).fetchall()
    connection.commit()
    connection.close()

    return result

art = []
for artworks in results(ARTWORK_QUERY):
    print()
    print("Keys:")
    print(artworks.keys())
    print()
    print("Values:")
    print(list(artworks))
    print()
    creators = results(CREATOR_QUERY % artworks['id'])

    creators_list = []
    for x in creators:
        creator_object = {
        "role": x["role"],
        "description": x["description"]
        }
        creators_list.append(creator_object)

    art_object = {
    "id": artworks['id'],
    "image": "images/%s_reduced.jpg" % artworks['accession_number'],
    "title": artworks['title'],
    "tombstone": artworks['tombstone'],
    "department_name": artworks['department_name'],
    "creators": creators_list
    }

    art.append(art_object)


Path(JSON_DIR_PATH).mkdir(parents=True, exist_ok=True)

with open(str(COLLECTION_FILE), 'w') as result:
    result.write(json.dumps(art))
