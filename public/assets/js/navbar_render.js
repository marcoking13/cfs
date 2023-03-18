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
    <a href = "/contact_us">  <p class="link_nav">Contact Us</p></a>
  </div>
  <div class="col-2">
  <a href='/schedule'>  <p class="link_nav">Schedule Quote</p> </a>
  </div>

</div>

`;
var mobile_nav = `
<div class="pos-f-t background-1a">
<nav class="navbar navbar-dark background-1a">
  <button id="button_navbar" class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
</nav>
  <div class="collapse active_n" id="navbarToggleExternalContent" status="inactive">

    <div class="row navbar_home_mobile mt2_5">
      <div class="col-1 "></div>
      <div class="col-10">
      <div class="row">
      <div class="col-12">
        <a href="/"><p class="link_nav medium-font">Home</p></a>
      </div>

      <div class="col-12">
        <a href = "/about"><p class="link_nav medium-font">About Us</p></a>
      </div>
      <div class="col-12">
        <p class="link_nav medium-font">Contact Us</p>
      </div>
      <div class="col-12">
        <a href="/schedule" ><p class="link_nav medium-font">Schedule Quote</p> </a>
      </div>

      </div>

      </div>
    </div>

  </div>

</div>
`;

var navbar_element = document.querySelector(".navbar_container");

if(width >=844){
  navbar_element.innerHTML = desktop_nav;
}else{
  navbar_element.innerHTML = mobile_nav;
}

var nav_button = document.getElementById("button_navbar");
nav_button.addEventListener("click",()=>{
  var nav_container = document.getElementById("navbarToggleExternalContent");
  var toggle = "inactive";
  if(nav_container.getAttribute("status") == "inactive"){
    toggle = "active";
  }else{
    toggle = "inactive";
  }
  nav_container.setAttribute("status",toggle);
  if(nav_container.getAttribute("status") == "inactive"){
    nav_container.classList.add("active-navbar");
    nav_container.classList.remove("collapse");
  }else{
    nav_container.classList.add("collapse");
    nav_container.classList.remove("active-navbar");
  }
});

document.getElementById('vid').play();
