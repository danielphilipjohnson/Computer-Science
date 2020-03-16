# Many Students in Many Courses

This assignment will be a Python program to build a set of tables using the Many-to-Many approach to store enrollment and role data.

Instructions

This application will read roster data in JSON format, parse the file, and then produce an SQLite database that contains a User, Course, and Member table and populate the tables from the data file. 


## json file
```
[
  [
    "Muhammed",
    "si110",
    1
  ],
  [
    "Elin",
    "si110",
    0
  ],
  [
    "Thara",
    "si110",
    0
  ],
  [
    "Matylda",
    "si110",
    0
  ],
  [
    "Lauren",
    "si110",
    0
  ],

  .....
  ]

```

## Database
```
"1"	 "Muhammed"
"2"	 "Elin"
"3"	 "Thara"
"4"	 "Matylda"
"5"	 "Lauren"
"6"	 "Alfie"
"7"	 "Dewi"
"8"	 "Alicia"
"9"	 "Elita"
"10" "Malebo"
```