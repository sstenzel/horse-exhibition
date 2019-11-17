//jshint esversion: 8, node: true


const db = require('../database/db');
const fetch = require('node-fetch');



module.exports = () => {
    fetchJudges();
    fetchClasses();
    fetchHorses();
};


const fetchJudges = () => {
    fetch('http://127.0.0.1:3000/judges', { method: "GET" })
        .then(response => {
            if (response.ok) {
                response.json().then(items => {
                    const dbItems = db.get('judges');
                    items.forEach(item => {
                        dbItems
                            .push(item)
                            .last()
                            .write();
                    });
                });
            } else {
                console.dir("Fetch error");
            }
        });
};


const fetchClasses = () => {
    fetch('http://127.0.0.1:3000/classes', { method: "GET" })
        .then(response => {
            if (response.ok) {
                response.json().then(items => {
                    let dbItems = db.get('classes');
                    items.forEach(item => {
                        item.id < 10 ? item.finished = true : item.finished = false;
                        dbItems
                            .push(item)
                            .last()
                            .write();
                    });
                });
            } else {
                console.dir("Fetch error");
            }
        });
};

const fetchHorses = () => {
    fetch('http://127.0.0.1:3000/horses', { method: "GET" })
        .then(response => {
            if (response.ok) {
                response.json().then(items => {
                    const dbItems = db.get('horses');
                    items.forEach(item => {
                        dbItems
                            .push(item)
                            .last()
                            .assign()
                            .write();
                    });
                });
            } else {
                console.dir("Fetch error");
            }
        });
};
