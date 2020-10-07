$(document).ready(function(){


// Checking if js is loaded properly
console.log("wooooo")




 // FOR GETTING IMAGE URL FROM INPUT TAG

function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {


                    // SHOW UPLOADED(SELECTED) IMAGE

                    $('#ProfilePicture').removeAttr('hidden');
                    $('#ProfilePicture').attr('src', e.target.result);
                    $('#cancelButton').removeAttr('hidden');
                    $('#cropButton').removeAttr('hidden');

                    // THEN CROPPIE TAKES PLACE


                    var user_profile_pic = $('#ProfilePicture').croppie({
                      // url: '',


                      // viewport options
                      viewport: {
                        width: 250,
                        height: 250,
                        type: 'square' // or 'circle' square
                      },

                      update: function (data) {

                            var [left, upper, right, lower] = data['points'];

                            $('#id_left').val(left)
                            $('#id_right').val(right)
                            $('#id_lower').val(lower)
                            $('#id_upper').val(upper)
                      },
                      // boundary options
                      boundary: {
                        width: 500,
                        height: 500
                      },

                      // orientation controls
                      orientationControls: {
                        enabled: true,
                        leftClass: '',
                        rightClass: ''
                      },

                      // resize controls
                      resizeControls: {
                        width: true,
                        height: true
                      },

                      // addiontal CSS class
                      customClass: '',

                      // enable image zoom

                      // enable image resize
                      enableResize: false,

                      // show image zoom control
                      showZoomer: true,

                      // image zoom with mouse wheel
                      mouseWheelZoom: true,

                      // enable exif orientation reading
                      enableExif: true,

                      // restrict zoom so image cannot be smaller than viewport
                      enforceBoundary: true,

                      // enable orientation
                      enableOrientation: true,

                      // enable key movement
                      enableKeyMovement: true,


                    });

                    $('#cropButton').click(function(){
                        user_profile_pic.croppie('result', 'canvas').then(function(canvas) {
                        console.log(canvas)
                        console.log("Showing Preview and Unhiding AJAX Button");
                    });


                    });

                    // TEST SCOPE FOR AJAX HERE



                }
                reader.readAsDataURL(input.files[0]);
            }
        }
        // IF INPUT FIELD CHANGES
        $("#id_image").change(function(){
            readURL(this);
        });



// Using Croppie plugin


$('#profileImageUpload').click(function(e){
        e.preventDefault()

        var userName = $('h2.account-heading').text()

        var left = $('#id_left').val()
        var right = $('#id_right').val()
        var lower = $('#id_lower').val()
        var upper = $('#id_upper').val()


        $.ajax({
            type: 'POST',
            url: 'profile-image-update/',
            data: {
                user: userName,
                coordinates: [left, upper, right, lower],
                csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken').val(),
                },

            success: function(response){
                console.log('SUCCESS');
                console.log(response)

            },
            error: function (response) {
                console.log('ERROR');
                console.log(response);
            }
});


});


});







// var currentImage = $('a').eq(-1)[0]['pathname']
// var imageElementTemplate = `
// <div class="d-flex justify-content-center mt-3">
//     <img id="CurrentImage" class="img-thumbnail" src="placeholder" alt="Фото профиля" width="300px" height="400px">
// </div>`


// var readyImageElement = imageElementTemplate.replace('placeholder', currentImage)

// $('a').eq(-1).after(
//     readyImageElement
//     )

// $('#CurrentImage').rcrop({

//   // full-size crop area
//   full : true,

//   // min / max size of crop area


//   // preserve the original radio
//   preserveAspectRatio : false,

//   // generate an input with crop data
//   inputs : true,

//   // prefix to input
//   inputsPrefix : '',
//   inputsSuffix : '',

//   // <a href="https://www.jqueryscript.net/tags.php?/grid/">grid</a> style crop area
//   grid : false,
//     preview : {
//     display : false,
//     size : [100, 100], //Also: ['100%', '100%'],
//     wrapper : '' // where append preview to
//   },


// });

// $('#CurrentImage').on('rcrop-changed', function(data, event){
//   // When crop area has been changed.

//   var x = event['cropData']['x']
//   var y = event['cropData']['y']
//   var width = event['cropData']['width']
//   var height = event['cropData']['height']
//   $('#id_x').val(x)
//   $('#id_y').val(y)
//   $('#id_width').val(width)
//   $('#id_height').val(height)

// })



// $('#CurrentImage').on('rcrop-changed', function(){
//     var srcOriginal = $(this).rcrop('getDataURL');
//     var srcResized = $(this).rcrop('getDataURL', 300,300);

//     // $('#test007').attr('src', srcResized)

//     })




























//  FOR GETTING IMAGE URL FROM INPUT TAG


// function readURL(input) {
//             if (input.files && input.files[0]) {
//                 var reader = new FileReader();

//                 reader.onload = function (e) {
//                     $('#CurrentImage').attr('src', e.target.result);
//                 }
//                 reader.readAsDataURL(input.files[0]);
//             }
//         }
//         $("input:file").change(function(){
//             readURL(this);
//         });


// });





