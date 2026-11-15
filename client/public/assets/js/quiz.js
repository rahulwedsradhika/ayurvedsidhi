//on page load functions
$('#sidebar').hide();
$('#dashboard_top_menu button').hide();
$('#dashboard_top_menu').html('<button class="btn btn-danger"><i class="fa fa-warning"></i> Do not reload this page</button>');
$('#dashboard_top_menu button').prop('disabled', true);
$('.sidebar-mini').addClass('sidebar-collapse');
$('.cont').addClass('hide');
$('#question_splitter_1').removeClass('hide');
$('#question_splitter_1').addClass('visible');
timedCount();
//on page load functions
var c = $('#total_time').text();
var t;

function timedCount() {
  var hours = parseInt(c / 3600) % 24;
  var minutes = parseInt(c / 60) % 60;
  var seconds = c % 60;
  var result = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
  $('#timer').html(result);
  $('#time_left').html(result);
  if (c == 0) {
    setConfirmUnload(false);
    $("#submit_paper").trigger('click');
  }
  c = c - 1;
  t = setTimeout(function () {
    timedCount()
  }, 1000);
}

function countQues() {
  var tsolved = $('.solve_taged').length;
  $('#no_ans_tagged').text(tsolved - 1);
  var solved = $('.solved').length;
  $('#no_attempt').text(solved - tsolved);
  var tagged = $('.taged').length;
  $('#no_tagged').text(tagged - (tsolved));
  var total_mcqs = $('#total_mcqs').text();
  $('#no_unattempt').text(total_mcqs - ((solved - (1 + tsolved)) + tsolved));
}

function QuesAttempt(clickID) {
  var element = document.getElementById(clickID);
  if (element.classList.contains('taged')) {
    element.classList.add("solve_taged");
    element.classList.add("solved");
    //element.classList.remove( "taged" );
  } else {
    element.classList.add("solved");
  }
  countQues();
}

function increaseFontSize(id, increaseFactor) {
  var txt = document.getElementById(id);
  var style = window.getComputedStyle(txt, null).getPropertyValue('font-size');
  var currentSize = parseFloat(style);
  txt.style.fontSize = (currentSize + increaseFactor) + 'px';
}

// Prevent accidental navigation away
function setConfirmUnload(on) {
  window.onbeforeunload = (on) ? unloadMessage : null;
}

function unloadMessage() {
  $('#submit_warning').modal('show');
  return 'Your Answered Questions are resetted zero, Please select stay on page to continue your Quiz';
}
// Prevent accidental navigation away

function enableButtons() {
  $('button[type=button]').prop('disabled', false);
  $('button#submit_paper').prop('disabled', false);
}


$(document).ready(function () {
  //prevent unload
  setConfirmUnload(true);

  //Click next Ques Button
  $(".next").click(function () {
    var last = parseInt($(this).attr('id'));
    console.log(last);
    var nex = last + 1;
    $('#question_splitter_' + last).addClass('hide');
    $('#question_splitter_' + nex).removeClass('hide');
    $('#question_splitter_' + nex).addClass('visible');
    countQues();
  });

  //Previous Ques Button Click
  $(".previous").click(function () {
    var last = parseInt($(this).attr('id'));
    var pre = last - 1;
    $('#question_splitter_' + last).addClass('hide');
    $('#question_splitter_' + pre).removeClass('hide');
    $('#question_splitter_' + pre).addClass('visible');
    countQues();
  });

  //Jump to Ques button click
  $(".jump").click(function () {
    var clickedID = parseInt($(this).attr('id'));
    console.log(clickedID);
    $('.visible').addClass('hide');
    $('#question_splitter_' + clickedID).removeClass('hide');
    $('#question_splitter_' + clickedID).addClass('visible');
    countQues();
  });

  //Erase question button click
  $(".erase").click(function () {
    var last = parseInt($(this).attr('id'));
    console.log(last);
    $('#' + last + 'PL').removeClass('solved');
    if ($('#' + last + 'PL').hasClass('solve_taged')) {
      $('#' + last + 'PL').removeClass('solve_taged');
    }
    $('#radio1_' + last).removeAttr('checked');
    $('#radio1_' + last).attr('checked', false);
    $('#radio2_' + last).removeAttr('checked');
    $('#radio2_' + last).attr('checked', false);
    $('#radio3_' + last).removeAttr('checked');
    $('#radio3_' + last).attr('checked', false);
    $('#radio4_' + last).removeAttr('checked');
    $('#radio4_' + last).attr('checked', false);
    $('#radio5_' + last).prop('checked', true);
    countQues();
  });

  //Tag a ques button click
  $(".tag").click(function () {
    var last = parseInt($(this).attr('id'));
    console.log(last);
    $('#' + last + 'PL').toggleClass('taged');
    if ($('#' + last + 'PL').hasClass('solved')) {
      $('#' + last + 'PL').addClass('solve_taged');
    }
    if (!$('#' + last + 'PL').hasClass('taged')) {
      $('#' + last + 'PL').removeClass('solve_taged');
    }
    $('#' + last + 'TAG').fadeOut(function () {
      $('#' + last + 'TAG').text(($('#' + last + 'TAG').text() == 'Tag') ? 'De-Tag' : 'Tag').fadeIn();
      countQues();
    })
  });


  $("button#submit_paper").click(function () {
    $('#paper_alert').html('<span class="strong text-red"><i class="fa fa-spinner fa-spin"></i> Please wait while submitting the paper......<span>');
    $('button#submit_paper').prop('disabled', true);
    $.ajax({
      type: "POST",
      url: "ajax_paper.php",
      data: $('form.quiz_form').serialize(),
      success: function (message) {
        if (message == 1) {
          setConfirmUnload(false);
          $('#paper_alert').html('<div class="text-green strong"><i class="fa fa-spinner fa-spin"></i> Paper Submitted successfully.Wait while we are preparing answersheet.</div>');
          location.reload(true);
        }
        if (message == 2) {
          $('#paper_alert').html('<div class="text-red strong">Some Techanical Error!! Please Try to submit paper again!.</div>');
          $('button#submit_paper').prop('disabled', false);
        }
      },
      error: function () {
        $('#paper_alert').html('<div class="text-red strong">Paper Not submitted successfully.Please try again</div>');
        $('button#submit_paper').prop('disabled', false);
      }
    });
  });
});
