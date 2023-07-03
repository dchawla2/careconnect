import unittest
import requests
import json
from app import app

class TestAPI(unittest.TestCase):
    def setUp(self):
        self.url = 'https://api.careconnect.works'
        self.headers = {'Content-type': 'application/json'}

    def test_homepage(self):
        r = requests.get(self.url)
        self.assertEqual(r.status_code, 200)

    def test_drugs(self):
        r = requests.get(f'{self.url}/drugs')
        self.assertEqual(r.status_code, 200)

    def test_drug_get(self):
        r = requests.get(f'{self.url}/drugs/ANDA040194')
        expected_json = {
            "data": [
                {
                    "category": "Anesthesiology",
                    "company_name": "SANDOZ",
                    "drug_name": "METHYLPREDNISOLONE",
                    "id": "ANDA040194",
                    "image_url": "https://cdn-prod.medicalnewstoday.com/content/images/articles/323/323545/methylprednisolone-br-image-credit-anonymous-2009-br.jpg",
                    "marketing_status": "Prescription",
                    "related_healthcare_id": 1912619792,
                    "related_illness_id": 0,
                    "route": "ORAL",
                    "wiki_text": "Methylprednisolone (Depo-Medrol, Medrol, Solu-Medrol) is a synthetic glucocorticoid, primarily prescribed for its anti-inflammatory and immunosuppressive effects. It is either used at low doses for chronic illnesses or used concomitantly at high doses during acute flares. Methylprednisolone and its derivatives can be administered orally or parenterally.Regardless of route of administration, methylprednisolone integrates systemically as exhibited by its effectiveness to quickly reduce inflammation during acute flares. It is associated with many adverse reactions that require tapering off the drug as soon as the disease is under control. Serious side effects include iatrogenic Cushing's Syndrome, hypertension, osteoporosis, diabetes, infection, and skin atrophy.Chemically, methylprednisolone is a synthetic pregnane steroid hormone derived from hydrocortisone and prednisolone. It belongs to a class of synthetic glucocorticoids and more generally, corticosteroids. It acts as a mineralocorticoid and glucocorticoid receptor agonist. In comparison to other exogenous glucocorticoids, methylprednisolone has a higher affinity to glucocorticoid receptors than to mineralocorticoid receptors.\nGlucocorticoid's name was derived after the discovery of their involvement in regulating carbohydrate metabolism.",
                    "youtube_url": "https://www.youtube.com/watch?v=tiJpUfvUb0A"
                }
            ]
        }
        self.assertEqual(r.json(), expected_json)

    def test_ilnesses(self):
        r = requests.get(f'{self.url}/illnesses')
        self.assertEqual(r.status_code, 200)

    def test_illness_get(self):
        r = requests.get(f'{self.url}/illnesses/300')
        expected_json = {
            "data": [
                {
                    "category": "Family Medicine",
                    "country": "United States of America",
                    "id": 300,
                    "illness": "Pertussis",
                    "illness_descr": "Pertussis - number of reported cases",
                    "image_url": "https://www.psopkids.com/wp-content/uploads/2019/08/iStock-892117830.jpg",
                    "region": "Americas",
                    "related_drug_id": "ANDA210606",
                    "related_healthcare_id": 1104436971,
                    "value": "7405",
                    "wiki_text": "Whooping cough, also known as pertussis or the 100-day cough, is a highly contagious bacterial disease. Initial symptoms are usually similar to those of the common cold with a runny nose, fever, and mild cough, but these are followed by two or three months of severe coughing fits. Following a fit of coughing, a high-pitched whoop sound or gasp may occur as the person breathes in. The violent coughing may last for 10 or more weeks, hence the phrase \"100-day cough\". A person may cough so hard that they vomit, break ribs, or become very tired from the effort. Children less than one year old may have little or no cough and instead have periods where they cannot breathe. The time between infection and the onset of symptoms is usually seven to ten days. Disease may occur in those who have been vaccinated, but symptoms are typically milder.Pertussis is caused by the bacterium Bordetella pertussis. It is spread easily through the coughs and sneezes of an infected person. People are infectious from the start of symptoms until about three weeks into the coughing fits. Those treated with antibiotics are no longer infectious after five days. Diagnosis is by collecting a sample from the back of the nose and throat. This sample can then be tested by either culture or by polymerase chain reaction.Prevention is mainly by vaccination with the pertussis vaccine. Initial immunization is recommended between six and eight weeks of age, with four d",
                    "year": "1998",
                    "youtube_url": "https://www.youtube.com/watch?v=jQsKhha8rcY"
                }
            ]
        }
        self.assertEqual(r.json(), expected_json)
        
    def test_healthcare_providers(self):
        r = requests.get(f'{self.url}/healthcare-providers')
        self.assertEqual(r.status_code, 200)

    def test_healthcare_provider_get(self):
        r = requests.get(f'{self.url}/healthcare-providers/1912619792')
        expected_json = {
            "data": [
                {
                    "address": "2021 GUADALUPE ST STE 260 AUSTIN TX",
                    "category": "Anesthesiology",
                    "city": "AUSTIN",
                    "id": 1912619792,
                    "image_url": "https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=10158441510579383",
                    "name": "LETICIA ACOSTA",
                    "related_drug_id": "ANDA202394",
                    "related_illness_id": 0,
                    "state": "TX",
                    "taxonomy": "Counselor, Professional",
                    "type": "NPI-1",
                    "wiki_text": ""
                }
            ]
        }
        self.assertEqual(r.json(), expected_json)

    def test_search(self):
        r = requests.get(f'{self.url}/search/dentist')

        self.assertEqual(r.json()['drugs'], [])
        self.assertEqual(r.json()['illnesses'], [])
        self.assertTrue(len(r.json()['healthcare-providers']) > 0)

    def test_search_drug(self):
        r = requests.get(f'{self.url}/search/drugs/advil')
        expected_json = {
            "data": [
                {
                    "category": "Family Medicine",
                    "company_name": "GLAXOSMITHKLINE",
                    "drug_name": "CHILDREN'S ADVIL COLD",
                    "id": "NDA021373",
                    "image_url": "https://www.londondrugs.com/on/demandware.static/-/Sites-londondrugs-master/default/dwc1b1d75e/products/L5254099/large/L5254099.JPG",
                    "marketing_status": "Over-the-counter",
                    "related_healthcare_id": 1790782670,
                    "related_illness_id": 701531,
                    "route": "ORAL",
                    "wiki_text": "",
                    "youtube_url": "https://www.youtube.com/watch?v=1aanGfmwqXY"
                },
                {
                    "category": "Dermatology",
                    "company_name": "GLAXOSMITHKLINE",
                    "drug_name": "ADVIL COLD AND SINUS",
                    "id": "NDA021374",
                    "image_url": "https://i-cf65.ch-static.com/content/dam/cf-consumer-healthcare/bp-advil-v2/en_US/products/product-01/cold_sinus_image_caplet.png?auto=format",
                    "marketing_status": "Over-the-counter",
                    "related_healthcare_id": 1861032211,
                    "related_illness_id": 0,
                    "route": "ORAL",
                    "wiki_text": "",
                    "youtube_url": "https://www.youtube.com/watch?v=zm7jtiSp5h0"
                }
            ]
        }
        self.assertEqual(r.json(), expected_json)



if __name__ == '__main__':
    unittest.main()
