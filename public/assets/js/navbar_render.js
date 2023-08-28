var width = window.innerWidth;

var navbar_element = document.querySelector(".navbar_container");
var nav_button = document.getElementById("button_navbar");

var desktop_nav = `

<div class="row navbar_custom">

  <div class="col-3">
    <p class="link_nav"style="margin-left:10%;position:relative;bottom:.5rem"> Custom Facility Service</p>
  </div>
  <div class="col-1"></div>

  <div class="col-2">
    <a href="/"><p class="link_nav margin-left-5">Home</p></a>
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

<div class="pos-f-t navbar_custom">

  <nav class="navbar navbar_custom">

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
            <a href="/contact_us"><p class="link_nav medium-font">Contact Us</p></a>
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


function NavClick(){

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

}

function Init(){

  if(width >=844){
    navbar_element.innerHTML = desktop_nav;
  }else{
    navbar_element.innerHTML = mobile_nav;
  }

  if(nav_button){

      nav_button.addEventListener("click",()=>{

      NavClick();

    });

  }

}


Init();
