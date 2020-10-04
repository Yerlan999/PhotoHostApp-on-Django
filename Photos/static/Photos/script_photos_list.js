$(document).ready(function(){

    console.log("Works")

    $('#spinBut').click(function(){
    var files = $('#inn').val();
        if(files !== ''){
            $('#spin').removeAttr('hidden');
        }
    });

    $('#photoButton').hover(function(){
        console.log('Hovered');
        var size = $('#hiddeninfo').text();
        var size = 'Свободно памяти: ' + size;
        $(this).prop('title', size);
    })


    // ======================================   AJAX TRYING  ============================================


    function photo_div_creator(image_url, title, description, photo_pk){

        let template = `

        <div class="col-lg-4 col-sm-6 mb-4">
              <div data-tooltip-text="`+description+`" class="outer boxShad">
              <a style="text-decoration:none;" href="/photos/detail-photo/`+photo_pk+`">
                <div class="inner" style="background-image: url(`+image_url+`)">
                  <span class="titled">`+title+`</span>
                </div>
              </a>
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

                var wholeYearSet_Photos
                var wholeYear_Module
                var row_FirstTag = `<div class="row">`
                var row_LastTag = `</div>`

                var header_of_Year = `
                    <div class="card mt-5 mb-4 p-0 shadow" style="background-color:#bfd200;position:sticky;top:50px;z-index:5;">
                        <div class="card-body p-1">
                          <h1 class="pl-4" style="color:#fff;">После Выпуска</h1>
                        </div>
                    </div>
                `

                var photos_array = $.parseJSON(response['sophomore'])
                console.log(photos_array)
                for (photo of photos_array){
                    console.log(photo)
                    let photo_url = '/media/' + photo['fields']['image']
                    let desctiption = photo['fields']['description']
                    let title = photo['fields']['title']
                    let photo_id = photo['pk']

                    let toPaste = photo_div_creator(photo_url, title, desctiption, photo_id)
                    if (toPaste !== undefined){
                        wholeYearSet_Photos += toPaste
                    }
                }

                wholeYear_Module = header_of_Year + row_FirstTag + wholeYearSet_Photos + row_LastTag + '<br><br>'

                var output = wholeYear_Module.replace(/undefined/g, "");
                $('#loadMoreButton').after(
                    output
                    )
            },
            error: function (response) {
                console.log(response);
            }
        });
    });
});
