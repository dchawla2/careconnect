import json
from sqlite3 import IntegrityError
import sys
import secrets
from models import app, db, Drug, Illness, HealthcareProvider
import pymysql
from apiclient.discovery import build
import json
import random
import wikipediaapi

# set api_key (each google account has one)
api_key = ""
wiki = wikipediaapi.Wikipedia('en')

resource = build("customsearch", 'v1', developerKey=api_key).cse()
youtube = build("youtube", 'v3', developerKey=api_key)
youtube_prefix = "https://www.youtube.com/watch?v="

def get_drugs_info():
    drug_info = dict()
    drug_info['data'] = []
    with open("data/drugsfda.json") as jsnfile:
        drugs_data_all = json.load(jsnfile)
        for drug in drugs_data_all["results"]:
            needed_info = {
                "id": drug["application_number"],
                "drug_name":  drug["products"][0]["brand_name"],
                "marketing_status": drug["products"][0]["marketing_status"],
                "route": drug["products"][0]["route"],
                "company_name": drug["sponsor_name"],
                "image_url": '',
                "youtube_url": ''
            }
            drug_info['data'].append(needed_info)

    with open("data/drugsdata.json", 'w') as outfile:
        json.dump(drug_info, outfile)

def populate_drugs():
    the_list = dict()
    the_list['data'] = []

    with open("data/drugsdata.json") as jsn:
        data = json.load(jsn)
        for drug in data['data']:
            if drug['image_url'] == "":
                try:
                    #cx is the search engine ID
                    result = resource.list(q = drug["drug_name"], searchType = 'image', cx = '07a32f04e0cbe4be2').execute()
                    drug['image_url'] = drug['image_url'].replace('', result['items'][1]['link'] if 'items' in result else '')
                except Exception as e:
                    pass # daily quota reached
            if drug['youtube_url'] == "":
                try:
                    vid_result = youtube.search().list(part="snippet",q=drug["drug_name"],maxResults=3).execute()
                    drug['youtube_url'] = drug['youtube_url'].replace('', youtube_prefix + vid_result['items'][0]['id']['videoId'] if 'items' in vid_result and 'videoId' in vid_result['items'][0]['id'] else '')
                except Exception as e:
                    pass #daily quota reached
            if drug.get('wiki_text') is None:
                try:
                    the_page = wiki.page(drug['drug_name'].lower())
                    drug['wiki_text'] = the_page.summary[0:1450]
                except Exception:
                    try:
                        the_page = wiki.page(drug['company_name'].lower())
                        drug['wiki_text'] = the_page.summary[0:1450]
                    except Exception:
                        drug['wiki_text'] = ""
            the_list['data'].append(drug)

    with open("data/drugsdata.json", 'w') as f:
        json.dump(the_list, f)

    with open("data/drugsdata.json") as jsonfile:
        drugs_data = json.load(jsonfile)
        for drug in drugs_data['data']:
            related_healthcare_all = HealthcareProvider.query.filter_by(category=drug['category']).all()
            related_healthcare_id = (random.choice(related_healthcare_all)).id if related_healthcare_all else 0
            related_illness_all = Illness.query.filter_by(category=drug['category']).all()
            related_illness_id = (random.choice(related_illness_all)).id if related_illness_all else 0
            row = {
                "id": drug["id"],
                "drug_name":  drug["drug_name"],
                "marketing_status": drug["marketing_status"],
                "route": drug["route"],
                "company_name": drug["company_name"],
                "image_url": drug['image_url'],
                "youtube_url": drug['youtube_url'],
                "category": drug['category'],
                "related_healthcare_id": related_healthcare_id,
                "related_illness_id": related_illness_id,
                "wiki_text": drug['wiki_text']
            }
            db.session.add(Drug(**row))
        db.session.commit()

def get_healthcare_info():
    healthcare_info = dict()
    healthcare_info['data'] = []
    with open("data/nppes.json") as jsnfile:
        healthcare_data_all = json.load(jsnfile)
        for the_provider in healthcare_data_all["results"]:
            needed_info = {
                "id": the_provider["number"],
                "taxonomy": the_provider["taxonomies"][0]["desc"],
                "type": the_provider["enumeration_type"],
                "city": the_provider["addresses"][0]["city"],
                "state": the_provider["addresses"][0]["state"],
                "name": the_provider["basic"]["organization_name"] if "organization_name" in the_provider["basic"] else the_provider["basic"]["first_name"] + " " + the_provider["basic"]["last_name"],
                "image_url": "",
                "address": the_provider["addresses"][0]["address_1"] + " " + the_provider["addresses"][0]["city"] + " " + the_provider["addresses"][0]["state"]
            }
            healthcare_info['data'].append(needed_info)

    with open("data/healthcaredata.json", 'w') as outfile:
        json.dump(healthcare_info, outfile)

