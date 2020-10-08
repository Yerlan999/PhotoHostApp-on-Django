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
                        user_profile_pic.croppie('result', 'base64').then(function(base64) {
                        console.log(base64)
                        $('#id_binary').val(base64)
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





});









