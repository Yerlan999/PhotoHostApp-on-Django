$(document).ready(function(){


// Checking if js is loaded properly
console.log("wooooo")


// Catching Input file upload event 'native'
$('input:file').change(function(){
    console.log("FFFFF")
})


// Using Cropzee plugin

$("#cropzee-input").cropzee({
  allowedInputs: ['png','jpg','jpeg'],
  imageExtension:'image/jpeg',
  returnImageMode:'data-url',

  // custom aspect radio
  aspectRatio: null,

  // min/max sizes
  maxSize: { width: null, height: null },
  minSize: { width: null, height: null },

  // start size of crop region
  startSize: { width: 100, height: 100, unit: '%' },


  // Event handling functions
  onCropStart: function(data) {
    console.log(data.x, data.y, data.width, data.height);
  },
  onCropMove: function(data) {
    console.log(data.x, data.y, data.width, data.height);
  },
  onCropEnd: function(data) {
    console.log(data.x, data.y, data.width, data.height);
  },
  onInitialize: function(instance) {
    // do things here
  }


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





