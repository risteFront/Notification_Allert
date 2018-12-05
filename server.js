const express = require('express');

const path = require('path');
const morgan = require('morgan');
var cors = require('cors');
const bodyParser = require('body-parser');

// Import Mongoose
let mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;
//conect to mongodb
 mongoose.connect("mongodb://riste:rikiriki123@cluster0-shard-00-00-oswbv.mongodb.net:27017,cluster0-shard-00-01-oswbv.mongodb.net:27017,cluster0-shard-00-02-oswbv.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true");

//mongoose.connect('mongodb://localhost/dbnotification');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({origin: 'http://localhost:3000'}));

// API calls
const productAPi = require('./routes/api');
app.use('/product',productAPi)
app.use((req,res,next)=>{
    const error = new Error('Not Found');
    error.status(404);
    next(error);
})


//set header
// app.use((req,res,next)=>{
//     res.header('Access-Control-Allow-Origin',"*")
//     res.header('Access-Control-Allow-Header',
//     'Origin, X-Requested-With Content-Type, Accept, Authorization');
//     if(req.method =="OPTIONS"){
//         res.header('Access-Control-Allow-Method','PUT, POST, PATCH, GET, DELETE')
//         return res.status(200).json({});

//     }
// })

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    })
})
// app.get('/api/hello', (req, res) => {
//   res.send({ express: 'Hello From Express' });
// });

// app.post('/api/world', (req, res) => {
//   console.log(req.body);
//   res.send(
//     `I received your POST request. This is what you sent me: ${req.body.post}`,
//   );
// });

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));