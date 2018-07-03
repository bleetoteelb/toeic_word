$(document).ready(function(){
	$('#start_button').click(function(){
		search();	
	});
	$('#search').keyup(function(e){
		if(e.keyCode == 13) search();
	});
});

function search(){
	parms = {};
	parms['search'] = $('#search').val();
	$.ajax({
		url:'/get_search_result',
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
	$('#search_result').empty();
	var draw = '<span class="highlight">총 '+result.length+'개가 검색되었습니다.</span>';
	if (result.length == 0) {
		$('#search_result').append(draw);
		return;
	}
	draw += '<table class="test_table">';
	draw +='<tr><td><strong>챕터</strong></td><td><strong>영어</strong></td><td><strong>의미</strong></td></tr>';
	var count = 0;
	result.forEach(function(v){
		if( count%2==0 ){
			draw += '<tr><td>'+v.chapter+'</td><td>'+v.english+'</td><td>'+v.meaning+'</td</tr>';
		}else {
			draw += '<tr class="odd"><td>'+v.chapter+'</td><td>'+v.english+'</td><td>'+v.meaning+'</td></tr>';
		}
	});
	draw += '</table>'
	$('#search_result').append(draw);
}
