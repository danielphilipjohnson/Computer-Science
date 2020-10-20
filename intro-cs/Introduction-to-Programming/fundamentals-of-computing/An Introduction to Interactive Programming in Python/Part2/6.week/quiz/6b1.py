year = 1
numberOfSlowWumpuses = 1000
numberOfFastWumpuses = 1
print(year, numberOfSlowWumpuses, numberOfFastWumpuses)
while numberOfSlowWumpuses >= numberOfFastWumpuses:
    numberOfSlowWumpuses *= 2
    numberOfSlowWumpuses *= 0.6
    numberOfFastWumpuses *= 2
    numberOfFastWumpuses *= 0.7
    year += 1
    print(year, numberOfSlowWumpuses, numberOfFastWumpuses)
    
    
    
    