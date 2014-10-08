ACM-Membership-System
=====================

http://students.cis.uab.edu/braden93/acm-admin/#/am-i-a-member

```
cd ACM-Membership-System
cp frontend/config.example frontend/config.json
cp backend/config.example backend/config.json
```

Edit `frontend/config.json` and `backend/config.json`
`frontend/config.json`
```
{
    "server": "SERVER_ADDRESS",
    "port": PORT_NUMBER,
    "clubLogo": "CLUB_IMAGE",
    "joinLink": "LINK_TO_JOIN"
}
```
`backend/config.json`
```
{
    "password": "LOGIN_PASSWORD",
    "email": "GMAIL_USERNAME",
    "emailpass": "GMAIL_PASSWORD",
    "port": PORT_TO_LISTEN,
    "mongo_server": "MONGO_SERVER",
    "mongo_port": MONGO_PORT
}
```


Install Mongo DB
```
apt-get install node mongodb
```

Install dependencies
```
npm install
bower install
```

Generate docs, annotate angular files, concatenate js files, and minify js files.
```
grunt
```

Start mongo and the server
```
grunt backend
```

Restart the server
```
grunt restart
```

You can also clean your environment this task
```
grunt clean
```
deletes annotated files, build files, and generated docs
