import xml.etree.ElementTree as ET
# https://docs.python.org/3/library/xml.etree.elementtree.html#building-xml-documents

Data= ET.Element('Data')





def populate_fact(Data, GBDREGION, DISPLAY):
    Fact = ET.SubElement(Data, 'Fact')

    Gbdregion = ET.SubElement(Fact, 'GBDREGION')
    Gbdregion.text = GBDREGION
    
    GHO = ET.SubElement(Fact, 'GHO')
    GHO.text = "Non-partner sexual violence prevalence (%)"
    
    SEX = ET.SubElement(Fact, 'SEX')
    SEX.text = "Female"
    
    YEAR = ET.SubElement(Fact, 'YEAR')
    YEAR.text = "2010"

    AGEGROUP = ET.SubElement(Fact, 'AGEGROUP')
    AGEGROUP.text = "15-69 years"

    Display = ET.SubElement(Fact, 'Display')
    Display.text = DISPLAY

    print(Fact)
    #return fact_node





## made a fact node 
populate_fact(Data, "Asia Pacific, High-income", "12.2 [4.2-20.2]")
populate_fact(Data, "Asia, Central", "6.5 [0-13]")
populate_fact(Data, "Asia, East", "5.9 [0.1-11.6]")
populate_fact(Data, "Asia, South", "3.3 [0-8.4]")


#Fact = ET.SubElement(Fact, 'x')


print(ET.dump(Data))


with open("created-xml.xml", "wb") as f:
    f.write(ET.tostring(Data))

