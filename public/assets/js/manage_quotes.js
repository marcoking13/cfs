var quotes_to_be_deleted = [];

var option_buttons = document.getElementsByClassName("option_button");

var delete_button = document.querySelector(".delete_quote_button");


delete_button.addEventListener("click", async (e)=>{
  var interactable = e.target.getAttribute("interactable");
  if(interactable == 1){
      var r = await axios.post("/admin/delete_quotes",{quotes:quotes_to_be_deleted}, {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});
      console.log(r);
  }
})


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
