
function switch_image(query,src_name){
  var img = document.getElementById(query);
  img.setAttribute("src",src_name);
}

if(window.matchMedia("(orientation: landscape)").matches){
   switch_image("mobile_showcase","./assets/images/showcase_landscape.png")
}

else if(window.innerWidth <=844){

  switch_image("mobile_showcase","./assets/images/home_mobile.png")
}
