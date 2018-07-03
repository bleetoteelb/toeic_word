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
		parms['show_name'] = $('#sel9').val();
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
});

function generate_word(result){
	$('#test').empty();
	var draw = '<table class="test_table">';
	var count = 0;
	result.forEach(function(v){
		count++;
		if (count%2==0){
			draw += '<tr><td>'+count+'</td><td id="word'+count+'">'+v.english+'</td><td>'+v.meaning+'</td><td>'+img_US+count+')" />'+img_EU+count+')" />'+img_IN+count+')" />'+img_AU+count+')" />'+'</td></tr>';
		}else {
			draw += '<tr class="odd"><td>'+count+'</td><td id="word'+count+'">'+v.english+'</td><td>'+v.meaning+'</td><td>'+img_US+count+')" />'+img_EU+count+')" />'+img_IN+count+')" />'+img_AU+count+')" />'+'</td></tr>';
		}

		if (count%10==0){
			draw +='<tr class="blank_table"><td></td><td></td><td></td><td></td>';
		}
	});
	draw += '</table>'
	$('#test').append(draw);
}

function generate_list(result){
	$('#sel9').empty();
	result.reverse();
	result.forEach(function(v){
		var option = $('<option value'+v.show_name+'>'+v.show_name+'</option>');
		$('#sel9').append(option);
	});
}
