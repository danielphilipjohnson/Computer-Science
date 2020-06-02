import mistune

with open('markdown_template.md') as file:
    template = file.read()


context = {
'date': datetime.now(),
'pmovies': ['Casablanca', 'The Sound of Music', 'Vertigo'],
'total_minutes': 404,
}


context['num_movies'] = len(context['pmovies'])
context['movies'] = '\n'.join('* {}'.format(movie) for movie in
context['pmovies'])



<<<<<<< HEAD
md_report = template.format(**context)
report = mistune.markdown(md_report)


with open('report.html', 'w') as file:
    file.write(report)
=======
>>> md_report = template.format(**context)
>>> report = mistune.markdown(md_report)


>>> with open('report.html', 'w') as file:
...
 file.write(report)
>>>>>>> 526021ef6be37eb7fa6818d59cdb2686ca3dae45
