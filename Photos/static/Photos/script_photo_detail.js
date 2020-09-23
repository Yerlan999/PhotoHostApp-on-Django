$(document).ready(function(){
    console.log("Hi")
    $('h5.comment').click(function(){
        console.log($(this))
        var name = $(this).text()
        var nameLog = name.concat(",");

        $('textarea').eq(1).text(nameLog)
         $('textarea').focus()
    });



    $('#90').click(function(){

        $('img').first().toggleClass('flip')

    });

});


