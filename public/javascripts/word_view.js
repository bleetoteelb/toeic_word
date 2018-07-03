$(document).ready(function(){
	$.ajax({
		url:'/get_options',
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
		get_words();
	});
	
});

function check_word(number,count){
	if($('#row'+count).css('background-color') == "rgb(255, 255, 255)"){
		
		$('#row'+count).css('background-color',"#E0ECF8");
		parms = {};
		parms['number'] = number;
		parms['update'] = "plus";
		$('#selector .active :input').each(function(){
			parms['selector'] = $(this).attr('id');
		});

		$.ajax({
			url:'/update_word',
			type:'post',
			data: parms,
			success: function(result){
				if(result){
				} else {
					alert("Fail");
				}
			},
			error:function(e){
				alert(e.responseText);
			}
    	});

	}else{
		
		$('#row'+count).css('background-color',"#ffffff");
		parms = {};
		parms['number'] = number;
		parms['update'] = "minus";
		$('#selector .active :input').each(function(){
			parms['selector'] = $(this).attr('id');
		});

		$.ajax({
			url:'/update_word',
			type:'post',
			data: parms,
			success: function(result){
				if(result){
				} else {
					alert("Fail");
				}
			},
			error:function(e){
				alert(e.responseText);
			}
    	});

	
	}
}

function get_words(){
	parms = {};
	parms['chapter'] = $('#sel10').val();
	$.ajax({
		url:'/get_word',
		type:'POST',
		data: parms,
		success:function(result){
			generate_word(result);
		},error:function(e){
			alert(e.responseText);
		}
	})
}

function generate_word(result){
	$('#word').empty();
	var draw = '<table class="test_table">';
	var count = 0;
	var selector =""
	$('#selector .active :input').each(function(){
		selector = $(this).attr('id');
	});
	result.forEach(function(v){
		count++;
		if(selector == "option1") {
			if(v.all_count == "0"){
				draw += '<tr id="row'+count+'" class="white_table">';
			} else if(v.all_count == "1"){
				draw += '<tr id="row'+count+'" class="select_table1">';
			} else if(v.all_count == "2"){
				draw += '<tr id="row'+count+'" class="select_table2">';
			} else if(v.all_count == "3"){
				draw += '<tr id="row'+count+'" class="select_table3">';
			} else if(v.all_count == "4"){
				draw += '<tr id="row'+count+'" class="select_table4">';
			} else if(v.all_count == "5"){
				draw += '<tr id="row'+count+'" class="select_table5">';
			} else{
				draw += '<tr id="row'+count+'" class="select_table6">';
			}



			draw += '<td>'+count+'</td><td id="word'+count+'">'+v.english+'</td><td>'+v.meaning+'</td><td>'+img_US+count+')" />'+img_EU+count+')" />'+img_IN+count+')" />'+img_AU+count+')" />'+'</td>';

			if(v.all_count !="0"){
				draw += '<td>'+v.all_count+'</td></tr>'
			} else {
				draw += '<td></td></tr>'
			}
		} else {
			if(v[selector] == "1"){
				draw += '<tr class="select_table1" ';
			} else {
				draw += '<tr class="white_table" ';
			}
			draw += 'id="row'+count+'" onclick="check_word('+v.number+','+count+')" ><td>'+count+'</td><td id="word'+count+'">'+v.english+'</td><td>'+v.meaning+'</td><td>'+img_US+count+')" />'+img_EU+count+')" />'+img_IN+count+')" />'+img_AU+count+')" />'+'</td></tr>';
		}
	});
	draw += '</table>'
	$('#word').append(draw);
}

function generate_list(result){
	$('#sel10').empty();
	result.sort(function(a,b){ return a['chapter']-b['chapter']; });
	result.forEach(function(v){
		var option = $('<option value'+v.chapter+'>'+v.chapter+'</option>');
		$('#sel10').append(option);
	});
}
