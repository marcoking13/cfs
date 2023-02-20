var dropdowns = document.querySelectorAll(".dropdown-box");

for (const dropdown of dropdowns) {
   dropdown.addEventListener("click",(e)=>{console.log(e.target);resetDropdown(e)});
 }

 function resetDropdown(e){
    var id = e.target.getAttribute("_id");

    var dropdowns = document.querySelectorAll(".dropdown-box");
    for(const dropdown of dropdowns){
      // if(dropdown.getAttribute("_id") == id){
      //     dropdown.classList.add("active-dropdown");
      // }else{
      //   dropdown.classList.remove("active-dropdown");
      // }
        dropdown.classList.remove("active-dropdown");
    }

    for(const dropdown of dropdowns){
       if(dropdown.getAttribute("_id") == id){
           dropdown.classList.add("active-dropdown");
      }

    }


 }
