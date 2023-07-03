from flask import request, jsonify
from schema import drug_schema, illness_schema, healthcare_provider_schema
from models import app, db, Drug, Illness, HealthcareProvider
from sqlalchemy import or_

@app.route("/")
def home():
    return "<h1>CARECONNECT API<h1>"

@app.route("/drugs")
def drugs():
    page = request.args.get("page", type=int)
    perPage = request.args.get("perPage", type=int)
    route = request.args.get("route")
    marketing_status = request.args.get("marketing_status")
    sort = request.args.get("sort")
    category = request.args.get("category")
    query = db.session.query(Drug)

    # Filter by route (form the drug is used)
    if route is not None:
        query = query.filter(Drug.route == route)
    # Filter by marketing status
    if marketing_status is not None:
        query = query.filter(Drug.marketing_status == marketing_status)
    if category is not None:
        query = query.filter(Drug.category == category)

    # Sort
    if sort is not None and getattr(Drug, sort) is not None:
        query = query.order_by(getattr(Drug, sort))

    if page is not None:
        actual_per_page = perPage if perPage is not None else 12
        query = query.paginate(page=page, per_page=actual_per_page, error_out=False).items
    result = drug_schema.dump(query, many=True)
    return jsonify({"data": result})

@app.route("/drugs/<string:drug_id>")
def get_drug(drug_id):
    query = db.session.query(Drug).filter_by(id=drug_id)
    result = drug_schema.dump(query, many=True)
    return jsonify({"data": result})

@app.route("/illnesses")
def illnesses():
    page = request.args.get("page", type=int)
    perPage = request.args.get("perPage", type=int)
    region = request.args.get("region")
    country = request.args.get("country")
    sort = request.args.get("sort")
    query = db.session.query(Illness)

    # Filter by region
    if region is not None:
        query = query.filter(Illness.region == region)
    
    if country is not None:
        query = query.filter(Illness.country == country)
    
    # Sort
    if sort is not None and getattr(Illness, sort) is not None:
        query = query.order_by(getattr(Illness, sort))

    if page is not None:
        actual_per_page = perPage if perPage is not None else 12
        query = query.paginate(page=page, per_page=actual_per_page, error_out=False).items
    result = illness_schema.dump(query, many=True)
    return jsonify({"data": result})

@app.route("/illnesses/<int:illness_id>")
def get_illness(illness_id):
    query = db.session.query(Illness).filter_by(id=illness_id)
    result = illness_schema.dump(query, many=True)
    return jsonify({"data": result})

@app.route("/healthcare-providers")
def healthcare_providers():
    page = request.args.get("page", type=int)
    perPage = request.args.get("perPage", type=int)
    provider_type = request.args.get("type")
    taxonomy = request.args.get("taxonomy")
    sort = request.args.get("sort")
    query = db.session.query(HealthcareProvider)

    # Filter by provider type Either NPI-1(Personal) or NPI-2 (Organization)
    if provider_type is not None :
        query = query.filter(HealthcareProvider.type == provider_type)
    # Filter by taxonomy
    if taxonomy is not None:
        query = query.filter(HealthcareProvider.taxonomy.contains(taxonomy))

    # Sort
    if sort is not None and getattr(HealthcareProvider, sort) is not None:
        query = query.order_by(getattr(HealthcareProvider, sort))

    if page is not None:
        actual_per_page = perPage if perPage is not None else 12
        query = query.paginate(page=page, per_page=actual_per_page, error_out=False).items
    result = healthcare_provider_schema.dump(query, many=True)
    return jsonify({"data": result})

@app.route("/healthcare-providers/<int:healthcare_id>")
def get_healthcare_provider(healthcare_id):
    query = db.session.query(HealthcareProvider).filter_by(id=healthcare_id)
    result = healthcare_provider_schema.dump(query, many=True)
    return jsonify({"data": result})

def search_drugs(terms):
    occurrences = {}
    for term in terms:
        queries = []
        queries.append(Drug.drug_name.contains(term))
        queries.append(Drug.company_name.contains(term))
        queries.append(Drug.id.contains(term))
        queries.append(Drug.marketing_status.contains(term))
        queries.append(Drug.route.contains(term))

        drugs = Drug.query.filter(or_(*queries))
        for drug in drugs:
            if not drug in occurrences:
                occurrences[drug] = 1
            else:
                occurrences[drug] += 1
    return occurrences

