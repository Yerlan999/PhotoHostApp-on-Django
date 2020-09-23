$(document).ready(function(){

    $('h5.comment').click(function(){

        var name = $(this).text()
        var nameLog = name.concat(",");

        $('textarea').eq(1).text(nameLog)
         $('textarea').focus()
    });

});
