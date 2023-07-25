const currentUrl = window.location.href;
const tailend = getUrl(currentUrl);
var t;

function Init(){

  if(tailend.length == 0){
    t = "Home Page";
  }

  if(tailend == "about"){
    t = "About Us";
  }

  if(tailend == "contact_us"){
    t = "Contact Us";
  }

  if(tailend == "schedule"){
    t = "Schedule Quote"
  }

  axios.post("/admin/roots",t);

}

function getUrl(url){
  return url.split('/').pop();
}

Init();
