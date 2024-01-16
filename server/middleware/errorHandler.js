
const constants = require("../contants");

const errorHandler = (err, req, res, next) => {
   const statusCode = res.statusCode ? res.statusCode : 500;
   
   switch (statusCode) {
        case constants.VALIDATION_ERR:
                res.json(errObject("Validation Failed", err));
            break;

        case constants.NOT_FOUND: 
                res.json(errObject("Not Found", err));
            break;

        case constants.UNAUTHORIZED: 
                res.json(errObject("Unauthrorized", err));
            break;

        case constants.FORBIDDEN: 
            res.json(errObject("Forbidden", err));
            break;

        case constants.SERVER_ERR: 
            res.json(errObject("Forbidden", err));
            break;
    
        default:
            console.log("No Error, All good!")
            break;
   }
    

}

function errObject(title, err){
     return  { 
        title: title,
        message: err.message, 
        stackTrace: process.env.NODE_ENV === "production" ? null : err.stack
    }
}

module.exports = errorHandler





