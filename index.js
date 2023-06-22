// $(document).ready(function() {

//   let counter;
//   // Hide all sections except the first one
//   $('.form-group').not('.active').hide();

//   $('.next-btn').click(function(event) {
//       // Prevent the default action
//       event.preventDefault();

//       var currentSection = $(this).closest('.form-group');
//       currentSection.hide();
//       currentSection.next('.form-group').show();
//       counter++;
//   });

//   if (counter === 8){
//     $('.btn').removeClass('hide');
//     $('.btn').addClass('reveal');
//   }
// });

$(document).ready(function() {

  let counter = 1;
  // Hide all sections except the first one
  $('.form-group').not('.active').hide();

  $('.next-btn').click(function(event) {
      // Prevent the default action
      event.preventDefault();

      var currentSection = $(this).closest('.form-group');
      currentSection.fadeOut(400, function() {
          var nextSection = currentSection.next('.form-group');
          nextSection.fadeIn(400);

          counter++;
      });

      console.log(counter);

      if (counter === 8){
            $('.btn').removeClass('hide');
            $('.btn').addClass('reveal');
          }
  });

  
});