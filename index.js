const createApp = require('./app');
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3000;
createApp()
.then(app => app.listen(PORT, () => {console.log(`Our app is running on port ${ PORT }`)}))