from jinja2 import Template
from datetime import datetime

context = {
    'date': datetime.now(),
    'movies': ['Casablanca', 'The Sound of Music', 'Vertigo'],
    'total_minutes': 404,
}



with open('jinja_template.html') as file:
    template = Template(file.read())


with open('report.html', 'w') as file:
    file.write(template.render(context))


