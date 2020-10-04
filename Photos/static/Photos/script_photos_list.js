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


    // ======================================   AJAX TRYING  ============================================


    function photo_div_creator(image_url, title, description, photo_pk, comments_count){

        let template = `
        <div class="row">
        <div class="col-lg-4 col-sm-6 mb-4">
              <div class="outer boxShad">
              <a style="text-decoration:none;" href="/photos/detail-photo/`+photo_pk+`">
                <div class="inner" style="background-image: url(`+image_url+`)" data-toggle="tooltip" data-placement="bottom" title="Комментарии: `+comments_count+`">
                  <span class="titled">`+title+`</span>
                </div>
              </a>
              </div>
          </div>
        </div>
        `
        let ready_template = template.replace('photo.pk', photo_pk)

        return ready_template;
    }
    $('#loadMoreButton').click(function(){
        console.log('Loaded');
        $.ajax({
            type: 'GET',
            url: 'next-photos/',
            data: {next: 'Sophomore Year'},
            success: function(response){
                console.log(response)
                var photos_array = $.parseJSON(response['sophomore'])[0]
                var comments_count_list = $.parseJSON(response['comments_count'])


                let photo_url = '/media/' + photos_array['fields']['image']
                let desctiption = photos_array['fields']['description']
                let title = photos_array['fields']['title']
                let photo_id = photos_array['pk']
                let comments_count = comments_count_list
                let toPaste = photo_div_creator(photo_url, title, desctiption, photo_id, comments_count)
                console.log(photo_url)
                $('#loadMoreButton').after(
                    toPaste
                    )


            },
            error: function (response) {
                alert('Error!');
            }
        })
    })

});



