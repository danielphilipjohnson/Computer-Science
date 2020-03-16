# Multi-Table Database - Tracks

In this assignment you will parse an XML list of albums, artists, and Genres and produce a properly normalized database using a Python program.
- Solution: tracks.py  


## Example XML
```
<key>Track ID</key><integer>369</integer>
<key>Name</key><string>Another One Bites The Dust</string>
<key>Artist</key><string>Queen</string>
<key>Composer</key><string>John Deacon</string>
<key>Album</key><string>Greatest Hits</string>
<key>Genre</key><string>Rock</string>
<key>Kind</key><string>MPEG audio file</string>
<key>Size</key><integer>4344295</integer>
<key>Total Time</key><integer>217103</integer>
<key>Disc Number</key><integer>1</integer>
<key>Disc Count</key><integer>1</integer>
<key>Track Number</key><integer>3</integer>
<key>Track Count</key><integer>17</integer>
<key>Year</key><integer>1980</integer>
<key>Date Modified</key><date>2006-02-14T16:13:02Z</date>
<key>Date Added</key><date>2006-02-14T16:12:53Z</date>
<key>Bit Rate</key><integer>160</integer>
<key>Sample Rate</key><integer>44100</integer>
<key>Play Count</key><integer>55</integer>
<key>Play Date</key><integer>3518868190</integer>
<key>Play Date UTC</key><date>2015-07-04T19:23:10Z</date>
<key>Skip Count</key><integer>1</integer>
<key>Skip Date</key><date>2015-10-14T23:31:47Z</date>
<key>Rating</key><integer>100</integer>
<key>Album Rating</key><integer>100</integer>
<key>Album Rating Computed</key><true/>
<key>Normalization</key><integer>1511</integer>
<key>Compilation</key><true/>
<key>Persistent ID</key><string>21130E105F3B8845</string>
<key>Track Type</key><string>File</string>
<key>File Type</key><integer>1297106739</integer>
<key>Location</key><string>file:///Users/csev/Music/iTunes/iTunes%20Music/Compilations/Greatest%20Hits/03%20Another%20One%20Bites%20The%20Dust.mp3</string>
<key>File Folder Count</key><integer>4</integer>
<key>Library Folder Count</key><integer>1</integer>
```

## Track Table
```
"1"	"Another One Bites The Dust"	    "1"	"1"	"217103"	"100"	"55"
"2"	"Asche Zu Asche"	                "2"	"2"	"231810"	"100"	"79"
"3"	"Beauty School Dropout"	            "3"	"3"	"239960"	"100"	"48"
"4"	"Black Dog"	                        "4"	"1"	"296620"	"100"	"109"
"5"	"Bring The Boys Back Home"	        "5"	"1"	"87118"	    "100"	"33"
"6"	"Circles"	                        "6"	"6"	"355369"	"60"	"54"
"7"	"Comfortably Numb"	                "5"	"1"	"384130"	"100"	"36"
"8"	"Crazy Little Thing Called Love"	"1"	"1"	"163631"	"100"	"38"
"9"	"Electric Funeral"	                "9"	"9"	"293015"	"100"	"44"
"10" "Fat Bottomed Girls"	            "1"	"1"	"257515"	"100"	"38"
```