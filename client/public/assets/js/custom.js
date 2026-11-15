// Disabling the buttons when the window is about to be unloaded
$(window).on('beforeunload', function () {
  $("input[type=submit], input[type=button], button[type=submit], a.btn").prop("disabled", true);
});

// Enabling the buttons after the page has loaded
$(window).on('load', function () {
  $("input[type=submit], input[type=button], button[type=submit], a.btn").prop("disabled", false);
});

//sidebar hide
$(document).ready(function () {
  $('.sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
  });
});
//name update notice
$(window).load(function () {
  $('#name_notice').modal('show');
});

///active menu js
$(".list-unstyled a").each(function () {
  //console.log($(this).attr('href'));
  if ((window.location.pathname.indexOf($(this).attr('href'))) > -1) {
    $(this).parent().addClass('active');
  }
});
