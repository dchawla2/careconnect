from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.debug=True
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://admin:careconnect@care-db.cxrgghugfw02.us-east-1.rds.amazonaws.com:3306/care_db'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://admin:careconnect@test.cxrgghugfw02.us-east-1.rds.amazonaws.com:3306/test_db'
db = SQLAlchemy(app)


class Drug(db.Model):
    id = db.Column(db.String(25), primary_key=True)
    drug_name = db.Column(db.String(25))
    company_name = db.Column(db.String(25))
    marketing_status = db.Column(db.String(25))
    route = db.Column(db.String(25))
    image_url = db.Column(db.String(250))
    youtube_url = db.Column(db.String(150))
    category = db.Column(db.String(50))
    related_healthcare_id = db.Column(db.Integer)
    related_illness_id = db.Column(db.Integer)
    wiki_text = db.Column(db.String(1500))


class Illness(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    region = db.Column(db.String(25))
    year = db.Column(db.String(25))
    country = db.Column(db.String(25))
    illness_descr = db.Column(db.String(200))
    value =  db.Column(db.String(25))
    category = db.Column(db.String(50))
    illness = db.Column(db.String(50))
    image_url = db.Column(db.String(350))
    youtube_url = db.Column(db.String(150))
    related_healthcare_id = db.Column(db.Integer)
    related_drug_id = db.Column(db.String(25))
    related_healthcare_id = db.Column(db.Integer)
    wiki_text = db.Column(db.String(1500))

class HealthcareProvider(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    taxonomy = db.Column(db.String(25))
    type = db.Column(db.String(25)) # Either NPI-1 or NPI-2 Personal or Org
    city = db.Column(db.String(25))
    state = db.Column(db.String(25))
    name = db.Column(db.String(25))
    image_url = db.Column(db.String(350))
    address = db.Column(db.String(120))
    category = db.Column(db.String(50))
    related_drug_id = db.Column(db.String(25))
    related_illness_id = db.Column(db.Integer)
    wiki_text = db.Column(db.String(1500))


