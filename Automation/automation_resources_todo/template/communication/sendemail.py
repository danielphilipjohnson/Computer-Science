import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

USER = 'your.account@gmail.com'
PASSWORD = 'YourPassword'
sent_from = USER
send_to = [USER]


text = "Hi!\nThis is the text version linking to https://www.packtpub.com/\nCheers!"
html = """<html><head></head><body> <p>Hi!<br>This is the HTML version linking to <a
        href="https://www.packtpub.com/">Packt</a><br></p></body></html>
        """

msg = MIMEMultipart('alternative')
msg['Subject'] = 'An interesting email'
msg['From'] = sent_from
msg['To'] = ', '.join(send_to)

part_plain = MIMEText(text, 'plain')
part_html = MIMEText(html, 'html')
msg.attach(part_plain)
msg.attach(part_html)


with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
    server.login(USER, PASSWORD)
    server.sendmail(sent_from, send_to, msg.as_string())
