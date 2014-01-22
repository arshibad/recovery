var paitentobj;
$(document).ready(function(){
   $('#patient_code').bind('blur',function(){
        search_paitent();
   }) 
});

function search_paitent(){
    var patient_code = $('#patient_code').val();
    $.ajax({
        type: "POST",
        url: APIURL+"&action=searchpatient",
        crossDomain:true,
        data: {patient_code:patient_code},
        success: function(response){
            console.log(response);
            
            if(response.succ == 'success'){
                
                var sdata = response.data;
                console.log(sdata[0]);
                
                paitentobj = sdata;
                //changepage('paws-start.html');
                var html="";
                for(i=0;i<sdata.length;i++){
                    html+='<li class="menu"><a  placeholer="'+sdata[i].Patient_id+'" title="'+i+'" class="noeffect" href="javascript:selectPatient('+i+')">';
                        html+='<img alt="music" src="thumbs/other.png" />';
                        html+='<span class="name">'+sdata[i].Patient_Forename+', '+sdata[i].Patient_Surname+'</span>';
                        html+='<span class="arrow"></span></a>';
                    html+='</li>';
                }
                var j =0 ;
                $('#patient_list li').each(function(){
                    if(j > 0){
                        $(this).remove();
                    }
                    j++;
                })
                $('#patient_list').append(html);
            }
            
        },
        error: function(error){
            console.log(error);
        },
        dataType: 'jsonp'
    });
    return false;
}

function selectPatient(id){
    if(typeof(paitentobj[id]) != 'undefined'){
        localStorage.setItem('selectedPatientID',paitentobj[id].Patient_id);
        localStorage.setItem('selectedPatientCode',paitentobj[id].Patient_Number);
        localStorage.setItem('selectedPatientSurname',paitentobj[id].Patient_Surname);
        changepage('page1.html');
    }
}
//patient.html