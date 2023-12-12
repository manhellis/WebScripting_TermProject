import Atropos from '../node_modules/atropos/atropos.mjs';
const myAtropos = Atropos({
    el: '.my-atropos',
    activeOffset: 20,
    shadow: true,
    shadowScale: 1.0,
    shadowOffset: 40,
    onEnter() {
      console.log('Enter');
    },
    onLeave() {
      console.log('Leave');
    },
    onRotate(x, y) {
      console.log('Rotate', x, y);
    }
});

$(document).ready(function () {
  $.ajax({
      url: "https://dog.ceo/api/breeds/image/random",
      type: "GET",
      dataType: "json",
      success: function (data) {
          if (data.status === "success") {
              $(".dogImageContainer").html(
                  '<img src="' + data.message + '" alt="Random Dog" style=" height: 72px; object-fit: cover;" />'
              );
          } else {
              $(".dogImageContainer").text("Failed to load image.");
          }
      },
      error: function () {
          $(".dogImageContainer").text("Error fetching data.");
      },
  });
});
