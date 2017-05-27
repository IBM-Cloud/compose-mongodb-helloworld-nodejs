//var http = require('http');
var express = require('express');
var mongoose = require('mongoose');
var Patient = require('./models/Patient');
var bodyParser = require('body-parser');
var busboyBodyParser = require('busboy-body-parser');
var Grid = require('gridfs-stream');
var fs = require("fs");
var app = express();

mongoose.connect('mongodb://localhost/Patient');

app.use(bodyParser.json());
app.use(busboyBodyParser({ limit: '5mb' }));
var db = mongoose.Connection;
Grid.mongo = mongoose.mongo;
mongoose.connection.db
var gfs = Grid(mongoose.mongo.Db, mongoose.mongo);




app.get('/api/patient', function (req, res) {
    Patient.getPatient(function (err, pat) {
        if (err)
            throw err;
        else
            res.send(pat);

    });
});

app.post('/api/patient', function (req, res) {
    var patient = req.body;
    Patient.addPatient(patient,function (err, pat) {
        if (err)
            throw err;
        else
            res.send(patient);

    });
});

app.post('/api/patient/img', function (req, res) {
    var part = req.files.file;
    var writeStream = gfs.createWriteStream({
        filename: 'img_' + part.name,
        mode: 'w',
        content_type: part.mimetype,
        readPreference: 'ReadPreference.PRIMARY'
    });
    writeStream.on('close', function (files) {
        return res.status(200).send({
            message: 'success',
            file: files
        })
    });
    writeStream.write(part.data);
    writeStream.end();
});


app.put('/api/patient', function (req, res) {
    var patient = req.body;
    Patient.modifyPatient(patient, function (err, pat) {
        if (err)
            throw err;
        else
            res.send(patient);

    });
});
app.delete('/api/patient', function (req, res) {
    var patient = req.body;
    Patient.deletePatient(patient, function (err, pat) {
        if (err)
            throw err;
        else
            res.send(patient);

    });
});
app.get('/api/patient/:_id', function (req, res) {
    Patient.getPatientById(req.params._id, function (err, pat) {
        if (err)
            throw err;
        else
            res.send(pat);

    });
});

app.listen(3000);
