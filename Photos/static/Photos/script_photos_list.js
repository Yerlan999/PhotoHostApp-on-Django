$(document).ready(function(){

    $('[data-toggle="tooltip"]').tooltip()

    console.log("Hello")
    $('img').css({"opacity": '0.90', })

    $('img').hover(function() {

        $(this).animate({zoom: '110%'}, 'fast')
        $(this).animate({opacity: '1.0'}, 'fast')
    });

    $('img').mouseleave(function() {
        $(this).animate({zoom: '100%'}, 'fast')
        $(this).animate({opacity: '0.90'}, 'fast')
    });

    $('#spinBut').click(function(){
        let fe = $('#inn').val();
        if(fe !== ''){
            $('#spin').removeAttr('hidden');
        }
    });


    $(document).on('include_by_ajax_all_loaded', function() {
        console.log('Now all placeholders are loaded and replaced with content');
    });

    $('#photoButton').hover(function(){
        console.log('Hovered');
        var size = $('#hiddeninfo').text();
        var size = 'Свободно памяти: ' + size;
        $(this).prop('title', size);
    })


});



