$(document).ready(function(){

console.log("wooooo")
$('#image').rcrop({

  // full-size crop area
  full : false,

  // min / max size of crop area
  minSize : [50, 50],
  maxSize : [500, 500],

  // preserve the original radio
  preserveAspectRatio : true,

  // generate an input with crop data
  inputs : true,

  // prefix to input
  inputsPrefix : '',

  // <a href="https://www.jqueryscript.net/tags.php?/grid/">grid</a> style crop area
  grid : false,
    preview : {
    display : true,
    size : [100, 100], //Also: ['100%', '100%'],
    wrapper : '' // where append preview to
  },


});

$('#image').on('rcrop-changed', function(data){
  // When crop area has been changed.
  console.log("Chahged")
  console.log(data)

})

$('#image').on('rcrop-ready', function(){
  // When image has been read and rCrop is ready.
  console.log("Ready")
})

$('#image').on('rcrop-change', function(){
  // When crop area is being changed.
  console.log("CHanging")
})
});