def search_healthcare_providers(terms):
    occurrences = {}
    for term in terms:
        queries = []
        queries.append(HealthcareProvider.address.contains(term))
        queries.append(HealthcareProvider.city.contains(term))
        queries.append(HealthcareProvider.id.contains(term))
        queries.append(HealthcareProvider.name.contains(term))
        queries.append(HealthcareProvider.state.contains(term))
        queries.append(HealthcareProvider.taxonomy.contains(term))
        queries.append(HealthcareProvider.type.contains(term))


        providers = HealthcareProvider.query.filter(or_(*queries))
        for provider in providers:
            if not provider in occurrences:
                occurrences[provider] = 1
            else:
                occurrences[provider] += 1
    return occurrences

def search_illnesses(terms):
    occurrences = {}
    for term in terms:
        queries = []
        queries.append(Illness.id.contains(term))
        queries.append(Illness.region.contains(term))
        queries.append(Illness.year.contains(term))
        queries.append(Illness.country.contains(term))
        queries.append(Illness.illness.contains(term))
        queries.append(Illness.value.contains(term))

        illnesses = Illness.query.filter(or_(*queries))
        for illness in illnesses:
            if not illness in occurrences:
                occurrences[illness] = 1
            else:
                occurrences[illness] += 1
    return occurrences

@app.route("/search/<string:query>")
def search_all(query):
    #implementation similar to geojobs 
    terms = query.split()
    occurrences = {
        **search_drugs(terms),
        **search_healthcare_providers(terms),
        **search_illnesses(terms),
    }
    objs = sorted(occurrences.keys(), key=lambda x: occurrences[x], reverse=True)
    drugs = [drug for drug in objs if type(drug) == Drug]
    providers = [provider for provider in objs if type(provider) == HealthcareProvider]
    illnesses = [illness for illness in objs if type(illness) == Illness]
    drug_results = drug_schema.dump(drugs, many=True)
    provider_results = healthcare_provider_schema.dump(providers, many=True)
    illness_results = illness_schema.dump(illnesses, many=True)
    return jsonify(
        {"drugs": drug_results, "healthcare-providers": provider_results, "illnesses": illness_results}
    )

@app.route("/search/<string:model>/<string:query>")
def search_models(model, query):
    model = model.strip().lower()
    terms = query.split()
    result = None
    if model == "drugs":
        occurrences = search_drugs(terms)
        drugs = sorted(occurrences.keys(), key=lambda x: occurrences[x], reverse=True)
        result = drug_schema.dump(drugs, many=True)

        sort = request.args.get("sort")
        route = request.args.get("route")
        marketing_status = request.args.get("marketing_status")
        category = request.args.get("category")

        if route is not None:
            result = list(filter(lambda y: y["route"].lower() == route.lower(), result))
        
        if marketing_status is not None:
            result = list(filter(lambda y: y["marketing_status"].lower() == marketing_status.lower(), result))
        
        if category is not None:
            result = list(filter(lambda y: y["category"].lower() == category.lower(), result))

        if sort is not None and getattr(Drug, sort) is not None:
            result.sort(key=lambda y: y[sort])
        
    elif model == "healthcare-providers":
        occurrences = search_healthcare_providers(terms)
        providers = sorted(occurrences.keys(), key=lambda x: occurrences[x], reverse=True)
        result = healthcare_provider_schema.dump(providers, many=True)

        provider_type = request.args.get("type")
        taxonomy = request.args.get("taxonomy")
        sort = request.args.get("sort")

        if provider_type is not None :
            result = list(filter(lambda y: y["type"].lower() == provider_type.lower(), result))
        if taxonomy is not None:
            result = list(filter(lambda y: y["taxonomy"].lower() == taxonomy.lower(), result))
        
        if sort is not None and getattr(HealthcareProvider, sort) is not None:
            result.sort(key=lambda y: y[sort])


    elif model == "illnesses":
        occurrences = search_illnesses(terms)
        illnesses = sorted(occurrences.keys(), key=lambda x: occurrences[x], reverse=True)
        result = illness_schema.dump(illnesses, many=True)

        region = request.args.get("region")
        country = request.args.get("country")
        sort = request.args.get("sort")

        if region is not None:
            result = list(filter(lambda y: y["region"].lower() == region.lower(), result))
        if country is not None:
            result = list(filter(lambda y: y["country"].lower() == country.lower(), result))
    
        if sort is not None and getattr(Illness, sort) is not None:
            result.sort(key=lambda y: y[sort])
    return jsonify({"data": result})



if __name__ == "__main__":
    app.run(host='0.0.0.0', port = 5000)