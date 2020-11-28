$(document).ready(function(){


    function sleep(milliseconds) {
      const date = Date.now();
      let currentDate = null;
      do {
        currentDate = Date.now();
      } while (currentDate - date < milliseconds);
    }



    $('#spinBut').click(function(){
    var files = $('#inn').val();
        if(files !== ''){
            $('#spin').removeAttr('hidden');
        }
    });

    // ======================================   AJAX TRYING  ============================================


    function photo_div_creator(image_url, title, description, photo_pk, delay){

        let template = `

        <div class="col-lg-4 col-sm-6 mb-4 popout" style="animation-delay:`+delay+`ms;opacity:1;">
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
                    var delay_count = 100
                    for (photo of photos_array){

                        let photo_url = '/media/' + photo['fields']['image']
                        let desctiption = photo['fields']['description']
                        let title = photo['fields']['title']
                        let photo_id = photo['pk']
                        delay_count = delay_count + 100
                        console.log(delay_count)

                        let toPaste = photo_div_creator(photo_url, title, desctiption, photo_id, delay_count)
                        if (toPaste !== undefined){
                            wholeYearSet_Photos += toPaste
                    }
                }
                }



                wholeYear_Module = header_of_Year + row_FirstTag + wholeYearSet_Photos + row_LastTag + '<br><br>'

                var output = wholeYear_Module.replace(/undefined/g, "");
                var check_empty = output.includes("Пока пусто")


                if (what_year == 'freshman'){
                    $('#loadMoreButtonFreshman').hide();

                    if (check_empty){
                        $('#loadMoreButtonFreshman').after(output)
                    }
                    else{
                    $('#loadMoreButtonFreshman').after(`

            <div id="LoadDiv" class="d-flex justify-content-center m-4">
                <div id="spin" class="spinner-border text-success align-self-center" role="status">
                  <span class="sr-only"></span>
                </div>
            </div>
                        `);

                    $(output).ready(function(){
                        $('#loadMoreButtonFreshman').after(output);
                        $('#LoadDiv *').hide();
                    });
                    }
                }


                if (what_year == 'sophomore'){
                    $('#loadMoreButtonSophomore').hide();

                    if (check_empty){
                        $('#loadMoreButtonSophomore').after(output)
                    }
                    else{
                    $('#loadMoreButtonSophomore').after(`

            <div id="LoadDiv" class="d-flex justify-content-center m-4">
                <div id="spin" class="spinner-border text-success align-self-center" role="status">
                  <span class="sr-only"></span>
                </div>
            </div>
                        `)

                    $(output).ready(function(){
                        $('#loadMoreButtonSophomore').after(output)
                        $('#LoadDiv *').hide();
                    });
                    }
                }


                if (what_year == 'junior'){
                    $('#loadMoreButtonJunior').hide();

                    if (check_empty){
                        $('#loadMoreButtonJunior').after(output)
                    }
                    else{
                    $('#loadMoreButtonJunior').after(`

            <div id="LoadDiv" class="d-flex justify-content-center m-4">
                <div id="spin" class="spinner-border text-success align-self-center" role="status">
                  <span class="sr-only"></span>
                </div>
            </div>
                        `)
                    $(output).ready(function(){
                        $('#loadMoreButtonJunior').after(output)
                        $('#LoadDiv *').hide();
                    });
                    }
                }


                if (what_year == 'senior'){
                    $('#loadMoreButtonSenior').hide();

                    if (check_empty){
                        $('#loadMoreButtonSenior').after(output)
                    }
                    else{
                    $('#loadMoreButtonSenior').after(`

            <div id="LoadDiv" class="d-flex justify-content-center m-4">
                <div id="spin" class="spinner-border text-success align-self-center" role="status">
                  <span class="sr-only"></span>
                </div>
            </div>
                        `)
                    $(output).ready(function(){
                        $('#loadMoreButtonSenior').after(output)
                        $('#LoadDiv *').hide();
                    });
                    }
                }


                if (what_year == 'post_graduate'){
                    $('#loadMoreButtonPost_graduate').hide();

                    if (check_empty){
                        $('#loadMoreButtonPost_graduate').after(output)
                    }
                    else{
                    $('#loadMoreButtonPost_graduate').after(`

            <div id="LoadDiv" class="d-flex justify-content-center m-4">
                <div id="spin" class="spinner-border text-success align-self-center" role="status">
                  <span class="sr-only"></span>
                </div>
            </div>
                        `)
                    $(output).ready(function(){
                        $('#loadMoreButtonPost_graduate').after(output)
                        $('#LoadDiv *').hide();
                    });
                    }
                }


                if (what_year == 'with_no_meta'){
                    $('#loadMoreButtonWithNoMeta').hide();

                    if (check_empty){
                        $('#loadMoreButtonWithNoMeta').after(output)
                    }
                    else{
                    $('#loadMoreButtonWithNoMeta').after(`

            <div id="LoadDiv" class="d-flex justify-content-center m-4">
                <div id="spin" class="spinner-border text-success align-self-center" role="status">
                  <span class="sr-only"></span>
                </div>
            </div>
                        `)
                    $(output).ready(function(){
                        $('#loadMoreButtonWithNoMeta').after(output)
                        $('#LoadDiv *').hide();
                    });
                    }
                }



            },
            error: function (response) {
                console.log(response);
            }
        });
    });
});
