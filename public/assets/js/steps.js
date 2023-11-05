var steps_ = [
  {
    title:"Window Panes",
    bullets:[
      {
        description:"We will make sure both the inside and outside of the window glass will be spotless",
      },
      {
        description:"Our team can clean up to 2 story buildings",
      },
      {
        description:"We remove all streaks so its like we were never there!"
      }
    ]
  },
  {
    title:"Screens",
    bullets:[
      {
        description:"We will make sure both the inside and outside of the window glass will be spotless",
      },
      {
        description:"Our team can clean up to 2 story buildings",
      },
      {
        description:"We remove all streaks so its like we were never there!"
      }
    ]
  },
  {
    title:"Door Frames & Rails",
    bullets:[
      {
        description:"We will make sure both the inside and outside of the window glass will be spotless",
      },
      {
        description:"Our team can clean up to 2 story buildings",
      },
      {
        description:"We remove all streaks so its like we were never there!"
      }
    ]
  },
  {
    title:"Window Frames & Ledges",
    bullets:[
      {
        description:"We will make sure both the inside and outside of the window glass will be spotless",
      },
      {
        description:"Our team can clean up to 2 story buildings",
      },
      {
        description:"We remove all streaks so its like we were never there!"
      }
    ]
  }
]

var box = document.querySelector(".steps_box");
var title = document.querySelector(".steps_title");
var list = document.querySelector(".steps_list");
var bullets_el = list.children;
var counter = 0;
var throttle = 1;
var isThrottle = true;

var arrow_left = document.querySelector(".clean_arrow--left");
var arrow_right = document.querySelector(".clean_arrow--right");
var bubbles = document.getElementsByClassName("clean_bubble");

var lines = document.getElementsByClassName("what_we_clean_line");


function GenerateBubbles(){

  for(var i =0; i <bubbles.length; i++){


    if(i < lines.length){
      bubbles[i].classList.remove("clean_bubble_active");
      lines[i].classList.remove("clean_line_active");
    }
    // if(i == 0){
    //   bubbles[0].classList.add("clean_bubble_active");
    //   lines[0].classList.add("clean_line_active");
    // }


  }

  for(var i =0; i < counter; i++){

    if(i < lines.length){
      bubbles[i].classList.add("clean_bubble_active");
      lines[i].classList.add("clean_line_active");
    }


  }





}

function GenerateBullet(){

  var html = ``;

  for(var i = 0 ; i <  bullets_el.length;i++){
    html+= (`
    <li class="steps_list_ ">
       ${steps_[counter].bullets[i].description}
    </li>
    `);
  }

  return html;

}

function GenerateSlide(){

var html =
`
   <p class="steps_title slidein">${counter + 1}. ${steps_[counter].title} </p>

   <ul class="steps_list_ slidein">
    ${GenerateBullet()}
   </ul>

  <div class="line_steps "></div>

`

  return html;

}


arrow_left.addEventListener("click", (event)=>{
  console.log("S");
  counter --;
  if(counter <0){
    counter = bullets_el.length;
  }
  ToggleSteps();
});

arrow_right.addEventListener("click", (event)=>{
  console.log("K");

  counter ++;

  if(counter > bullets_el.length){
    counter = 0;
  }


  ToggleSteps();

});


function ToggleSteps(){

  var steps_box = document.querySelector(".steps_box");
  steps_box.innerHTML = GenerateSlide();
  GenerateBubbles();
  
}


ToggleSteps();

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// document.querySelector(".what_we_clean_s").addEventListener("wheel",async (event)=>{
//
//   var delta = event.wheelDeltaY;
//
//   await delay(throttle * 1000);
//
//    if(delta > 0){
//
//      counter --;
//
//      if(counter < 0){
//        counter = 0;
//      }
//
//    }else{
//
//      counter ++;
//
//      if(counter > bullets_el.length){
//        counter = bullets_el.length;
//      }
//
//    }
//
//    if(counter > 0 && counter < bullets_el.length){
//      document.body.style.overflowY = "hidden";
//    }else{
//      document.body.style.overflowY = "visible";
//    }
//
//    ToggleSteps();
// })
