# videoGallery
Video library management API in node.js

### How do I get set up? ###

Install yarn globally in your system if not already installed
```bash
npm install -g yarn
```

Run yarn install to install all dependencies
```bash
yarn install
```

Start by making a config.json file by copying the config.sample.json file
```bash
cp config.sample.json config.json
```
Edit the newly created config.json file with server specific credentials

Setup a database

Create a sequelize.config.json file by copying the sequelize.config.sample.json file
```bash
cp server/sequelize.config.sample.json server/sequelize.config.json
```
Replace the database credentials in the newly created sequelize.config.json file

Run migrations
```bash
node_modules/.bin/sequelize db:migrate
```

System level dependecies
* [ffmpeg](https://www.ffmpeg.org/download.html)
