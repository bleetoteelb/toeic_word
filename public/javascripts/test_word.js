$(document).ready(function(){
	$('#start_button').click(function(){
		get_words();
	});
	
});

function get_words(){
	var parms = {};
	var selected = $('#sel10').val()
	var splited = selected.split('/');
	parms['sel1'] = splited[0];
	parms['sel2'] = splited[1];
	parms['sel3'] = splited[2];
	parms['sel4'] = splited[3];
	
	$.ajax({
		url:'/selected_word',
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
	result.forEach(function(v){
		count++;
		draw += '<tr>';
		draw += '<td>'+count+'</td><td id="word'+count+'">'+v.english+'</td><td>'+v.meaning+'</td>';

		draw += '<td>'+v.all_count+'</td></tr>'
	});
	draw += '</table>'
	$('#word').append(draw);
}
