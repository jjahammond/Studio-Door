$(document).ready(function () {
  $("#image").attr("src", "assets/landing-page-animation-cropped.gif?" + Math.random());
});

function fallback(video)
{
  var img = video.querySelector('img');
  if (img)
    video.parentNode.replaceChild(img, video);
}
