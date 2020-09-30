$(document).ready(function(){

    console.log("Hello")
    $('img').css({"opacity": '0.95', })

    $('img').hover(function() {
        $(this).animate({zoom: '101%'}, 'fast')
        $(this).animate({opacity: '1.0'}, 'fast')
    });

    $('img').mouseleave(function() {
        $(this).animate({zoom: '100%'}, 'fast')
        $(this).animate({opacity: '0.90'}, 'fast')
    });

    $('#spinBut').click(function(){
        let fe = $('#inn').val();
        if(fe !== ''){
            $('#spin').removeAttr('hidden')
        }
    });

});



