function Init(){
  var dropdowns = document.querySelectorAll(".dropdown-box");

  for (const dropdown of dropdowns) {
    var parent = dropdown.children;
    var array_parent = [...parent]


    for(const children of array_parent) {

      if(children.classList.contains("dropdown_container")){
        var children_parent = children.children;
        var array_of_children_parents = [...children_parent];
        for(const grandchild of array_of_children_parents){
          grandchild.addEventListener("click",(e)=>{

            resetDropdown(e,false,true);
          });
        }

      }

      console.log(children);
      children.addEventListener("click",(e)=>{

        resetDropdown(e,true);
      })
    }
     dropdown.addEventListener("click",(e)=>{

       resetDropdown(e,false)});
   }
}


 function resetDropdown(e,isChild,isGrandChild){
    var id;

    if(isChild){
       id = e.target.parentNode.getAttribute("_id");
    }else if(isGrandChild){
      id = e.target.parentNode.parentNode.getAttribute("_id");
    }else{
       id = e.target.getAttribute("_id");
    }


    var dropdowns = document.querySelectorAll(".dropdown-box");

    for(const dropdown of dropdowns){
        dropdown.classList.remove("active-dropdown");
    }

    for(const dropdown of dropdowns){
       if(dropdown.getAttribute("_id") == id){
           dropdown.classList.add("active-dropdown");
      }

    }


 }

 Init();
