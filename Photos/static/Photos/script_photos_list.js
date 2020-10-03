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


    // function photo_div_creator(image_url, title, description, photo_pk, comments_count){

    //     let template = `

    //     <div class="col-lg-4 col-sm-6 mb-4">
    //         <div class="card h-100 boxShad">
    //           <a href="{% url 'photo-detail' photo.pk %}"><img id="Test01" class="card-img-top" src="` + image_url + `" alt=""></a>
    //           <div class="card-body">
    //             <h4 class="card-title">
    //               <a href="{% url 'photo-detail' photo.pk %}">` + title + `</a>
    //             </h4>
    //             <p class="card-text">` + description + `</p>
    //             <p class="article-content border-top mb-0"><a href="{% url 'photo-detail' photo.pk %}">Комментарии: ` + comments_count + `</a></p>

    //           </div>
    //         </div>
    //       </div>

    //     `
    //     let ready_template = template.replace('photo.pk', photo_pk)

    //     return ready_template;
    // }
    $('#loadMoreButton').click(function(){
        console.log('Loaded');
        $.ajax({
            type: 'GET',
            url: 'next-photos/',
            data: {next: 'Sophomore Year'},
            success: function(response){

                // var photos_array = $.parseJSON(response['sophomore'])[0]
                // var comments_count_list = $.parseJSON(response['comments_count'])


                // let photo_url = '/media/' + photos_array['fields']['image']
                // let desctiption = photos_array['fields']['description']
                // let title = photos_array['fields']['title']
                // let photo_id = photos_array['pk']
                // let comments_count = comments_count_list
                // let toPaste = photo_div_creator(photo_url, title, desctiption, photo_id, comments_count)
                // console.log(photo_url)
                $('#loadMoreButton').after(
                    "{% include 'Photos/test.html' %}"
                    )


            },
            error: function (response) {
                alert('Error!');
            }
        })
    })

});



