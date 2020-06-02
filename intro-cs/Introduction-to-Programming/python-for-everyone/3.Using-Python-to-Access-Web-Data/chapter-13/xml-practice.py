import xml.etree.ElementTree as ET


tree = ET.parse('data.xml')

root = tree.getroot()


print("Root: ", root.tag)

for child in root.findall('Fact'):
    print("<Fact>")
    print("\t", child.find('GBDREGION').text)
    print("\t", child.find('GHO').text)
    print("\t", child.find('YEAR').text)
    print("\t", child.find('SEX').text)
    print("\t", child.find('AGEGROUP').text)
    print("\t", child.find('Display').text)
    print("</Fact>")
# parse display later