$(document).ready(function(){
	$('#register_word').click(function(){
		var parms={};
		var chapter = $('#chapter').val()
		var english = ($('#english').val()).split('\n');
		var meaning = ($('#meaning').val()).split('\n');
		
		if(english.length != meaning.length){
			alert('두개 개수가 다름');
			return;
		}

		parms['chapter']=chapter;

		for(var i=0;i<english.length;i++){
			var name = 'word'+i;
			parms[name] = {'english':english[i],'meaning':meaning[i]};
		}

		
		$.ajax({
			url:'/register_word',
			type:'POST',
			data: parms,
			success:function(result){
				window.location="/admin_page";
			},error:function(e){
				alert(e.responseText);
			}
		});
	});	

	$('#register_penalty').click(function(){
		var parms={};
		
		parms['p_name']=$('#p_name').val();
		parms['p_date']=$('#p_date').val();

		$.ajax({
			url:'/register_penalty',
			type:'POST',
			data: parms,
			success:function(result){
				window.location="/admin_page";
			},error:function(e){
				alert(e.responseText);
			}
		});
	});	
});

