$(document).ready(function(){
    console.log("Heyyy");

    $("#90").click(function(){
        console.log("Heyyy");
      $(".photo").css({'transform': 'rotate(90deg)'});
    });

    $("#-90").click(function(){
        console.log("Heyyy");
      $(".photo").css({'transform': 'rotate(-90deg)'});
    });



});
