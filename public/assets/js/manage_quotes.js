var quotes_to_be_deleted = [];

var option_buttons = document.getElementsByClassName("option_button");
var favorite_buttons = document.getElementsByClassName("favorite_button");

var delete_button = document.querySelector(".delete_quote_button");


delete_button.addEventListener("click", async (e)=>{
  var interactable = e.target.getAttribute("interactable");
  if(interactable == 1){
      var r = await axios.post("/admin/delete_quotes",{quotes:quotes_to_be_deleted}, {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});
     window.location.assign("/admin/home");
  }
})

for (var i = 0; i < favorite_buttons.length; i++)
{


  var isFav = favorite_buttons[i].getAttribute("isFav");
  console.log(isFav == "false");
  if(isFav == "true"){
    favorite_buttons[i].classList.add("active_fav");
  }else{
    favorite_buttons[i].classList.remove("active_fav");
  }

  favorite_buttons[i].addEventListener("click", async (e)=>{
      isFav = e.target.getAttribute("isFav");
      var toggle = false;
      console.log(e.target.getAttribute("isFav"));
      if(!isFav || isFav == "false" || isFav == false){
        toggle = true;
      }else{
        toggle = false;
      }

      await axios.post("/admin/favorite",{isFav:toggle,_id:e.target.getAttribute("quote_id")}, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
      });

      e.target.setAttribute("isFav",toggle);

      if(toggle){
        e.target.classList.add("active_fav");
      }else{
      e.target.classList.remove("active_fav");
      }
      console.log(toggle);
      console.log(e.target.getAttribute("isFav"));

  })


}







function MakeDeleteButtonVisible(){

  if(quotes_to_be_deleted.length > 0 ){
    delete_button.classList.add("active_quote_button");
    delete_button.setAttribute("interactable",1);
  }else{
    delete_button.classList.remove("active_quote_button");
    delete_button.setAttribute("interactable",-1);
  }

}

function ToggleDelete(element){

  var id = element.parentElement.getAttribute("quote_id");
  var found = false;

  if(quotes_to_be_deleted == 0){

    quotes_to_be_deleted.push(id);
    element.classList.add("active_delete");
    found = false;

  }else{


    for(var i = 0; i < quotes_to_be_deleted.length; i++){

      if(id == quotes_to_be_deleted[i]){

        var index = quotes_to_be_deleted.indexOf(id);

        if(index > -1){
          quotes_to_be_deleted.splice(index,1);
          element.classList.remove("active_delete");
        }

        found = true;

      }

    }

    if(!found){
        quotes_to_be_deleted.push(id);
        element.classList.add("active_delete");
    }

  }


  MakeDeleteButtonVisible();


}





for (var i = 0; i < option_buttons.length; i++) {

  option_buttons[i].addEventListener("click", (e)=>{ToggleDelete(e.target)})
}
