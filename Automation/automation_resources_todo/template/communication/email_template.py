>>> import mistune
>>> import jinja2
>>> import base64


>>> with open("image.png",'rb') as file:
...
 encoded_data = base64.b64encode(file)
>>> print "<img src='data:image/png;base64,{data}'/>".format(data=encoded_data)





>>> with open('email_template.md') as md_file:
...
 markdown = md_file.read()
>>> with open('email_styling.html') as styling_file:
...
 styling = styling_file.read()


>>> data = {'name': 'Seamus'}


>>> text = markdown.format(**data)


>>> html_content = mistune.markdown(text)
>>> html = jinja2.Template(styling).render(content=html_content)
>>> with open('text_version.txt', 'w') as fp:
...
 fp.write(text)
>>> with open('html_version.html', 'w') as fp:
...
 fp.write(html)
# md https://daringfireball.net/projects/markdown/syntax
# https://mistune.readthedocs.io/en/latest/
# https://jinja.palletsprojects.com/en/2.11.x/

