import json
import secrets

from urllib.request import urlopen

# Grab the BJCP 2015 style definition
#bjcp_style_guide_url = "https://raw.githubusercontent.com/gthmb/bjcp-2015-json/master/json/styleguide-2015.min.json"


def lambda_handler(event, context):
    # TODO implement
    catstyle = build_random()
    return {
        'statusCode': 200,
        'headers': {
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Credentials" : True
        },
        'body': json.dumps(catstyle)
    }

def build_random():
    bjcp_style_guide_url = "https://randomstyle.brewerymayhem.com/styleguide-2015.min.json"
    bjcp_json = urlopen(bjcp_style_guide_url)
    bjcp_data = json.load(bjcp_json)
    category = random_category(bjcp_data["styleguide"]["class"][0]["category"])
    catstyle = {}
    try:
        catstyle["Style"] = random_style(category["subcategory"])
    except KeyError:
        print("Incomplete data, retrying")
        return build_random()
        #print(category)
        #raise
    del category["subcategory"]
    catstyle["Category"] = category
    return catstyle
    
def random_category(categories):
	return(secrets.choice(categories))

def random_style(category):
	return(secrets.choice(category))