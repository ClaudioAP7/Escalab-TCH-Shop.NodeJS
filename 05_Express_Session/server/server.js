//Third-Party Module
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const session = require('express-session');
//Local Module
const userRouter = require('./routers/user-router');
const productRouter = require('./routers/product-router');
const commentaryRouter = require('./routers/commentary-router');
const categoryRouter = require('./routers/category-router');
const loginRouter = require('./routers/login-router');
const cartRouter = require('./routers/cart-router');
const orderRouter = require('./routers/order-router');


console.log(`${ __dirname }`);
console.log(`${process.env.NODE_ENV}`);


if (process.env.NODE_ENV === 'development'){
  require('dotenv').config( { path: `${__dirname}/../.env.development`} );
}else{
  require('dotenv').config()
}




//Init Express
const app = express();

//Third-Party Middleware
app.use(cors({
  credentials: true,
  origin:true
}));
app.use(bodyParser.json());
app.use(fileUpload({
  limits: { fileSize: 1 * 1024 * 1024 },
  // abortOnLimit: true
}));

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
  httpOnly: false
}));

//Router
app.use('/api/v1/', userRouter );
app.use('/api/v1/', productRouter );
app.use('/api/v1/', commentaryRouter );
app.use('/api/v1/', categoryRouter );
app.use('/api/v1/', loginRouter );
app.use('/api/v1/', cartRouter );
app.use('/api/v1/', orderRouter );

//HandlerError Middleware
app.use((error, request, response, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;

  response.status(status).json({
    result: false,
    message: message,
    data: data
  });
});

console.log('URL_MONGO: ',process.env.URL_MONGO);
const URL_DATABASE = process.env.URL_MONGO;


mongoose.connect(URL_DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then( () => {
    //console.log('Mongo OK');
    app.listen(process.env.PORT, () => { 
        console.log('Server Ok');
    });
}).catch((error) => console.log(error) );