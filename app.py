from flask import Flask, request
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
    # if obj.ERROR
    # verifiedaddress = parsedxml.children[0].children
    # verifiedcity =
    # verifiedstate =
    # verifiedzip =
    print(parsedxml.children[0], 'did we makkkkkeeeeeee it')
    return "http/json response with correct address for react fetch"


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
    # if obj.ERROR
    # zip5=
    # zip4=
    print(parsedxml.children[0], 'did we makkkkkeeeeeee it')
    return "http/json response with whole zip code for verified address"


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
    # if obj.ERROR
    # city=
    # state=
    print(parsedxml.children[0].children[0].children,
          'did we makkkkkeeeeeee it')
    return "http/json response with city state for zip code"


@app.route('/verify')
def verify():
    # address = request.args.get('address')
    return address_validate_request(address)


@app.route('/zipcode')
def zipcode():
    # address = request.args.get('address')
    return zip_code_lookup_request(address)


@app.route('/citystate')
def citystate():
    zipcode = request.args.get('zipcode')
    return city_state_lookup_request(zipcode)
