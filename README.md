# wx-manager

> web app for manage wechat image and article

### TODO

- clear history
- refresh access token
- error information tips
- error handle methods

### Functions

- upload multi images once
- remove image
- upload article

### Structure
```bash
├── README.md
├── images    # uploaded images
├── server    # server
└── web       # pages of web
```

### Start

```bash
npm run start
# or
node server/index.js
# or (need pm2 installed)
pm2 start server/index.js
```

open [http://localhost:8080/pages/aricle](http://localhost:8080/pages/aricle)

---

Only for study. [woolson](woolson.github.io) 2017.8.31
