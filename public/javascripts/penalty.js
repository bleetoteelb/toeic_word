$(document).ready(function(){
	$.ajax({
		url:'/get_penalty',
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
});

function clickmoney(v,paid,name_pos){
	parms = {};
	parms['number'] = v;
	$.ajax({
		url:'/update_penalty',
		type:'POST',
		data: parms,
		success:function(result){
			$('#img'+v).empty();

			var price = Number($('#total'+name_pos).text());
			var sum_remain = Number($('#sum_r').text());

			if(Number(paid)==-1){
				$('#img'+v).append('<img src="/images/money_high.png" height="28" width="28" onclick="clickmoney('+v+',1,'+name_pos+')" />');
				price -= 3000;
				sum_remain -= 3000;
			}else{
				$('#img'+v).append('<img src="/images/money_low.png" height="28" width="28" onclick="clickmoney('+v+',-1,'+name_pos+')" />');
				price += 3000;
				sum_remain += 3000;
			}
			$('#total'+name_pos).html(price);
			$('#sum_r').html(sum_remain);
			
		},error:function(e){
			alert(e.responseText);
		}
	})
}

function generate_list(result){
	$('#price_total').empty();
	$('#price_list').empty();
	names = ['박소환','박정기','한승우','김경택','이상엽','김태수'];
	prices = [0,0,0,0,0,0]
	remains = [0,0,0,0,0,0];
	var total_table = '<table class="test_table">';
	var list_table = '<table class="test_table">';
	
	list_table += '<tr class="table_title"><td>이름</td><td>금액</td><td>날짜</td><td>냈니?</td></tr>';
	result.forEach(function(v){
		var name_pos = names.indexOf(v.name);
		list_table += '<tr><td>'+v.name+'</td><td>'+v.price+'</td><td>'+v.date+'</td>';
		if(Number(v.paid) == -1) {
			list_table += '<td id="img'+v.number+'"><img src="/images/money_low.png" height="28" width="28" onclick="clickmoney('+v.number+',-1,'+name_pos+')" /></td></tr>'
			remains[name_pos] += v.price;
		}else {
			list_table += '<td id="img'+v.number+'"><img src="/images/money_high.png" height="28" width="28" onclick="clickmoney('+v.number+',1,'+name_pos+')" /></td></tr>'
		}
		prices[name_pos] += v.price;
	});
	
	var pos = 0;
	var sum = 0;
	var sum_r = 0;
	total_table += '<tr class="table_title"><td>이름</td><td>총액</td><td>잔액</td></tr>';

	names.forEach(function(v){
		total_table += '<tr><td>'+v+'</td><td>'+prices[pos]+'</td><td id="total'+pos+'">'+remains[pos]+'</td></tr>';
		sum += prices[pos];
		sum_r += remains[pos];
		pos++;
	});
	
	total_table += '<tr class="table_sum"><td>합계</td><td>'+sum+'</td><td id="sum_r">'+sum_r+'</td></tr>'
	
	list_table += '</table>'
	total_table += '</table>'
	$('#price_list').append(list_table);
	$('#price_total').append(total_table);
}
