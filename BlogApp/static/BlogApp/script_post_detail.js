$(document).ready(function(){

    try {
        var flag = $('div.alert-success').get(0).innerText
    }
    catch(TypeError) {
      var flag = undefined
    }

    if (flag === 'Коммент был успешно добавлен!'){
        $(window).scrollTop($('#commentForm').position().top)
    }

    $('h5.comment').click(function(){

        var name = $(this).text()
        var nameLog = name.concat(",");

        $('textarea').eq(1).text(nameLog)
         $('textarea').focus()
    });


});
