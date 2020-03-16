# Exercise 1 Our First Database

In this assignment, you will use the SQLite browser to make a database, insert some data and then run query.
- Solution: in schemas folder

### Create ages table
```
CREATE TABLE Ages ( 
  name VARCHAR(128), 
  age INTEGER
)


```

## Select Answer table
```
SELECT hex(name || age) AS X FROM Ages order BY X
```

### Insert into Ages 
```
DELETE FROM Ages;
INSERT INTO Ages (name, age) VALUES ('Declain', 37);
INSERT INTO Ages (name, age) VALUES ('Jaidyn', 24);
INSERT INTO Ages (name, age) VALUES ('Eris', 29);
INSERT INTO Ages (name, age) VALUES ('Siubhan', 29);
INSERT INTO Ages (name, age) VALUES ('Kaydyne', 21);
INSERT INTO Ages (name, age) VALUES ('kariss', 18);

```

# Exercise 2
- Counting Email in a Database
- Count messages from organizations
- Solution: exercise-2.py  

## Read data from mbox.txt and extract email organization
```
From stephen.marquard@uct.ac.za Sat Jan  5 09:14:16 2008
Return-Path: <postmaster@collab.sakaiproject.org>
Received: from murder (mail.umich.edu [141.211.14.90])
	 by frankenstein.mail.umich.edu (Cyrus v2.3.8) with LMTPA;
	 Sat, 05 Jan 2008 09:14:16 -0500
X-Sieve: CMU Sieve 2.3
........
```

## Populate emaildb from mbox.txt
```
"uct.ac.za"	          "96"
"media.berkeley.edu"	"56"
"umich.edu"	          "491"
"iupui.edu"	          "536"
"caret.cam.ac.uk"	    "157"
"gmail.com"	          "25"
"indiana.edu"	        "178"
"et.gatech.edu"	      "17"
"vt.edu"	            "110"
"lancaster.ac.uk"	    "14"
"ucdavis.edu"	        "1"
"ufp.pt"	            "28"
"txstate.edu"	        "17"
"stanford.edu"	      "12"
"whitman.edu"	        "17"
"rsmart.com"	        "8"
"fhda.edu"	          "1"
"bu.edu"	            "14"
"unicon.net"	        "9"
"loi.nl"	            "9"
"utoronto.ca"	        "1"
```