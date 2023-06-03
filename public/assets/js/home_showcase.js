
function switch_image(query,src_name){
  var img = document.getElementById(query);
  img.setAttribute("src",src_name);
}

if(window.innerHeight <=  window.innerWidth){
  console.log(window.innerHeight <=  window.innerWidth);
   switch_image("mobile_showcase","./assets/images/showcase_pad.png")
}

else if(window.innerWidth <=844){

  switch_image("mobile_showcase","./assets/images/showcase_landscape.png")
}
