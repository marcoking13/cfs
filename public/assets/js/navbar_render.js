var width = window.innerWidth;

var desktop_nav = `

<div class="row navbar_home">
  <div class="col-4"></div>

  <div class="col-2">
    <a href="/"><p class="link_nav">Home</p></a>
  </div>

  <div class="col-2">
    <a href = "/about"><p class="link_nav">About Us</p></a>
  </div>
  <div class="col-2">
    <p class="link_nav">Contact Us</p>
  </div>
  <div class="col-2">
    <p class="link_nav">Schedule Quote</p>
  </div>

</div>

`;
var mobile_nav = `
<div class="pos-f-t background-1a">
  <div class="collapse" id="navbarToggleExternalContent">
    <div class="p-4">
      <h4 class="text-white">Collapsed content</h4>
      <span class="text-muted">Toggleable via the navbar brand.</span>
    </div>
  </div>
  <nav class="navbar navbar-dark background-1a">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
  </nav>
</div>
`;

var navbar_element = document.querySelector(".navbar_container");

if(width >=844){
  navbar_element.innerHTML = desktop_nav;
}else{
  navbar_element.innerHTML = mobile_nav;
}

document.getElementById('vid').play();
