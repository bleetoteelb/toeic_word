let AWS = require('aws-sdk');
let fs = require('fs');
var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var async = require('async');
var credential = require('./credential.js');
var connection = mysql.createConnection(credential.forconnection());

var keys = credential.ap();

AWS.config.accessKeyId = keys['accessKeyId'];
AWS.config.secretAccessKey = keys['secretAccessKey'];
AWS.config.region = keys['region'];

router.post('/get_audio',function(req,res){
	var text = req.body.text;
	var language = req.body.language;
	let params = {
    	'Text': text,
    	'OutputFormat': 'mp3',
		'TextType': 'text',
    	'VoiceId': language
	}
	async.waterfall([
		function(callback){
			var find_query = "select count from count where name='audio'";
			connection.query(find_query,function(err,result1){
				if(err) console.log(err);
				var update_query = "update count set count=count+1 where name='audio'";	
				connection.query(update_query,function(err,result2){
					if(err) console.log(err);
					callback(null,Number(result1[0]['count'])+1);
				});
			});
		},
		function(number,callback){
			var file_name = number.toString()+".mp3";
			let polly = new AWS.Polly();
			polly.synthesizeSpeech(params,function(err,data){
				if(err) console.log(err);
				else {
					fs.writeFile("../public/audio/"+file_name,data.AudioStream,function(err){
						if(err) console.log('error saving file ',err);
						callback(null,number);
					});
				}
			});
		}
	], function (err,number){
		res.json(number);
	});
});

module.exports = router;