def populate_healthcare_providers():
    the_list = dict()
    the_list['data'] = []
    with open("data/healthcaredata.json") as jsn:
        data = json.load(jsn)
        for provider in data['data']:
            if provider['image_url'] == "": 
                try:
                    result = resource.list(q = provider["taxonomy"] + " healthcare", searchType = 'image', cx = '07a32f04e0cbe4be2').execute()
                    provider['image_url'] = provider['image_url'].replace('', result['items'][random.randint(0,7)]['link'] if 'items' in result else '')
                    # provider['image_url'] = provider['image_url'].replace(provider['image_url'], result['items'][random.randint(0,7)]['link'] if 'items' in result else '')  # to replace existing image
                except Exception as e:
                    pass
            if provider.get('wiki_text') is None:
                try:
                    the_page = wiki.page(provider['taxonomy'].lower())
                    provider['wiki_text'] = the_page.summary[0:1450]
                except Exception:
                        provider['wiki_text'] = ""
            the_list['data'].append(provider)
    with open("data/healthcaredata.json", 'w') as f:
        json.dump(the_list, f)

    with open("data/healthcaredata.json") as jsonfile:
        healthcare_data = json.load(jsonfile)
        for the_provider in healthcare_data['data']:
            related_drug_all = Drug.query.filter_by(category=the_provider["category"]).all()
            related_drug_id = (random.choice(related_drug_all)).id if related_drug_all else "0"
            related_illness_all = Illness.query.filter_by(category=the_provider['category']).all()
            related_illness_id = (random.choice(related_illness_all)).id if related_illness_all else 0
            row = {
                "id": the_provider["id"],
                "taxonomy": the_provider["taxonomy"],
                "type": the_provider["type"],
                "city": the_provider["city"],
                "state": the_provider["state"],
                "name": the_provider["name"],
                "image_url": the_provider["image_url"],
                "address": the_provider["address"],
                "category": the_provider["category"],
                "related_drug_id": related_drug_id,
                "related_illness_id": related_illness_id,
                "wiki_text": the_provider['wiki_text']
            }
            db.session.add(HealthcareProvider(**row))
        db.session.commit()

def get_illness_info():
    illness_info = dict()
    illness_info['data'] = []
    with open("data/whodata.json") as jsn:
        illness_data = json.load(jsn)
        for illness in illness_data["fact"]:
            disease = ""
            match illness["dim"]["GHO"]:
                case "Annual incidence of dracunculiasis cases":
                    disease = "Dracunculiasis"
                case "Age-standardized death rates, cerebrovascular disease, per 100,000":
                    disease = "Cerebrovascular Disease"
                case "Age-standardized DALYs, ischaemic heart disease, per 100,000":
                    disease = "Ischaemic Heart Disease"
                case "Buprenorphine used for the treatment of opioid dependence":
                    disease = "Opioid Dependence"
                case "Raised blood pressure (SBP>=140 OR DBP>=90) (crude estimate)":
                    disease = "Raised Blood Pressure"
                case "Number of new leprosy cases":
                    disease = "Leprosy"
                case "Poliomyelitis - number of reported cases":
                    disease = "Poliomyelitis"
                case "Diphtheria - number of reported cases":
                    disease = "Diphtheria"
                case "Pertussis - number of reported cases":
                    disease = "Pertussis"
                case "Total tetanus - number of reported cases":
                    disease = "Tetanus"
                case "Congenital Rubella Syndrome - number of reported cases":
                    disease = "Congenital Rubella Syndrome"
                case "Total rubella - number of reported cases":
                    disease = "Total Rubella"
                case "Estimated number of people (all ages) living with HIV":
                    disease = "HIV"
                case "Congenital syphilis number of reported cases":
                    disease = "Congenital Syphilis"
                case "Mumps - number of reported cases":
                    disease = "Mumps"
                case "Japanese encephalitis - number of reported cases":
                    disease = "Japanese Encephalitis"
                case "Number of suspected meningitis cases reported":
                    disease = "Meningitis"
                case default:
                    disease = ""
            needed_info = {
                "id": generate_id(),
                "region": illness["dim"]["REGION"] if "REGION" in illness["dim"] else "N/A",
                "year": illness["dim"]["YEAR"] if "YEAR" in illness["dim"] else "N/A",
                "country": illness["dim"]["COUNTRY"] if "COUNTRY" in illness["dim"] else "N/A",
                "illness_descr": illness["dim"]["GHO"] if "GHO" in illness["dim"] else "N/A",
                "value": illness["Value"],
                "category": illness["category"],
                "image_url": '',
                "disease": disease
            }
            illness_info['data'].append(needed_info)

    with open("data/illnessdata.json", 'w') as outfile:
        json.dump(illness_info, outfile)



