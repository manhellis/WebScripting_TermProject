let msnry = new Masonry("#masonry-grid", {
    // options
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
