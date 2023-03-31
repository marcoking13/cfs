
function switch_image(query,src_name){
  var img = document.getElementById(query);
  img.setAttribute("src",src_name);
}

switch_image("mobile_showcase","./assets/images/contact_mobile.png")
