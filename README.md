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

Start Mongo DB
```
mongod
```

Start the server
```
node backend/app.js
```
