function alertNatf(color, text) {
    document.querySelector("div.alert").style.backgroundColor = color;
    document.querySelector("div.alert").innerHTML =
        '<font color=#fff><span class="closebtn" > &times; &nbsp;&nbsp; </span>' + text + "</font>";

    document.querySelector("div.alert").style.display = "block";
    document.querySelector("div.alert").style.opacity = "1";

    var close = document.getElementsByClassName("closebtn");
    var i;
    var clearAlertAuto = setInterval(function() {
        var div = document.querySelector("div.alert");
        div.style.opacity = div.style.opacity - 0.0064;
        if (div.style.opacity < 0) {
            clearInterval(clearAlertAuto);
            return;
        }
    }, 50);
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            var div = this.parentElement.parentElement;
            div.style.opacity = "0";
            setTimeout(function() {
                div.style.opacity=0;
            }, 600);
        };
    }
}