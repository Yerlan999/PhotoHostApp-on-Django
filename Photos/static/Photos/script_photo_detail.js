$(document).ready(function(){

    try {
        var flag = $('div.alert-success').get(0).innerText;
    }
    catch(TypeError) {
        var flag = undefined;
    }

    try {
        var flag2 = $('div.alert-info').get(0).innerText;
        var num = flag2.match(/[0-9]+/)[0];
        var com_num = '#comment' + num
    }
    catch(TypeError) {
        var flag2 = undefined;
    }




    if (flag === 'Комментарии к фотографии был успешно добавлен!'){
        $(window).scrollTop($('#commentForm').position().top);
    }

    if (flag2 === 'Комментарий был успешно обновлен!'){
        $(window).scrollTop($(com_num).position().top);
    }

    if (flag === 'Комментарий был успешно удален!'){
        $(window).scrollTop($('#commentForm').position().top);
    }


    console.log("Works");
    $('h5.comment').click(function(){

        var name = $(this)[0].innerText;
        var nameLog = name.concat(",");

        $('textarea').eq(-1).text(nameLog);
        $('textarea').focus();
    });



    $('#90').click(function(){

        $('img').first().toggleClass('flip')

    });

});


