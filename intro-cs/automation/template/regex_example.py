import re
match = re.search(r'the phone number is ([\d-]+)', '37: the phone number is 1234-567-890')
match.group()
match.group(1)

pattern = re.compile(r'The answer to question (\w+) is (yes|no)',
re.IGNORECASE)

pattern.search('Naturaly, the answer to question 3b is YES')


PATTERN = re.compile(r'([A-Z][\w\s]+).(TX|OR|OH|MI)')
TEXT ='the jackalopes are the team of Odessa,TX while the knights are native of Corvallis \
    OR and the mud hens come from Toledo.OH; the whitecaps have their base in Grand Rapids,MI'

list(PATTERN.finditer(TEXT))
#_[0].groups()