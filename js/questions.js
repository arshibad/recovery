var paitentobj;
$(document).ready(function(){
   $('.questionsubmit').bind('click',function(){
      var id = $(this).attr('placeholder');
      switch(id){
         case "1":
         case "2":
         case "4":
         case "5":
         case "7":
         case "8":      
            var answer = $('#q'+id+'_ans').val();
            if(answer == ''){
               alert("Please select answer!");
               return false;
            }
            storeQuestionAnswer(id,answer)   
            break;
         
         case "3":
         case "6":
         case "9":   
            var answer = $('input[type="radio"]:checked').val();
            if(typeof(answer) == 'undefined'){
               alert("Please choose answer!");
               return false;
            }
            storeQuestionAnswer(id,answer)   
            break;
         
      }
      return false;
   }) 
});

function storeQuestionAnswer(id,answer){
        console.log(id+"==>"+answer);
        //return false;   
        localStorage.setItem('question_'+id+'',answer);
        if(id < 9){
         var nextpage = parseInt(id)+1;
         changepage('page'+nextpage+'.html'); 
        }else{
          submitAnswers();
        }
        
}

function submitAnswers(){
    var datas = {};
    var userdata = JSON.parse(localStorage.getItem('userdata'));
    
    datas.Personnel_Number = userdata.Personnel_Number;
    datas.Personnel_Surname = userdata.Personnel_Surname;
    datas.National_Hospital_Code = localStorage.getItem('selectedHospitalCode');
    datas.Patient_Number = localStorage.getItem('selectedPatientCode');
    datas.Patient_Surname = localStorage.getItem('selectedPatientSurname');
    datas.Question_1 = localStorage.getItem('question_1');
    datas.Question_2 = localStorage.getItem('question_2');
    datas.Question_3 = localStorage.getItem('question_3');
    datas.Question_4 = localStorage.getItem('question_4');
    datas.Question_5 = localStorage.getItem('question_5');
    datas.Question_6 = localStorage.getItem('question_6');
    datas.Question_7 = localStorage.getItem('question_7');
    datas.Question_8 = localStorage.getItem('question_8');
    datas.Question_9 = localStorage.getItem('question_9');
    
    //console.log(datas);return false;
    $.ajax({
        type: "POST",
        url: APIURL+"&action=submitquestions",
        crossDomain:true,
        data: {postdata:datas},
        success: function(response){
            console.log(response);
            
            if(response.succ == 'success'){
                
                var sdata = response.data;
                console.log(sdata[0]);
                //localStorage.setItem('userdata',JSON.stringify(sdata[0]));
                
                changepage('page10.html');
            }
            
        },
        error: function(error){
            console.log(error);
        },
        dataType: 'jsonp'
    });
    return false;
}
//patient.html