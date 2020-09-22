$(document).ready(function(){

    $('.comment').click(function(){
        let name = $(this).children().text()
        let nameLog = name.replace(":", ",");

        $('#com').attr('value', nameLog)
         $('#com').focus()
    });


    $('#90').click(function(){

        $('img').first().toggleClass('flip')

    });

});
