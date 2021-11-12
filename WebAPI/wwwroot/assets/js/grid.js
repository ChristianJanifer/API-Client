document.getElementById("b").addEventListener("click", afunction);
function afunction() {
    alert("https://www.w3schools.com/");
}

$(document).ready(function () {
    $(".btn-outline-warning").click(function () {
        $(this). css("background-color", "green");
    });
});

$(document).ready(function () {
    $(".btn-outline-dark").click(function () {
        $(this).css("background-color", "red");
    });
});

$(document).ready(function () {
    $(".btn-outline-primary").click(function () {
        $("#a").css({ "font-size": "175%" });
    });
});