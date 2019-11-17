//jshint esversion: 6, node: true

const db = require('../database/db');


module.exports.getAll = (req, res, next) => {
    res.send(
        db.get("classes").value()
    );
};


module.exports.add = (req, res, next) => {
    res.send(
        db.get("classes")
            .push(req.body)
            .last()
            .assign({ id: db.classId() })
            .write()
    );
};

module.exports.get = (req, res, next) => {
    res.send(
        db.get("classes")
            .find({ id: parseInt(req.params.id) })
            .value()
    );

};

module.exports.update = (req, res, next) => {
    res.send(
        db.get("classes")
            .find({ id: parseInt(req.params.id) })
            .assign(req.body)
            .write()
    );
};

module.exports.delete = (req, res, next) => {
    res.send(
        db.get("classes")
            .remove({ id: parseInt(req.params.id) })
            .write()
    );
};
