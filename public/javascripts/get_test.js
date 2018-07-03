$(document).ready(function(){
	$.ajax({
		url:'/get_test_list',
		type:'get',
		success: function(result){
			if(result){
				generate_list(result);
			} else {
				alert("Fail");
			}
		},
		error:function(e){
			alert(e.responseText);
		}
	});
	$('#start_button').click(function(){
		parms = {};
		parms['show_name'] = $('#sel8').val();
		$.ajax({
			url:'/get_test_word',
			type:'POST',
			data: parms,
			success:function(result){
				generate_word(result);
			},error:function(e){
				alert(e.responseText);
			}
		})
	});
	
	$('#delete_button').click(function(){

		if(!confirm("진짜  삭제할거?")){
			console.log('say no');
			return;
		}
		console.log('yes');

		parms = {};
		parms['show_name'] = $('#sel8').val();
		$.ajax({
			url:'/remove_test',
			type:'POST',
			data: parms,
			success:function(result){
				window.location="/test";
			},error:function(e){
				alert(e.responseText);
			}
		})
	});	
});

function generate_word(result){
	$('#test').empty();
	var draw = '<table class="test_table">';
	var count = 0;
	result.forEach(function(v){
		count++;
		if( count%2==0 ){
			draw += '<tr><td>'+count.toString()+'</td><td>'+v.english+'</td></tr>';
		}else {
			draw += '<tr class="odd"><td>'+count.toString()+'</td><td>'+v.english+'</td></tr>';
		}
		if(count%10==0){
			draw += '<tr class="blank_table"><td></td><td></td></tr>';
		}
	});
	draw += '</table>'
	$('#test').append(draw);
}

function generate_list(result){
	$('#sel8').empty();
	console.log(result);
	result.reverse();
	console.log(result);
	result.forEach(function(v){
		var option = $('<option value'+v.show_name+'>'+v.show_name+'</option>');
		$('#sel8').append(option);
	});
}
