$(document).ready(function(){


    $('#spinBut').click(function(){
    var files = $('#inn').val();
        if(files !== ''){
            $('#spin').removeAttr('hidden');
        }
    });

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
        return template;
    }

    $('.loadMoreButton').click(function(e){

        e.preventDefault()
        let what_year = $(this).val();

        $.ajax({
            type: 'GET',
            url: 'next-photos/',
            data: {next: what_year},
            success: function(response){

                var what_year = response['what_year']

                var wholeYearSet_Photos
                var wholeYear_Module
                var row_FirstTag = `<div class="row">`
                var row_LastTag = `</div>`


                if (what_year == 'freshman'){

                    var header_of_Year = `
                    <div class="card mt-5 mb-4 p-0 shadow" style="background-color:#bfd200;position:sticky;top:50px;z-index:2;">
                        <div class="card-body p-1">
                          <h1 class="pl-4 mt-2" style="color:#fff;">Первый Курс</h1>
                        </div>
                      </div>
                `
                }
                if (what_year == 'sophomore'){

                    var header_of_Year = `
                    <div class="card mt-5 mb-4 p-0 shadow" style="background-color:#bfd200;position:sticky;top:50px;z-index:2;">
                        <div class="card-body p-1">
                          <h1 class="pl-4 mt-2" style="color:#fff;">Второй Курс</h1>
                        </div>
                      </div>
                `
                }
                if (what_year == 'junior'){

                    var header_of_Year = `
                    <div class="card mt-5 mb-4 p-0 shadow" style="background-color:#bfd200;position:sticky;top:50px;z-index:2;">
                        <div class="card-body p-1">
                          <h1 class="pl-4 mt-2" style="color:#fff;">Третий Курс</h1>
                        </div>
                      </div>
                `
                }
                if (what_year == 'senior'){

                    var header_of_Year = `
                    <div class="card mt-5 mb-4 p-0 shadow" style="background-color:#bfd200;position:sticky;top:50px;z-index:2;">
                        <div class="card-body p-1">
                          <h1 class="pl-4 mt-2" style="color:#fff;">Четвертый Курс</h1>
                        </div>
                      </div>
                `
                }
                if (what_year == 'post_graduate'){

                    var header_of_Year = `
                    <div class="card mt-5 mb-4 p-0 shadow" style="background-color:#bfd200;position:sticky;top:50px;z-index:2;">
                        <div class="card-body p-1">
                          <h1 class="pl-4 mt-2" style="color:#fff;">После Выпуска</h1>
                        </div>
                      </div>
                `
                }
                if (what_year == 'with_no_meta'){

                    var header_of_Year = `
                    <div class="card mt-5 mb-4 p-0 shadow" style="background-color:#bfd200;position:sticky;top:50px;z-index:2;">
                        <div class="card-body p-1">
                          <h1 class="pl-4 mt-2" style="color:#fff;">Фотки без даты</h1>
                        </div>
                      </div>
                `
                }


                var photos_array = $.parseJSON(response['requested_year'])

                if (photos_array.length == 0){

                    wholeYearSet_Photos = `
                    <div class="d-flex col-lg-4 col-sm-6 mb-4">
                        <div class="justify-content-center">
                             <h1 class="text-muted">Пока пусто</h1>
                        </div>
                    </div>
                    `

                }
                else{

                    for (photo of photos_array){

                        let photo_url = '/media/' + photo['fields']['image']
                        let desctiption = photo['fields']['description']
                        let title = photo['fields']['title']
                        let photo_id = photo['pk']

                        let toPaste = photo_div_creator(photo_url, title, desctiption, photo_id)
                        if (toPaste !== undefined){
                            wholeYearSet_Photos += toPaste
                    }
                }
                }



                wholeYear_Module = header_of_Year + row_FirstTag + wholeYearSet_Photos + row_LastTag + '<br><br>'

                var output = wholeYear_Module.replace(/undefined/g, "");

                if (what_year == 'freshman'){
                    $('#loadMoreButtonFreshman').hide();
                    $('#loadMoreButtonFreshman').after(output)

                }
                if (what_year == 'sophomore'){
                    $('#loadMoreButtonSophomore').hide();
                    $('#loadMoreButtonSophomore').after(output)

                }
                if (what_year == 'junior'){
                    $('#loadMoreButtonJunior').hide();
                    $('#loadMoreButtonJunior').after(output)

                }
                if (what_year == 'senior'){
                    $('#loadMoreButtonSenior').hide();
                    $('#loadMoreButtonSenior').after(output)

                }
                if (what_year == 'post_graduate'){
                    $('#loadMoreButtonPost_graduate').hide();
                    $('#loadMoreButtonPost_graduate').after(output)
                }

                if (what_year == 'with_no_meta'){
                    $('#loadMoreButtonWithNoMeta').hide();
                    $('#loadMoreButtonWithNoMeta').after(output)
                }



            },
            error: function (response) {
                console.log(response);
            }
        });
    });
});
