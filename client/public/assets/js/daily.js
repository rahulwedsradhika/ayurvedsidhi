//Eacj mcq timer
var Clock = {
  totalSeconds: 1,
  startTimer: function () {
    if (!this.interval) {
      var self = this;

      function pad(val) {
        return val > 9 ? val : "0" + val;
      }
      this.interval = setInterval(function () {
        self.totalSeconds += 1;
        $('.uptimer').html(pad(Math.floor(self.totalSeconds / 60 % 60)) + ":" + pad(parseInt(self.totalSeconds % 60)));
        $('.ques_ans').attr("data-time", pad(Math.floor(self.totalSeconds / 60 % 60)) + ":" + pad(parseInt(self.totalSeconds % 60)));
      }, 1000);
    }
  },
  resetTimer: function () {
    Clock.totalSeconds = null;
    clearInterval(this.interval);
    $('.uptimer').html("00:00");
    delete this.interval;
  },
  pauseTimer: function () {
    clearInterval(this.interval);
    delete this.interval;
  },
  resumeTimer: function () {
    this.startTimer();
  },
};

//$(".guess_ans").on("click", function () {
$(document).on('click', '.guess_ans', function () {
  var mcq_id = $(this).attr('id');
  $('input[data-ques_id=' + mcq_id + ']').attr('data-guess', 1);
});

//answer the mcq
function disableOpt() {
  $(":radio").click(function () {
    var radioName = $(this).attr("name"); //Get radio name
    $(":radio[name='" + radioName + "']:not(:checked)").attr("disabled", true);
    Clock.pauseTimer();
  });
}

//attemp mcq
function QuesAttempt(clickID) {
  var element1 = clickID + 'PL';
  var element3 = document.getElementById(element1);
  element3.classList.add("solved");
  $("#" + element1).attr("disabled", false);
  $(".btn" + clickID).attr("disabled", false);
  var element2 = clickID + 'QL';
  var element4 = document.getElementById(element2);
  element4.classList.add("solved2");
}

// Prevent accidental navigation away
$(function () {
  setConfirmUnload(true);
});

function setConfirmUnload(on) {
  window.onbeforeunload = (on) ? unloadMessage : null;
}

function unloadMessage() {
  $('#submit_warning').modal('show');
  return 'Your Answered Questions are resetted zero, Please select stay on page to continue your Quiz';
}

