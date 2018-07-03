var img_US = '<img src="/images/US.JPG" height="20" width="20" onclick="speak_US(';
var img_EU = '<img src="/images/EU.JPG" height="20" width="20" onclick="speak_EU(';
var img_IN = '<img src="/images/IN.JPG" height="20" width="20" onclick="speak_IN(';
var img_AU = '<img src="/images/AU.JPG" height="20" width="20" onclick="speak_AU(';

function play_audio(ID,text){
    parms = {};
    parms['text'] = text;
    parms['language'] = ID;
    $.ajax({
        url:'/amazon/get_audio',
        type:'POST',
        data: parms,
        success:function(result){
            var x = $('#myAudio')[0];
            x.src = '/audio/'+result+'.mp3';
            x.load();
            x.play();
        },error:function(e){
            alert(e.responseText);
        }
    })
}

function speak_US(id){
	if(id == 0) play_audio('Joanna',$('#audio_text').val());
	else play_audio('Joanna',$('#word'+id).text()); 
}
function speak_EU(id){ 
	if(id == 0) play_audio('Emma',$('#audio_text').val()); 
	else play_audio('Emma',$('#word'+id).text()); 
}
function speak_IN(id){ 
	if(id == 0) play_audio('Aditi',$('#audio_text').val()); 
	else play_audio('Aditi',$('#word'+id).text()); 
}
function speak_AU(id){ 
	if(id == 0) play_audio('Nicole',$('#audio_text').val()); 
	else play_audio('Nicole',$('#word'+id).text()); 
}



