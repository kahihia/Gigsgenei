window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("myBtn").style.display = "block";
  } else {
    document.getElementById("myBtn").style.display = "none";
  }
}
// When the user clicks on the button, scroll to the top of the document

function topFunction() {
  $('html, body').animate({scrollTop: 0}, 800);
  // alert('gotop');

}

var clicks=0;
function changeColorFav(id){
    ++clicks;
    if(clicks%2){
      id.style.color='red';
    }
  else{
    id.style.color='gray';

  }
    }
