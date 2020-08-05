# URL Shortener
## Whats used 
| Languages Usage | Package Manager | Packages | 
| --------------- | --------- | ------- |
|  JS             | Node      |   "body-parser": "^1.17.2", "express": "^4.15.3", "mongoose": "^4.11.3",  "mongoose-unique-validator": "*", "pug": "^2.0.0-rc.2", "shortid": "*" |


## User Stories

- I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
- If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.
- When I visit that shortened URL, it will redirect me to my original link.