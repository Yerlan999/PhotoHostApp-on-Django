$(document).ready(function(){

// Checking if js is loaded properly
$('#id_left').val(0)
$('#id_right').val(0)
$('#id_lower').val(0)
$('#id_upper').val(0)

// window.current_image = $('a').eq(-1)[0].href

// THEN CROPPIE TAKES PLACE
var user_profile_pic = $('#demo').croppie({

  // viewport options
  viewport: {
    width: 200,
    height: 200,
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
    width: 400,
    height: 400
  },

  // orientation controls
  orientationControls: {
    enabled: true,
    leftClass: '',
    rightClass: '',
  },

  // resize controls
  resizeControls: {
    width: false,
    height: false,
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
  enableExif:true,

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

            // Binding an Image to div tag
            $('#demo').croppie('bind', {
                url: e.target.result,
                points: [0,0,200,200],
                zoom: 1,
            });

            // Showing a Modal
            $('#ModalHiddenButton').trigger( "click" );
        }
        reader.readAsDataURL(input.files[0]);
    }
}


// IF INPUT FIELD CHANGES
$("#id_image").change(function(){
    readURL(this);
});


$('#cancelButton').click(function(){
  $('#id_image').val('')
})


$('#cutButton').click(function(){
  user_profile_pic.croppie('result', 'base64').then(function(base64) {

    var imgg = `
      <div class="d-block m-3">
        <img class="d-block" src="place" alt="Fuck" style="display:block;border-radius: 50%;border-color:#aacc00;;border-style:solid;border-width:3px">
      </div>
      `
    var sub_imgg = imgg.replace('place', base64)
    $('label').eq(-1).append(sub_imgg)
    // $('.croppie-result').css('transform', 'scale(0.3)')

  });

});



});
