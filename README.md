ACM-Membership-System
=====================

http://students.cis.uab.edu/braden93/acm-admin/#/am-i-a-member

```
cd ACM-Membership-System
cp frontend/config.example frontend/config.json
cp backend/config.example backend/config.json
```

Edit `frontend/config.json` and `backend/config.json`


Install dependencies
```
npm install
bower install
```

Install Mongo DB
```
apt-get install mongodb
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
