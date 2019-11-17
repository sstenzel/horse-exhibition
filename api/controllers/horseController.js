//jshint esversion: 6, node: true

const db = require('../database/db');


module.exports.getAll = (req, res, next) => {
    res.send(
        db.get("horses").value()
    );
};


module.exports.add = (req, res, next) => {
    res.send(
        db.get("horses")
            .push(req.body)
            .last()
            .assign({ id: db.horseId() })
            .write()
    );
};

module.exports.get = (req, res, next) => {
    res.send(
        db.get("horses")
            .find({ id: parseInt(req.params.id) })
            .value()
    );

};

module.exports.update = (req, res, next) => {
    res.send(
        db.get("horses")
            .find({ id: parseInt(req.params.id) })
            .assign(req.body)
            .write()
    );
};

module.exports.delete = (req, res, next) => {
    res.send(
        db.get("horses")
            .remove({ id: parseInt(req.params.id) })
            .write()
    );
};


module.exports.findByClass = (req, res, next) => {

    res.send(
        db.get("horses")
            .filter({ klasa: parseInt(req.params.id) })
            .value()
    );
};
