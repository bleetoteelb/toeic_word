var count = 0;
var word_list;
$(document).ready(function(){
	$('#regist_info').hide();
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
		parms = {};
		parms['chapter'] = $('#sel10').val();
		$.ajax({
			url:'/get_word',
			type:'POST',
			data: parms,
			success:function(result){
				word_list = result;
				generate_word(result);
			},error:function(e){
				alert(e.responseText);
			}
		})
	});
/*	
	$('.checking').on('click',function(){
		console.log("hello");
	});
*/
	$('#regist_button').click(function(){
		parms = {};
		parms['chapter'] = $('#chapter').val();
		var numbering = 0;
		for(var k=1;k<count+1;k++){
			if($('#check'+k).is(':checked')){
				var name = 'word'+numbering;
				parms[name] = {'english':word_list[k-1]['english'],'meaning':word_list[k-1]['meaning']};
				numbering++;
			}
		}

		$.ajax({
			url:'/register_word',
			type:'POST',
			data: parms,
			success:function(result){
				window.location='/make_review';
			},error:function(e){
				alert(e.responseText);
			}
		})
	});
});

function generate_word(result){
	$('#word').empty();
	var draw = '<table class="test_table">';
	count = 0;
	result.forEach(function(v){
		count++;
		if( count%2==0 ){
			draw += '<tr ><td>'+count.toString()+'</td><td>'+v.english+'</td><td>'+v.meaning+'</td><td><input class="checking" type="checkbox" id="check'+count+'"></td></tr>';
		}else {
			draw += '<tr class="odd"><td>'+count.toString()+'</td><td>'+v.english+'</td><td>'+v.meaning+'</td><td><input class="checking" type="checkbox" id="check'+count+'"></td></tr>';
		}
	});
	draw += '</table></br></br>';
	$('#word').append(draw);
	$('#regist_info').show();
}

function generate_list(result){
	$('#sel10').empty();
	result.forEach(function(v){
		var option = $('<option value'+v.chapter+'>'+v.chapter+'</option>');
		$('#sel10').append(option);
	});
}
