// function Init(){
//   var dropdowns = document.querySelectorAll(".dropdown-box");
//
//   for (const dropdown of dropdowns) {
//     var parent = dropdown.children;
//     var array_parent = [...parent]
//
//
//     for(const children of array_parent) {
//
//       if(children.classList.contains("dropdown_container")){
//         var children_parent = children.children;
//         var array_of_children_parents = [...children_parent];
//         for(const grandchild of array_of_children_parents){
//           grandchild.addEventListener("click",(e)=>{
//             console.log("Hit");
//             resetDropdown(e,false,true);
//           });
//         }
//
//       }
//
//       children.addEventListener("click",(e)=>{
//         console.log("Hit");
//
//         resetDropdown(e,true);
//       })
//     }
//      dropdown.addEventListener("click",(e)=>{
//
//        resetDropdown(e,false)});
//    }
// }

function AddDropdownEvents(){
    var dropdowns = document.querySelectorAll(".dropdown_arrow");

    for(var arrow = 0; arrow <= dropdowns.length - 1; arrow++){

      console.log(dropdowns[arrow]);
        dropdowns[arrow].addEventListener("click",function(e){
          console.log("Hit")
          resetDropdown(e,true);
        });
    }

}


 function resetDropdown(e){


    var id = e.target.getAttribute("_id");

    console.log(id);

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


AddDropdownEvents();
