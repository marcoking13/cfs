
function switch_image(query,src_name){
  var img = document.getElementById(query);
  img.setAttribute("src",src_name);
}

if(window.innerWidth <=844){
  switch_image("mobile_showcase","./assets/images/quote_mobile.png")
}
