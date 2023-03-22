var modal_style = {
  wrapper:"active_wrapper",
  lock_screen:"lock_screen",
  modal:"active_modal",

}


var exit_button = document.getElementById("modal_exit");

exit_button.addEventListener("click",(e) => {

  var target = e.target;
  var lock_screen = document.getElementById("wrapper");
  var wrapper = document.getElementById("blackWrapper");
  var modal = document.getElementById("mainModal");

  lock_screen.classList.remove(modal_style.lock_screen);
  wrapper.classList.remove(modal_style.wrapper);
  modal.classList.remove(modal_style.modal);

})
