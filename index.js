function SubForm (){
    $.ajax({
        url:'https://api.apispreadsheets.com/data/bO17CLXBbp6QdAG0/',
        type:'post',
        data:$("#myForm").serializeArray(),
        success: function(){
          alert("Form Data Submitted :)")
        },
        error: function(){
          alert("There was an error :(")
        }
    });
}