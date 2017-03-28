var async = require('async');
var colors = require('colors');
var pg = require('pg');
var types = require('pg').types;
types.setTypeParser(1700, 'text', parseFloat);
var _ = require('underscore');
var pool = require('../../server.js').pool;

var fs = require("fs");
var dir = "/../../sql/queries/research_groups/";
var query_get_group = fs.readFileSync(__dirname + dir + 'get.sql', 'utf8').toString();
var query_delete_group = fs.readFileSync(__dirname + dir + 'delete.sql', 'utf8').toString();


// DELETE
exports.request = function(req, res) {

    async.waterfall([
        function(callback){
            // Connect to database
            pool.connect(function(err, client, done) {
                if(err) {
                    callback(err, 500);
                } else {
                    callback(null, client, done);
                }
            });
        },
        function(client, done, callback) {
            // TODO: Authentication
            callback(null, client, done);
        },
        function(client, done, callback) {
            // Database query
            client.query(query_get_group, [
                req.params.group_id
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    // Check if group exists
                    if (result.rows.length === 0) {
                        callback(new Error("Research Group not found"), 404);
                    } else {
                        callback(null, client, done, result.rows[0]);
                    }
                }
            });
        },
        function(client, done, group, callback) {
            if(document.status === 0 || document.status === 1){
                callback(null, client, done, document);
            } else {
                callback(new Error("Research Group cannot be deleted", 423));
            }
        },
        function(client, done, group, callback) {
            // Database query
            client.query(query_delete_group, [
                req.params.group_id
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    callback(null, 204, null);
                }
            });
        }
    ], function(err, code, result) {
        if(err){
            console.error(colors.red(err));
            res.status(code).send(err.message);
        } else {
            res.status(code).send();
        }
    });
};
