//jshint esversion: 6, node: true

const db = require('../database/db');


module.exports.getAll = (req, res, next) => {
    res.send(
        db.get("judges").value()
    );
};


module.exports.add = (req, res, next) => {
    res.send(
        db.get("judges")
            .push(req.body)
            .last()
            .assign({ id: db.judgeId() })
            .write()
    );
};

module.exports.get = (req, res, next) => {
    res.send(
        db.get("judges")
            .find({ id: parseInt(req.params.id) })
            .value()
    );

};

module.exports.update = (req, res, next) => {
    res.send(
        db.get("judges")
            .find({ id: parseInt(req.params.id) })
            .assign(req.body)
            .write()
    );
};

module.exports.delete = (req, res, next) => {
    res.send(
        db.get("judges")
            .remove({ id: parseInt(req.params.id) })
            .write()
    );
};