import requests

KEY = 'YOUR-SECRET-KEY'
DOMAIN = 'YOUR-DOMAIN.mailgun.org'
TO = 'YOUR-AUTHORISED-RECEIVER'
FROM = f'sender@{DOMAIN}'
auth = ('api', KEY)

text = "Hi!\nThis is the text version linking to https://www.packtpub.com/\nCheers!"
html = '''<html><head></head><body>
<p>Hi!<br>
This is the HTML version linking to <a
href="https://www.packtpub.com/">Packt</a><br>
</p>
</body></html>'''


data = {
 'from': f'Sender <{FROM}>',
 'to': f'Jaime Buelta <{TO}>',
 'subject': 'An interesting email!',
 'text': text,
 'html': html,
}


response =
requests.post(f"https://api.mailgun.net/v3/{DOMAIN}/messages",
auth=auth, data=data)

response.json()
#{'id': '<YOUR-ID.mailgun.org>', 'message': 'Queued. Thank you.'}

response_events =
requests.get(f'https://api.mailgun.net/v3/{DOMAIN}/events', auth=auth)
response_events.json()['items'][0]['recipient'] == TO
#True
response_events.json()['items'][0]['event']
#'delivered'

data = {
 'from': f'Sender <{FROM}>',
 'to': f'Jaime Buelta <{TO}>',
 'subject': 'An interesting email!',
 'text': text,
 'html': html,
}

response =
requests.post(f"https://api.mailgun.net/v3/{DOMAIN}/messages",
auth=auth, data=data)

response.json()
#{'id': '<YOUR-ID.mailgun.org>', 'message': 'Queued. Thank you.'}