$(document).ready(function(){

console.log("wooooo")


$('input:file').change(function(){
    console.log("FFFFF")


})


var currentImage = $('a').eq(-1)[0]['pathname']
var imageElementTemplate = `
<div class="d-flex justify-content-center mt-3">
    <img id="CurrentImage" class="img-thumbnail" src="placeholder" alt="Фото профиля" width="300px" height="400px">
</div>`


var readyImageElement = imageElementTemplate.replace('placeholder', currentImage)

$('a').eq(-1).after(
    readyImageElement
    )

$('#CurrentImage').rcrop({

  // full-size crop area
  full : true,

  // min / max size of crop area


  // preserve the original radio
  preserveAspectRatio : false,

  // generate an input with crop data
  inputs : true,

  // prefix to input
  inputsPrefix : '',
  inputsSuffix : '',

  // <a href="https://www.jqueryscript.net/tags.php?/grid/">grid</a> style crop area
  grid : false,
    preview : {
    display : false,
    size : [100, 100], //Also: ['100%', '100%'],
    wrapper : '' // where append preview to
  },


});

$('#CurrentImage').on('rcrop-changed', function(data, event){
  // When crop area has been changed.

  var x = event['cropData']['x']
  var y = event['cropData']['y']
  var width = event['cropData']['width']
  var height = event['cropData']['height']
  $('#id_x').val(x)
  $('#id_y').val(y)
  $('#id_width').val(width)
  $('#id_height').val(height)

})



$('#CurrentImage').on('rcrop-changed', function(){
    var srcOriginal = $(this).rcrop('getDataURL');
    var srcResized = $(this).rcrop('getDataURL', 300,300);

    // $('#test007').attr('src', srcResized)

    })








$('#CurrentImage').on('rcrop-ready', function(){
  // When CurrentImage has been read and rCrop is ready.

})

$('#CurrentImage').on('rcrop-change', function(){
  // When crop area is being changed.

})


function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#CurrentImage').attr('src', e.target.result);
                }
                reader.readAsDataURL(input.files[0]);
            }
        }
        $("input:file").change(function(){
            readURL(this);
        });


});





