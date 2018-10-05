var jwt = require('jsonwebtoken');
const secret = "sfgrtfrdfwytuyfg!87632334";
var auth = function (req, res, next) {
    //next();
    var token = req.headers["token"];
    var response = {
        'message': "Unauthorised Entry "
    };
    console.log("in auth ", token);
    jwt.verify(token, secret, function (err, decoded) {
        if (err) {
            console.log(err)
            return res.status(404).send(response);
        }
        else {
            console.log(decoded);
            req.user={
                decoded:decoded
            }
            next();
        }
    });
    //next();
}
module.exports = auth;