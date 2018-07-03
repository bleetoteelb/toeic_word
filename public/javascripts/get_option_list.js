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
	$('#make_button').click(function(){
		var parms={};
		for(var i=1;i<5;i++){
			parms['sel'+i] = $('#sel'+i).val();
		}

		parms['name']=$('#test_name').val();
		parms['maker']=$('#maker_name').val();

		$.ajax({
			url:'/making2',
			type:'POST',
			data: parms,
			success:function(result){
				window.location="/";
			},error:function(e){
				alert(e.responseText);
			}
		})

	});	
});

function generate_list(result){
	for(var i=1;i<5;i++){
		$('#sel'+i).empty();
		result.sort(function(a,b){ return a['chapter']-b['chapter']; });	
		result.forEach(function(v){
			var option = $('<option value'+v.chapter+'>'+v.chapter+'</option>');
			$('#sel'+i).append(option);
		});
	}
}
