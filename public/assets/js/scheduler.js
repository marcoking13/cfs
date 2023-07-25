var add_user = document.querySelector("#addUser");
var modal_user = document.querySelector("#userModal");

var edit_schedule = document.getElementsByClassName("eds");
var edit_modal = document.querySelector(".modal_schedule");
var submit_button = document.querySelector(".schedule_submit_button");
var submit_form = document.querySelector(".schedule_submit_form");
var overlay_container = document.querySelector(".overlay_container");

var person_id;
var time_id;
var schedule_id;
var name_of_job;
var day_id;
var address;

function AddToSubmitForms(){

  if(submit_button && submit_form){

    submit_button.addEventListener("click", (e)=>{
      e.preventDefault();
      Submit();
    })

    submit_form.addEventListener("submit", (e)=>{
      e.preventDefault();
      Submit();
    })

  }

}

function Init(){

  add_user.addEventListener("click",(e)=>{
    ShowAddLaborModal(e);
  });

  AddToSubmitForms();
  AddEventListenerForEditScheduleModal();

}

const RenderOverlay = (deleteIt,className)=>{

  var form = document.querySelector("."+className);

  function toggle(is_in_front,form){

    var z = is_in_front ? "max-z" : "min-z";
    overlay_container.innerHTML = `<div class="overlay_edit"></div>`;

    form.classList.add(z);
    form.classList.remove(!z);

  }

  if(!deleteIt){
    toggle(true,form);
  }else{
    toggle(false,form);
  }

  var html = document.getElementsByTagName("html");
  html[0].classList.add("freeze");

  window.scrollTo(0, 0);

}

const ShowAddLaborModal = (e) => {
  modal_user.classList.add("active_user_modal");
  RenderOverlay(false,"add_user_modal");

}

const ShowScheduleModal = (e) => {

  var element = e.target.parentElement.getAttribute("name") == "cell" ? e.target.parentElement : e.target;
  var time = element.getAttribute("delta_time");
  var person_id = element.getAttribute("_id");
  var time_id = element.getAttribute("time_id");
  var day_id = element.getAttribute("day_id");
  var schedule_id = element.getAttribute("schedule_id");

  var time_el = document.querySelector(".time_delta_container");

  var time_text = `<p class="font-30 text-center akrobat time_delta"> ${time}:00 AM - </p>`

  edit_modal.classList.add("modal_schedule_active");

  SetId(person_id,time_id,schedule_id,day_id);
  RenderOverlay(false,"modal_schedule");

  time_el.innerHTML = ""
  time_el.innerHTML =time_text;

}

const SetId = (person,time,schedule,day) => {

  person_id = person;
  time_id = time;
  schedule_id = schedule;
  day_id = day;

}


const Submit = async (e) => {

  var job_input = document.getElementById("job_input");
  var address_input = document.getElementById("address_input");

  name_of_job = job_input.value;
  address = address_input.value;

  var data  = {
    address : address,
    name_of_job: name_of_job,
    person_id: person_id,
    time_id: time_id,
    schedule_id: schedule_id,
    day_id:day_id
  }

  await axios.post("/admin/edit/schedule",data,{headers: { 'content-type':'application/x-www-form-urlencoded', 'accept':'application/json' }});

  window.location.assign("/admin/schedule")

}

function AddEventListenerForEditScheduleModal(){

  for(var i = 0; i < edit_schedule.length; i++){

    edit_schedule[i].addEventListener("click",(e)=>{
      ShowScheduleModal(e);
    })

  }

}


Init();
