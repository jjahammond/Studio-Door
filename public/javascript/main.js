function isColorInRange(expectedColor, givenColor) {
    const THRESHOLD = 40;
    for (var i = 0; i < 3; i++) {
        if (((expectedColor[i] - THRESHOLD) > givenColor[i])
         || ((expectedColor[i] + THRESHOLD) < givenColor[i])) {
            return false;
        }
    }
    return true;
}

function setVideoBgColor(vid, nativeColor) {
    if (vid) {
        var vidBg = vid.parentElement;
        if (vidBg) {
            // draw first pixel of video to a canvas
            // then get pixel color from that canvas
            var canvas = document.createElement("canvas");
            canvas.width = 1;
            canvas.height = 1;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(vid, 0, 0, 1, 1);

            var p = ctx.getImageData(0, 0, 1, 1).data;
            //console.log("rgb(" + p[0] + "," + p[1] + "," + p[2] + ")");
            if (isColorInRange(nativeColor, p)) {
                vidBg.style.backgroundColor = "rgb(" + p[0] + "," + p[1] + "," + p[2] + ")";
            }
        }
    }
}

function setVideoBgColorDelayed(vid, nativeColor) {
    setTimeout(setVideoBgColor, 100, vid, nativeColor);
}

// $(document).ready(function () {
//   $("#image").attr("src", "assets/landing-page-animation-cropped.gif?" + Math.random());
// });
//
// function fallback(video)
// {
//   var img = video.querySelector('img');
//   if (img)
//     video.parentNode.replaceChild(img, video);
// }
