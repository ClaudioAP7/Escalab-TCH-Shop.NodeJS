const jwt = require('jsonwebtoken');

let isAuth = (request, response, next) => {
    let token = request.get('Authorization');

    jwt.verify(token, process.env.SEED, (error, decoded) => {
        if(error){
            error.statusCode = 401;
            next(error);
        }

        request.usuario = decoded;
        next();
    });
};

let isAdmin = (request, response, next) => {
    let user = request.user;

    if(user.role.toUpperCase() == 'ADMIN_ROLE'){
        next();
    }else {
        let error = new Error('Rol no valido.');
        error.statusCode = 401;
        next(error);
    }
};

module.exports = {
    isAuth,
    isAdmin
};