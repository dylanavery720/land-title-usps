from flask import Flask, request, jsonify
import os
import untangle
import requests
app = Flask(__name__)
USERID = os.getenv("USPS_USERID")
PASSWORD = os.getenv("USPS_PASSWORD")


def address_validate_request(address, city, state, zipcode):
    url = 'https://secure.shippingapis.com/ShippingApi.dll'
    api = 'Verify'
    xml = f'''<AddressValidateRequest USERID="{USERID}">
<Revision>1</Revision>
  <Address ID="0">
    <Address1></Address1>
    <Address2>{address}</Address2>
    <City>{city}</City>
    <State>{state}</State>
    <Zip5>{zipcode}</Zip5>
    <Zip4></Zip4>
  </Address>
</AddressValidateRequest>'''
    params = {'API': api, 'XML': xml}
    response = requests.get(url, params=params).text
    parsedxml = untangle.parse(response)
    try:
        verifiedaddress = parsedxml.children[0].children[0].Address2.cdata
        verifiedcity = parsedxml.children[0].children[0].City.cdata
        verifiedstate = parsedxml.children[0].children[0].State.cdata
        verifiedzip = parsedxml.children[0].children[0].Zip5.cdata
        return jsonify(verifiedaddress=verifiedaddress, verifiedcity=verifiedcity, verifiedstate=verifiedstate, verifiedzip=verifiedzip)
    except:
        error = parsedxml.children[0].children[0].Error.Description.cdata
        return jsonify(error=error)


def zip_code_lookup_request(address, city, state, zipcode):
    url = 'https://secure.shippingapis.com/ShippingApi.dll'
    api = 'ZipCodeLookup'
    xml = f'''<ZipCodeLookupRequest USERID="{USERID}">
  <Address ID="0">
    <Address1></Address1>
    <Address2>{address}</Address2>
    <City>{city}</City>
    <State>{state}</State>
    <Zip5>{zipcode}</Zip5>
    <Zip4></Zip4>
  </Address>
</ZipCodeLookupRequest>'''
    params = {'API': api, 'XML': xml}
    response = requests.get(url, params=params).text
    parsedxml = untangle.parse(response)
    try:
        zip5 = parsedxml.children[0].children[0].Zip5.cdata
        zip4 = parsedxml.children[0].children[0].Zip4.cdata
        return jsonify(zip5=zip5, zip4=zip4)
    except:
        error = parsedxml.children[0].children[0].Error.Description.cdata
        return jsonify(error=error)


def city_state_lookup_request(zipcode):
    url = 'https://secure.shippingapis.com/ShippingApi.dll'
    api = 'CityStateLookup'
    xml = f'''<CityStateLookupRequest USERID="{USERID}">
  <ZipCode ID='0'>
    <Zip5>{zipcode}</Zip5>
  </ZipCode>
</CityStateLookupRequest>'''
    params = {'API': api, 'XML': xml}
    response = requests.get(url, params=params).text
    parsedxml = untangle.parse(response)
    try:
        city = parsedxml.children[0].children[0].City.cdata
        state = parsedxml.children[0].children[0].State.cdata,
        return jsonify(city=city, state=state)
    except:
        error = parsedxml.children[0].children[0].Error.Description.cdata
        return jsonify(error=error)


@app.route('/verify')
def verify():
    address = request.args.get('address')
    city = request.args.get('city')
    state = request.args.get('state')
    zipcode = request.args.get('zipcode')
    return address_validate_request(address, city, state, zipcode)


@app.route('/zipcode')
def zipcode():
    address = request.args.get('address')
    city = request.args.get('city')
    state = request.args.get('state')
    zipcode = request.args.get('zipcode')
    return zip_code_lookup_request(address, city, state, zipcode)


@app.route('/citystate')
def citystate():
    zipcode = request.args.get('zipcode')
    return city_state_lookup_request(zipcode)
