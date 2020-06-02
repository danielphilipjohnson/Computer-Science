#$ echo "requests==2.18.3" >> requirements.txt
#$ pip install -r requirements.txt

import requests

API = 'your secret key'
BASE = 'https://<dc>.api.mailchimp.com/3.0'
auth = ('user', API)

url = f'{BASE}/lists'
response = requests.get(url, auth=auth)
result = response.json()

LIST_NAME = 'Your list name'
this_list = [l for l in result['lists'] if l['name'] ==

LIST_NAME][0]

list_url = [l['href'] for l in this_list['_links'] if l['rel'] ==
'self'][0]

response = requests.get(list_url, auth=auth)
result = response.json()
result['stats']
# {'member_count': 1, 'unsubscribe_count': 0, 'cleaned_count': 0, ...}
members_url = [l['href'] for l in result['_links'] if l['rel'] == 'members'][0]

response = requests.get(members_url, json=new_member, auth=auth)
result = response.json()
len(result['members'])

new_member = {
'email_address': 'test@test.com',
'status': 'subscribed',
}
response = requests.post(members_url, json=new_member, auth=auth)

response = requests.post(members_url, json=new_member, auth=auth)
result = response.json()
len(result['members'])
#2
