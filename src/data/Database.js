'use strict';

var mongodb = require('mongodb');
var config = require('../config');

module.exports = new Database();

function Database() {
	var self = this;

	var server = null;

	self.getServer = function (next) {
		if (!server) {
			mongodb.MongoClient.connect(config.mongoConnectionString, function (err, db) {
				if (err) {
					next(err, null);
				} else {

					server = {
						db: db,
						log: db.collection('log')
					};

					next(null, server);
				}
			});
		} else {
			next(null, server);
		}
	};
}