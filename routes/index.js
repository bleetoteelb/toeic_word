var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var async = require('async');

var credential = require('./credential.js');

var connection = mysql.createConnection(credential.forconnection());

/* GET home page. */
router.get('/', function(req, res, next) {
  var sess = req.session;
  res.render('index', { 
	title: '토익900 가즈아!' 
  });
});

router.post('/checking',function(req,res){
	if(req.body.password == '8888'){
		res.redirect('/admin_page');
	}else{
		res.send('<script type="text/javascript">alert("wrong");</script>');
 	}
});

router.get('/get_options',function(req,res){
	var query = connection.query('select chapter from words group by chapter',function(err,result){
		res.send(result.sort());
	});
});

router.get('/get_test_list',function(req,res){
	var query = connection.query('select show_name from test group by show_name',function(err,result){
		if (err) console.log(err);
		res.send(result);
	});
});

router.get('/get_penalty',function(req,res){
	var query = connection.query('select * from penalty',function(err,result){
		if (err) console.log(err);
		res.send(result);
	});
});

router.post('/get_test_word',function(req,res){
	var find_query = 'select * from test where show_name="'+req.body["show_name"]+'"';
	connection.query(find_query,function(err,result){
		res.send(result);
	});
});

router.post('/get_word',function(req,res){
	var find_query = 'select * from words where chapter="'+req.body["chapter"]+'"';
	connection.query(find_query,function(err,result){
		res.send(result);
	});
});

router.post('/get_search_result',function(req,res){
	var find_query = 'select * from words where english like"%'+req.body["search"]+'%" and not chapter like "%추가%"';
	connection.query(find_query,function(err,result){
		res.send(result);
	});
});



router.post('/remove_test',function(req,res){
	var find_query = 'delete from test where show_name="'+req.body["show_name"]+'"';
	connection.query(find_query,function(err,result){
		res.send(result);
	});
});

router.post('/selected_word',function(req,res){
	var find_query = 'select * from words where all_count>1 and (chapter="'+req.body["sel1"]+'" or chapter="'+req.body["sel2"]+'" or chapter="'+req.body["sel3"]+'" or chapter="'+req.body["sel4"]+'")';
	console.log(find_query);
	connection.query(find_query,function(err,result){
		res.send(result);
	});
});


router.post('/making2',function(req,res){

	var name = req.body['name'];
	var maker = req.body['maker'];
	var d = new Date();
	var time = (d.getMonth()+1).toString()+'-'+(d.getDate()).toString();
	time += ' '+(d.getHours()).toString()+':'+(d.getMinutes()).toString();
	time += ':'+(d.getSeconds()).toString();

	function get_random(result){
		var size = result.length;
		for (var i=0;i<size-1;i++){
			var j = i+Math.floor(Math.random()*(size-i));

			var temp = result[j];
			result[j] = result[i];
			result[i] = temp;
		}
		return result;
	}

	
	async.waterfall([
		function(callback){
			var find_query = 'select count from count where name="test"';
			connection.query(find_query,function(err,result){
				var number = Number(result[0]['count']);
				var next_number = number+1;
				var update_query = 'update count set count='+next_number+' where name="test"';
				connection.query(update_query,function(err,result2){
					callback(null,number);
				});
			});
		},
		function(number,callback){
			var random_selected_word = [];
			var find_query = 'select * from words where all_count>1 and (chapter="'+req.body["sel1"]+'" or chapter="'+req.body["sel2"]+'" or chapter="'+req.body["sel3"]+'" or chapter="'+req.body["sel4"]+'")';
			connection.query(find_query,function(err,result){
				var first = get_random(result);
				callback(null,first,number);
			});
		},
		function(first,number,callback){
			var size = first.length;
			var insert_query = "insert into test (name,english,meaning,time,maker,test_num,show_name) values";
			for (var i=0;i<size;i++){
				var show_name = number.toString()+'. '+ name;
				insert_query += " ('"+name+"','"+first[i]['english']+"','"+first[i]['meaning']+"','"+time+"','"+maker+"',"+Number(number)+",'"+show_name+"')";
				if (i!=size-1) insert_query += " , "

			}

			connection.query(insert_query,function(err,result){
				if(err){
					console.log(err);
					res.send('Fail');
				}
				callback(null,'Finish');
			});
		}
	], function (err, result) {
		res.send('success');
	});
});

