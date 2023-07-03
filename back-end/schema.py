from flask_marshmallow import Marshmallow
from models import Drug, Illness, HealthcareProvider
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

ma = Marshmallow()

class DrugSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Drug

class IllnessSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Illness

class HealthcareProviderSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = HealthcareProvider
    
drug_schema = DrugSchema()
illness_schema = IllnessSchema()
healthcare_provider_schema = HealthcareProviderSchema()


