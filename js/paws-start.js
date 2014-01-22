var hospitalobj;
$(document).ready(function(){
   $('#hospital_code').bind('blur',function(){
        search_shopital();
   }) 
});

function search_shopital(){
    var hospital_code = $('#hospital_code').val();
    $.ajax({
        type: "POST",
        url: APIURL+"&action=searchhospital",
        crossDomain:true,
        data: {hospital_code:hospital_code},
        success: function(response){
            console.log(response);
            
            if(response.succ == 'success'){
                
                var sdata = response.data;
                console.log(sdata[0]);
                //localStorage.setItem('userdata',JSON.stringify(sdata[0]));
                hospitalobj = sdata;
                //changepage('paws-start.html');
                var html="";
                for(i=0;i<sdata.length;i++){
                    html+='<li class="menu"><a  placeholer="'+sdata[i].Hospital_id+'" title="'+i+'" class="noeffect" href="javascript:selectHospital('+i+')">';
                        html+='<img alt="music" src="thumbs/other.png" />';
                        html+='<span class="name">'+sdata[i].National_Hospital_Code+', '+sdata[i].Location+'</span>';
                        html+='<span class="arrow"></span></a>';
                    html+='</li>';
                }
                var j =0 ;
                $('#hospital_list li').each(function(){
                    if(j > 0){
                        $(this).remove();
                    }
                    j++;
                })
                $('#hospital_list').append(html);
            }
            
        },
        error: function(error){
            console.log(error);
        },
        dataType: 'jsonp'
    });
    return false;
}

function selectHospital(id){
    if(typeof(hospitalobj[id]) != 'undefined'){
        localStorage.setItem('selectedHospitalID',hospitalobj[id].Hospital_id);
        localStorage.setItem('selectedHospitalCode',hospitalobj[id].National_Hospital_Code);
        changepage('patient.html');
    }
}
//patient.html