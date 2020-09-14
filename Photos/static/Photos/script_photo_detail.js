$(document).ready(function(){


    $("#90").click(function(){
      $('#90').rotate({
      angle: 0,
      animateTo:180
      });
    });

    $("#-90").click(function(){
      $(".photo").css({'transform': 'rotate(-90deg)'});
    });



});
