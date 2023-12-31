$(document).ready(function () {
  var formGroups = $(".form-group");
  var currentIndex = 0;

  function showCurrentGroup() {
    formGroups.fadeOut(500);
    formGroups.eq(currentIndex).delay(500).fadeIn(500);
  }

  $("#arrow-up").click(function () {
    if (currentIndex > 0) {
      currentIndex--;
    }

    if (currentIndex === 8) {
      $(".btn").addClass("hide");
      $(".next-btn").removeClass("hide");
    }

    showCurrentGroup();
  });

  $("#arrow-down").click(function () {
    if (currentIndex < formGroups.length - 1) {
      currentIndex++;
      console.log(currentIndex);
    }

    showCurrentGroup();

    if (currentIndex === 8) {
      setTimeout(function () {
        $(".btn").removeClass("hide").addClass("fade-in");
      }, 1000); // delay equal to the duration of the fadeOut animation
    }
  });

  showCurrentGroup();

  // Hide all sections except the first one
  $(".form-group").not(".active").hide();

  $(".next-btn").click(function (event) {
    // Prevent the default action
    event.preventDefault();

    var currentSection = $(this).closest(".form-group");
    currentSection.fadeOut(400, function () {
      var nextSection = currentSection.next(".form-group");
      nextSection.fadeIn(400);
    });

    currentIndex++;
    console.log(currentIndex);

    if (currentIndex === 8) {
      setTimeout(function () {
        $(".btn").removeClass("hide").addClass("fade-in");
      }, 1000); // delay equal to the duration of the fadeOut animation
    }
  });
});