def populate_illness():
    the_list = dict()
    the_list['data'] = []

    with open("data/illnessdata.json") as jsn:
        data = json.load(jsn)
        i = 0
        for illness in data['data']:
            if illness['image_url'] == "":
                try:
                    result = resource.list(q= illness['disease'] + " in " + illness['country'], searchType = 'image', cx = '07a32f04e0cbe4be2').execute(num_retries=5)
                    illness['image_url'] = illness['image_url'].replace('', result['items'][random.randint(0,5)]['link'] if 'items' in result else '')
                except Exception as e:
                    pass
            if illness.get('youtube_url') is None:
                try:
                    vid_result = youtube.search().list(part="snippet",q=illness["disease"],maxResults=6).execute(num_retries=5)
                    which_video = random.randint(0,5)
                    illness['youtube_url'] = youtube_prefix + vid_result['items'][which_video]['id']['videoId'] if 'items' in vid_result and 'videoId' in vid_result['items'][which_video]['id'] else ''
                except Exception as e:
                    pass
            if illness.get('wiki_text') is None:
                try:
                    the_page = wiki.page((illness['illness']).lower())
                    illness['wiki_text'] = the_page.summary[0:1450]
                except Exception as e:
                        print(e)
                        illness['wiki_text'] = ""
            the_list['data'].append(illness)

    with open("data/illnessdata.json", 'w') as f:
        json.dump(the_list, f)


    with open("data/illnessdata.json") as jsonfile:
        illness_data = json.load(jsonfile)
        for illness in illness_data['data']:
            related_drug_all = Drug.query.filter_by(category=illness['category']).all()
            related_drug_id = (random.choice(related_drug_all)).id if related_drug_all else "0"
            related_healthcare_all = HealthcareProvider.query.filter_by(category=illness['category']).all()
            related_healthcare_id = (random.choice(related_healthcare_all)).id if related_healthcare_all else 0
            row = {
                "id": illness['id'],
                "region": illness['region'],
                "year": illness['year'],
                "country": illness['country'],
                "illness_descr": illness['illness_descr'],
                "value": illness['value'],
                "category": illness['category'],
                "illness": illness['illness'],
                "image_url": illness['image_url'],
                "youtube_url": illness['youtube_url'],
                "related_healthcare_id": related_healthcare_id,
                "related_drug_id": related_drug_id,
                "wiki_text": illness['wiki_text']
            }
            db.session.add(Illness(**row))
        db.session.commit()

the_nums={}
def generate_id():
    digits = '0123456789'
    unique_str = ''.join(secrets.choice(digits) for i in range(6))
    while (the_nums.get(unique_str) is not None):
        unique_str = ''.join(secrets.choice(digits) for i in range(6))
    the_nums[unique_str] = "" #empty string not interested in value, just key
    return int(unique_str)

def populate_database():
    populate_drugs()
    populate_healthcare_providers()
    populate_illness()


if __name__ == "__main__":
    with app.app_context():
        db.drop_all()
        db.create_all()
        populate_database()

        # Individually drop, create and populate tables
        # Drug.__table__.drop(db.engine)
        # Drug.__table__.create(db.engine)
        # populate_drugs()
        # Illness.__table__.drop(db.engine)
        # Illness.__table__.create(db.engine)
        # populate_illness()
        # HealthcareProvider.__table__.drop(db.engine)
        # HealthcareProvider.__table__.create(db.engine)
        # populate_healthcare_providers()


       