router.post('/making',function(req,res){

	var name = req.body['name'];
	var maker = req.body['maker'];
	var d = new Date();
	var time = (d.getMonth()+1).toString()+'-'+(d.getDate()).toString();
	time += ' '+(d.getHours()).toString()+':'+(d.getMinutes()).toString();
	time += ':'+(d.getSeconds()).toString();

	function get_random(result,number){
		var return_result = [];
		var size = result.length;
		for (var i=0;i<number;i++){
			var r = Math.floor(Math.random()*10000)%size;
			return_result.push(result[r]);
			result[r] = result[--size];
		}
		return return_result;
	}

	
	async.waterfall([
		function(callback){
			var find_query = 'select count from count where name="test"';
			connection.query(find_query,function(err,result){
				var number = Number(result[0]['count']);
				var next_number = number+1;
				var update_query = 'update count set count='+next_number+' where name="test"';
				connection.query(update_query,function(err,result2){
					callback(null,number);
				});
			});
		},
		function(number,callback){
			var random_selected_word = [];
			var find_query = 'select * from words where chapter="'+req.body["sel1"]+'"';
			connection.query(find_query,function(err,result){
				var first = get_random(result,req.body['sel4']);
				callback(null,first,number);
			});

		},
		function(first,number,callback){
			var find_query = 'select * from words where chapter="'+req.body["sel2"]+'"';
			connection.query(find_query,function(err,result){
				var second = get_random(result,req.body['sel5']);
				callback(null,first.concat(second),number);
			});
		},
		function(second,number,callback){
			var find_query = 'select * from words where chapter="'+req.body["sel3"]+'"';
			connection.query(find_query,function(err,result){
				var third = get_random(result,req.body['sel6']);
				callback(null,second.concat(third),number);
			});
		},
		function(third,number,callback){
			var size = third.length;
			var insert_query = "insert into test (name,english,meaning,time,maker,test_num,show_name) values";
			for (var i=0;i<size;i++){
				var show_name = number.toString()+'. '+ name;
				insert_query += " ('"+name+"','"+third[i]['english']+"','"+third[i]['meaning']+"','"+time+"','"+maker+"',"+Number(number)+",'"+show_name+"')";
				if (i!=size-1) insert_query += " , "

			}

			connection.query(insert_query,function(err,result){
				if(err){
					console.log(err);
					res.send('Fail');
				}
				callback(null,'Finish');
			});
		}
	], function (err, result) {
		res.send('success');
	});
});
router.post('/update_penalty',function(req,res){
	var number = req.body['number'];

	var query = "update penalty set paid = paid*(-1) where number="+number;
	connection.query(query,function(err,result){
		if(err) console.log(err);
		res.send('seccess');
	});
});

router.post('/update_word',function(req,res){
	var number = req.body['number'];
	var selector = req.body['selector'];
	var query = "";
	if (req.body['update'] == "plus"){
		query = "update words set all_count=all_count+1,"+selector+"="+selector+"+1 where number="+number;
	}else {
		query = "update words set all_count=all_count-1,"+selector+"="+selector+"-1 where number="+number;
	}
	connection.query(query,function(err,result){
		if(err) console.log(err);
		res.send('seccess');
	});
});

router.post('/register_word',function(req,res){

	var values = req.body;	
	var size = (Object.keys(values).length - 1)/2;
	var count=0;
	var query = "insert into words (english,meaning,chapter) values"

	for(var i=0;i<size;i++){
		var name_e = 'word'+i+'[english]';
		var name_m = 'word'+i+'[meaning]';
		query += "('"+values[name_e]+"','"+values[name_m]+"','"+values['chapter']+"')";
		if(i != size-1) query += " , ";
	}
	connection.query(query,function(err,result){
		if(err){
			console.log(err);
			res.send('Fail');
		}
		res.send('success');
	});
});

router.post('/register_penalty',function(req,res){

    var values = req.body;
	var p_name = req.body['p_name'];
	var p_date = req.body['p_date'];	

	async.waterfall([
        function(callback){
			var query1="select count from count where name='penalty'";
			connection.query(query1,function(err,result1){
				if(err) console.log(err);

				var count = Number(result1[0]['count'])+1;
				var query2 = "update count set count=count+1 where name='penalty'";
				connection.query(query2,function(err,result2){
					if(err) console.log(err);
					callback(null,count);
				});
			});
		}
	],function(err,count){
		var query3 = "insert into penalty (name,date,number) values('"+p_name+"','"+p_date+"','"+count+"')";
		connection.query(query3,function(err,result3){
			if(err)	console.log(err);
			res.send('success');
		});	

	});
	
});

module.exports = router;