//add selected answer to database
$(document).ready(function () {
  $(document).on('change', '.ques_ans', function (e) {
    e.preventDefault();
    var mcq_source_id = $(this).data('mcq_source_id');
    var ques_id = $(this).data('ques_id');
    var answer = $(this).data('answer');
    var time = $(this).data('time');
    var guess = $(this).data('guess');
    var radioName = $(this).attr("name");
    $('#qr_' + ques_id).html(''); // leave this div blank
    $('#qr_' + ques_id).show();
    $('#qr_' + ques_id).html('<div class="text-green strong"><i class="fa fa-spinner fa-spin"></i> Loading answer....wait</div>');
    $.ajax({
        url: 'ajax_rfc_mcq.php',
        type: 'POST',
        data: 'mcq_source_id=' + mcq_source_id + '&ques_id=' + ques_id + '&answer=' + answer + '&time=' + time + '&guess=' + guess,
        dataType: 'html'
      })
      .done(function (data) {
        console.log(data);
        //disableOpt();
        $('#qr_' + ques_id).html(''); // blank before load.
        $('#qr_' + ques_id).html(data); // load here
        //disableOpt();
        $(":radio[name='" + radioName + "']:not(:checked)").attr("disabled", true);
        $("#" + ques_id).attr("disabled", true);
        Clock.pauseTimer();
      })
      .fail(function () {
        $('#qr_' + ques_id).html(''); // blank before load.
        $('#qr_' + ques_id).html('<div class="text-red strong"><i class="glyphicon glyphicon-info-sign"></i> Something went wrong, Please try again...</div>');
        $(":radio[name='" + radioName + "']").attr('checked', false);
        $(":radio[name='" + radioName + "']:not(:checked)").attr("disabled", false);
      });
  });
});
//submit sticky note
$(document).ready(function () {
  $(document).on('click', '#sticky_note', function (e) {
    e.preventDefault();
    var ques_id = $(this).data('id'); // get id of clicked row
    var title = $(this).data("title");
    $('#myModalLabel').html(' <i class="fa fa-pencil"> </i> ' + title);
    $('#alert').html('');
    $('#dynamic-content').html(''); // leave this div blank
    $('#modal-loader').show(); // load ajax loader on button click
    $.ajax({
        url: 'ajax_sticky_note.php',
        type: 'POST',
        data: 'check_ques_id=' + ques_id,
        dataType: 'html'
      })
      .done(function (data) {
        console.log(data);
        $('#dynamic-content').html(''); // blank before load.
        $('#dynamic-content').html(data); // load here
        $('#modal-loader').hide(); // hide loader  
      })
      .fail(function () {
        $('#dynamic-content').html('<i class="glyphicon glyphicon-info-sign"></i> Something went wrong, Please try again...');
        $('#modal-loader').hide();
      });
  });
});
$(document).ready(function () {
  //$("button#notesB").click(function(){
  $(document).on('click', 'button#submit_note', function (e) {
    $('#alert').html('<span class="strong text-red"><i class="fa fa-spinner fa-spin"></i> Please wait while adding sticky notes......<span>');
    $("#notesform").hide();
    $("#submit_note").hide();
    $.ajax({
      type: "POST",
      url: "ajax_sticky_note.php",
      data: $('form.notesform').serialize(),
      success: function (message) {
        if (message == 1) {
          $('#alert').html('<div class="text-green strong">Sticky notes added successfully</div>');
          setTimeout(function () {
            $('#alert').html('');
            $("#notesform").show();
            $('textarea#notes').val('');
            $("#submit_note").show();
            $('#ques_actions').modal('hide');
          }, 3000);
        }
        if (message == 2) {
          $('#alert').html('<div class="text-red strong">Please add few line of  notes in text area</div>');
          $("#notesform").show();
          $("#submit_note").show();
        }
        if (message == 3) {
          $('#alert').html('<div class="text-red strong">Sticky Notes not added  successfully.Please try again</div>');
          $("#notesform").show();
          $("#submit_note").show();
        }
      },
      error: function () {
        $('#alert').html('<div class="text-red strong">Sticky Notes not added  successfully.Please try again</div>');
        $("#notesform").show();
        $("#submit_note").show();
      }
    });
  });
});
//report question
$(document).ready(function () {
  $(document).on('click', '#report', function (e) {
    e.preventDefault();
    var ques_id = $(this).data('id'); // get id of clicked row
    var title = $(this).data("title");
    $('#myModalLabel').html(' <i class="fa fa-exclamation-triangle text-red"> </i> ' + title);
    $('#alert').html('');
    $('#dynamic-content').html(''); // leave this div blank
    $('#modal-loader').show(); // load ajax loader on button click
    $.ajax({
        url: 'ajax_report.php',
        type: 'POST',
        data: 'check_ques_id=' + ques_id,
        dataType: 'html'
      })
      .done(function (data) {
        console.log(data);
        $('#dynamic-content').html(''); // blank before load.
        $('#dynamic-content').html(data); // load here
        $('#modal-loader').hide(); // hide loader  
      })
      .fail(function () {
        $('#dynamic-content').html('<i class="glyphicon glyphicon-info-sign"></i> Something went wrong, Please try again...');
        $('#modal-loader').hide();
      });
  });
});
$(document).ready(function () {
  //$( "#submit_report" ).click( function () {
  //$( "questions" ).on('click','button#report', function () {
  $(document).on('click', '#submit_report', function (e) {
    $('#alert').html('<span class="strong text-red"><i class="fa fa-spinner fa-spin"></i> Please wait while reporting this question......<span>');
    $("#reportform").hide();
    $("#submit_report").hide();
    $.ajax({
      type: "POST",
      url: "ajax_report.php",
      data: $('form.reportform').serialize(),
      success: function (message) {
        if (message == 1) {
          $('#alert').html('<div class="text-green strong">Question reported successfully</div>');
          setTimeout(function () {
            $('#alert').html('');
            $("#reportform").show();
            $('textarea#comment').val('');
            $("#submit_report").show();
            $('#ques_actions').modal('hide');
          }, 3000);
        }
        if (message == 2) {
          $('#alert').html('<div class="text-red strong">Please post a comment about your report.</div>');
          $("#reportform").show();
          $("#submit_report").show();
        }
        if (message == 3) {
          $('#alert').html('<div class="text-red strong">Question not reported successfully.Please try again</div>');
          $("#reportform").show();
          $("#submit_report").show();
        }
      },
      error: function () {
        $('#alert').html('<div class="text-red strong">Question not reported successfully.Please try again</div>');
        $("#reportform").show();
        $("#submit_report").show();
      }
    });
  });
});
////bookmark a question
$(document).on('click', '#bookmark', function (e) {
  var que_id = $(this).data('id');
  $("#S" + que_id).html('<a class="btn btn-flat btn-xs btn-default text-red"><i class="fa fa-spinner fa-spin"></i> wait</a>');
  $.ajax({
    cache: false,
    type: 'POST',
    url: 'ajax_bookmark.php',
    data: 'que_id=' + que_id,
    success: function (msg) {
      if (msg == 1) {
        $("#S" + que_id).html('<a id="bookmark" data-icon="star" data-id="' + que_id + '" data-toggle="tooltip" data-placement="top" title="Bookmark Question" class="bookmark btn btn-white text-green btn-xs"><i class="fa fa-bookmark"></i> Bookmarked</a>');
      }
      if (msg == 2) {
        $("#S" + que_id).html('<a id="bookmark" data-icon="star" data-id="' + que_id + '" data-toggle="tooltip" data-placement="top" title="Bookmark Question" class="bookmark btn btn-white text-yellow btn-xs"><i class="fa fa-bookmark"></i> Bookmark</a>');
      }
      if (msg == 3) {
        swal({
            title: "OOPS!! Bookmark Limit Reached!!",
            text: "Hello <?php echo getUser('name');?>, You have reached yur maximum bookmark limit. Please delete some bookmarks if you want to add this question to bookmarks.",
            type: "error",
            showCancelButton: true,
            confirmButtonColor: "#00a65a",
            confirmButtonText: "Delete Bookmarks",
            closeOnConfirm: false
          },
          function () {
            window.location.href = 'bookmarks.php';
          }
        );
      }
    },
    error: function (statusCode, errorThrown) {
      if (statusCode.status == 0) {
        alert("you're offline");
      }
    }
  });
});
//Guess Tracker notice
$(document).ready(function () {
  $(document).on('click', '#guess_info', function (e) {
    e.preventDefault();
    var ques_id = $(this).data('id'); // get id of clicked row
    var title = $(this).data("title");
    $('#myModalLabel').html(' <i class="fa fa-lightbulb-o"> </i> ' + title);
    $('#alert').html('');
    $('#dynamic-content').html(''); // leave this div blank
    $('#modal-loader').show(); // load ajax loader on button click
    $.ajax({
        url: 'ajax_guess_tracker.php',
        type: 'POST',
        data: 'check_ques_id=' + ques_id,
        dataType: 'html'
      })
      .done(function (data) {
        console.log(data);
        $('#dynamic-content').html(''); // blank before load.
        $('#dynamic-content').html(data); // load here
        $('#modal-loader').hide(); // hide loader  
      })
      .fail(function () {
        $('#dynamic-content').html('<i class="glyphicon glyphicon-info-sign"></i> Something went wrong, Please try again...');
        $('#modal-loader').hide();
      });
  });
});
