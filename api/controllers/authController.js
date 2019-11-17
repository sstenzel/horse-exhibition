//jshint esversion: 6, node: true



module.exports.login = (req, res, next) => {
    res.send(
        req.body.login === "admin"
        && req.body.password === "haslo"
    );

};
