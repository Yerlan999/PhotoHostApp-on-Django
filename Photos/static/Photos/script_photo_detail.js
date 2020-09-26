$(document).ready(function(){

    try {
        var flag = $('div.alert-success').get(0).innerText
    }
    catch(TypeError) {
        var flag = undefined
    }

    if (flag === 'Комментарии к фотографии был успешно добавлен!'){
        $(window).scrollTop($('#commentForm').position().top)
    }



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


