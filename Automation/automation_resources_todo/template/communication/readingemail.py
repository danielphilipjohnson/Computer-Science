import imaplib
import email
from email.parser import BytesParser, Parser
from email.policy import default

USER = 'your.account@gmail.com'
PASSWORD = 'YourPassword'

mail = imaplib.IMAP4_SSL('imap.gmail.com')
mail.login(USER, PASSWORD)
mail.select('inbox')

result, data = mail.uid('search', None, 'ALL')
latest_email_uid = data[0].split()[-1]
result, data = mail.uid('fetch', latest_email_uid, '(RFC822)')
raw_email = data[0][1]

email_message = BytesParser(policy=default).parsebytes(raw_email)
email_message['subject']
#'[Ref ABCDEF] Subject: Product A'
email.utils.parseaddr(email_message['From'])
#('Sender name', 'sender@gmail.com')

email_type = email_message.get_content_maintype()
if email_type == 'multipart':
    for part in email_message.get_payload():
        if part.get_content_type() == 'text/plain':
            payload = part.get_payload()
        elif email_type == 'text':
            payload = email_message.get_payload()

print(payload)

"""
Filter emails
import datetime
since = (datetime.date.today() -
datetime.timedelta(days=1)).strftime("%d-%b-%Y")
result, data = mail.uid('search', None, f'(SENTSINCE {since})')

"""