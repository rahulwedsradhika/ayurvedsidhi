$(function() {
	setConfirmUnload(true);
});
function countQues() {
  var total_ques = $('body').find("#total_ques").text();
  var solved = $('.solved').length;
  $('#no_attempt').text(solved-1);
  $('#no_unattempt').text(total_ques - (solved-1));
}
$('#sidebar').hide();
$('#dashboard_top_menu button').hide();
$('#dashboard_top_menu').html('<button class="btn btn-danger"><i class="fa fa-warning"></i> Do not reload this page</button>');
$('#dashboard_top_menu button').prop('disabled', true);

$('.sidebar-mini').addClass('sidebar-collapse');
$('.cont').addClass('hide');
$('#question_splitter_1').removeClass('hide');
$('#question_splitter_1').addClass('visible');
$(document).on('click', '.next', function () {
  last = parseInt($(this).attr('id'));
  console.log(last);
  nex = last + 1;
  $('#question_splitter_' + last).addClass('hide');
  $('#question_splitter_' + nex).removeClass('hide');
  $('#question_splitter_' + nex).addClass('visible');
  countQues();
});

$(":radio").click(function(){
 var radioName = $(this).attr("name"); //Get radio name
 $(":radio[name='"+radioName+"']:not(:checked)").attr("disabled", true); //Disable all unchecked radios with the same name
});
	
$(document).on('click', '.jump', function () {
  var clickedID = parseInt($(this).attr('id'));
  console.log(clickedID);
  $('.visible').addClass('hide');
  $('#question_splitter_' + clickedID).removeClass('hide');
  $('#question_splitter_' + clickedID).addClass('visible');
  countQues();
});
$(document).on('click', '.previous', function () {
  last = parseInt($(this).attr('id'));
  pre = last - 1;
  $('#question_splitter_' + last).addClass('hide');
  $('#question_splitter_' + pre).removeClass('hide');
  $('#question_splitter_' + pre).addClass('visible');
  countQues();
});

function QuesAttempt(clickID) {
  var element = document.getElementById(clickID);
  element.classList.add("solved");
  countQues();
}
	
var time = $('body').find("#total_time").text();
var c = (time * 60);
var t;
timedCount();

function increaseFontSize(id, increaseFactor) {
  txt = document.getElementById(id);
  style = window.getComputedStyle(txt, null).getPropertyValue('font-size');
  currentSize = parseFloat(style);
  txt.style.fontSize = (currentSize + increaseFactor) + 'px';
}

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
// Prevent accidental navigation away

function setConfirmUnload(on) {
  window.onbeforeunload = (on) ? unloadMessage : null;
}
	
function unloadMessage() {
$('#submit_warning').modal('show');
  return 'Your Answered Questions are resetted zero, Please select stay on page to continue your Quiz';	
}
function enableButtons() {
  $('button[type=button]').prop('disabled', false);
  $('button#submit_paper').prop('disabled', false);
}
//PAPER SUBMISSION
$( document ).ready( function () {
        $( "button#submit_paper" ).click( function () {
            $( '#paper_alert' ).html( '<span class="strong text-red"><i class="fa fa-spinner fa-spin"></i> Please wait while submitting the paper......<span>' );
            $( 'button#submit_paper' ).prop( 'disabled',true );
            $.ajax( {
                type: "POST",
                url: "ajax_paper.php",
                data: $( 'form.quiz_form' ).serialize(),
                success: function ( message ) {
                    if ( message == 1 ) {
						setConfirmUnload(false);
                        $( '#paper_alert' ).html( '<div class="text-green strong"><i class="fa fa-spinner fa-spin"></i> Paper Submitted successfully.Wait while we are preparing answersheet.</div>' );
						location.reload(true);
                    }
                    if ( message == 2 ) {
                        $( '#paper_alert' ).html( '<div class="text-red strong">Some Techanical Error!! Please Try to submit paper again!.</div>' );
						$( 'button#submit_paper' ).prop( 'disabled',false );
                    }
                },
                error: function () {
                    $( '#paper_alert' ).html( '<div class="text-red strong">Paper Not submitted successfully.Please try again</div>' );
                    $( 'button#submit_paper' ).prop( 'disabled',false );
                }
            } );
        } );
    } );


$(document).ready(function() {
    $(document).on('change', '.ques_ans', function(e) {
      e.preventDefault();
      var ques_id = $(this).data('ques');
      var quiz_id = $(this).data('quiz');// get id of clicked row
      var answer = $(this).data('value'); // get id of clicked row
	  var radioName = $(this).attr("name");
      $('#qr_'+ ques_id).html(''); // leave this div blank
		$('#qr_'+ ques_id).show();
      $( '#qr_'+ ques_id ).html( '<div class="text-green strong"><i class="fa fa-spinner fa-spin"></i> Loading answer....wait</div>' );
      $.ajax({
          url: 'ajax_practice_mode.php',
          type: 'POST',
          data: 'quiz_id='+ quiz_id + '&ques_id=' + ques_id + '&user_ans='+ answer,
          dataType: 'html'
        })
        .done(function(data) {
          console.log(data);
          $('#qr_'+ ques_id).html(''); // blank before load.
          $('#qr_'+ ques_id).html(data); // load here
        })
        .fail(function() {
		  $('#qr_'+ ques_id).html(''); // blank before load.
          $('#qr_'+ ques_id).html('<div class="text-red strong"><i class="glyphicon glyphicon-info-sign"></i> Something went wrong, Please try again...</div>');
		  $(":radio[name='"+radioName+"']").attr('checked', false);
		  $(":radio[name='"+radioName+"']:not(:checked)").attr("disabled", false);
        });
    });
  });

