$(document).ready(function(){

// Checking if js is loaded properly
console.log("wooooo")


// window.current_image = $('a').eq(-1)[0].href

// THEN CROPPIE TAKES PLACE
var user_profile_pic = $('#demo').croppie({

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
    rightClass: '',
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
  enableResize: true,

  // show image zoom control
  showZoomer: true,

  // image zoom with mouse wheel
  mouseWheelZoom: true,

  // enable exif orientation reading
  enableExif:true,                                               // !!!!!!!!!!!!!!

  // restrict zoom so image cannot be smaller than viewport
  enforceBoundary: true,

  // enable orientation
  enableOrientation: true,

  // enable key movement
  enableKeyMovement: true,

});



// SHOWING CURRENT IMAGE

// $('#demo').croppie('bind', {
//     url: window.current_image,
// });


 // FOR GETTING IMAGE URL FROM INPUT TAG

function readURL(input) {

    if (input.files && input.files[0]) {

        var reader = new FileReader();
        reader.onload = function (e) {

            window.uploaded_image = e.target.result

            $('#demo').croppie('bind', {
                url: e.target.result,
            });
        }
        reader.readAsDataURL(input.files[0]);
    }
}


// IF INPUT FIELD CHANGES
$("#id_image").change(function(){
    readURL(this);
    $('#ModalHiddenButton').trigger( "click" );

});


$('#Button1').click(function(){
    if(window.uploaded_image === undefined){
        $('#demo').croppie('bind', {
            url: window.current_image,
            orientation: 2,
        });
    }
    else{
        $('#demo').croppie('bind', {
            url: window.uploaded_image,
            orientation: 2,
        });
    }
})


$('#Button2').click(function(){
    if(window.uploaded_image === undefined){
        $('#demo').croppie('bind', {
            url: window.current_image,
            orientation: 3,
        });
    }
    else{
        $('#demo').croppie('bind', {
            url: window.uploaded_image,
            orientation: 3,
        });
    }
})




});









