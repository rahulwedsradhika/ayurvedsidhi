;
(function ($, window, document, undefined) {

  'use strict';

  $.quiz = function (el, options) {
    var base = this;

    // Access to jQuery version of element
    base.$el = $(el);

    // Add a reverse reference to the DOM object
    base.$el.data('quiz', base);

    //base.options = $.extend($.quiz.defaultOptions, options);
    base.options = $.extend({}, $.quiz.defaultOptions, options);

    var questions = base.options.questions,
      numQuestions = questions.length,
      startScreen = base.options.startScreen,
      startButton = base.options.startButton,
      homeButton = base.options.homeButton,
      resultsScreen = base.options.resultsScreen,
      gameOverScreen = base.options.gameOverScreen,
      currentQuestion = 1,
      score = 0,
      answerLocked = false;

    base.methods = {
      init: function () {
        base.methods.setup();

        /*$(document).on('click', startButton, function (e) {
        	e.preventDefault();
        	base.methods.start();
        });*/

        base.$el.on('click', startButton, function (e) {
          e.preventDefault();
          base.methods.start();
        });

        $(document).on('change', '#question-jump', function () {
          var questionNumber = parseInt($(this).val());
          if (!isNaN(questionNumber)) {
            base.methods.jumpToQuestion(questionNumber);
          }
        });

        $(document).on('click', homeButton, function (e) {
          e.preventDefault();
          base.methods.home();
        });

        $(document).on('click', 'label.ansOpt', function (e) {
          e.preventDefault();
          base.methods.answerQuestion(this);
        });

        $(document).on('click', '#quiz-next-btn', function (e) {
          e.preventDefault();
          base.methods.nextQuestion();
        });

        $(document).on('click', '#quiz-skip-btn', function (e) {
          e.preventDefault();
          base.methods.skipQuestion();
        });

        $(document).on('click', '#quiz-prev-btn', function (e) {
          e.preventDefault();
          base.methods.prevQuestion();
        });

        $(document).on('click', '#quiz-finish-btn', function (e) {
          e.preventDefault();
          base.methods.finish();
        });

        $(document).on('click', '#quiz-restart-btn, #quiz-retry-btn', function (e) {
          e.preventDefault();
          base.methods.restart();
        });
      },
      setup: function () {
        var quizHtml = '';


        if (base.options.counter) {
          quizHtml += '<div class="list-group q-jump-counter-container" style="display:none;"><div class="list-group-item"><div class="row">';
          quizHtml += '<div class="col-xs-6 border-right text-center"><label for="question-jump" class="mr-2 text-blue">Jump to Question</label></div>';
          quizHtml += '<div class="col-xs-6 text-blue text-center"><div id="quiz-counter"><div id="quiz-counter2"></div></div></div>';

          quizHtml += '</div></div>';
          // Add a dropdown for question navigation
          quizHtml += '<div class="list-group-item"><div id="question-jump-container" class="text-center mb-3">';
          //quizHtml += '';
          quizHtml += '<select id="question-jump" class="form-control" style="width: 100%;">';
          quizHtml += '<option value="">-- Select Question --</option>';
          $.each(questions, function (i, question) {
            quizHtml += '<option value="' + (i + 1) + '">' + (i + 1) + ' - ' + question.q + '</option>';
          });

          quizHtml += '</select>';
          quizHtml += '</div></div></div>';

          // Append the dropdown to the main quiz container
          //base.$el.prepend(quizHtml);
        }


        quizHtml += '<div id="questions">';

        $.each(questions, function (i, question) {

          quizHtml += '<div class="question-container">';
          quizHtml += '<div class="answers list-group">';
          quizHtml += '<label class="list-group-item bg-' + ((question.s === '1') ? "right" : "navy") + ' lab_wrap"><span class="list-group-item-heading text-justify">' + (++i) + '. ' + question.q + '</span></label>';

          quizHtml += '<label class="list-group-item no-gutter"><div class="row"><div class="btn-group btn-group-justified" role="group" aria-label="..."><div class="btn-group" role="group" id="S' + question.qid + '"><a data-toggle="tooltip" data-placement="top" title="Bookmark Question" data-icon="star" href="#BM' + question.qid + '" class="bookmark btn btn-flat btn-default text-' + ((question.b === '1') ? "green" : "yellow") + ' btn-xs" id="' + question.qid + '"><i class="fa fa-bookmark"></i> ' + ((question.b === '1') ? "Bookmarked" : "Bookmark") + '</a></div><div class="btn-group" role="group">';

          quizHtml += "<a onClick=\"document.getElementById('ques_id2').value='" + question.qid + "';\" type=\"button\" class=\"btn btn-flat btn-default text-blue btn-xs\" data-toggle=\"modal\" data-target=\"#quesNote\">";

          quizHtml += '<i class="fa fa-pencil"></i> Notes</a></div><div class="btn-group" role="group">';

          quizHtml += "<a class=\"btn btn-flat btn-default text-red btn-xs\" onClick=\"document.getElementById('ques_id').value='" + question.qid + "';\" data-toggle=\"modal\" data-target=\"#reportQues\">";

          quizHtml += '<i class="fa fa-exclamation-triangle text-maroon"></i> Report</a></div><div class="btn-group" role="group"> <a class="whatsapp btn btn-flat btn-default text-green btn-xs" data-id="' + question.qid + '" data-sec="catwise" data-text="*Q.' + question.qid + '*:' + encodeURI(question.q) + '" data-link="*Source: AyurQuest App & Website*"> <i class="fa fa-whatsapp text-green"> WhatsApp</i></a></div></div></div></label>';

          $.each(question.options, function (index, answer) {
            var option = '';
            if ((index + 1) === 1) {
              option = 'A';
            }
            if ((index + 1) === 2) {
              option = 'B';
            }
            if ((index + 1) === 3) {
              option = 'C';
            }
            if ((index + 1) === 4) {
              option = 'D';
            }
            quizHtml += '<label id="' + question.qid + index + '" data-qid="' + question.qid + '" data-index="' + index + '" class="ansOpt list-group-item lb-justify"><a href="#" class="list-group-item-text"><strong>(' + (option) + ') </strong>' + answer + '</a></label>';
          });
          quizHtml += '<label class="list-group-item lb-justify" style="display:none;" id="quiz-response"></label>';
          quizHtml += '</div>';
          quizHtml += '</div>';
        });

        quizHtml += '</div>';

        // if results screen not in DOM, add it
        if ($(resultsScreen).length === 0) {
          quizHtml += '<div id="' + resultsScreen.substr(1) + '">';
          quizHtml += '<h2 class="text-center" id="quiz-results"></h2>';
          quizHtml += '</div>';
        }
        quizHtml += '<div id="skip"><a href="#" id="quiz-skip-btn" class="btn btn-default btn-block text-navy strong btn-sm">SKIP <i class="fa fa-chevron-circle-right"></i> </a></div>';

        quizHtml += '<div id="next"><a href="#" id="quiz-next-btn" class="btn btn-default btn-block text-navy strong btn-sm">NEXT <i class="fa fa-chevron-circle-right"></i> </a></div>';

        quizHtml += '<div id="prev_skip" class="btn-group btn-group-justified mt-5" role="group"><div class="btn-group" role="group"><a href="#" id="quiz-prev-btn" class="btn btn-default btn-block text-navy strong btn-sm"><i class="fa fa-chevron-circle-left"></i> PREV  </a></div><div class="btn-group" role="group"><a href="#" id="quiz-skip-btn" class="btn btn-default btn-block text-navy strong btn-sm">SKIP <i class="fa fa-chevron-circle-right"></i></a></div></div>';

        quizHtml += '<div id="prev_next" class="btn-group btn-group-justified mt-5" role="group"><div class="btn-group" role="group"><a href="#" id="quiz-prev-btn" class="btn btn-default btn-block text-navy strong btn-sm"><i class="fa fa-chevron-circle-left"></i> PREV  </a></div><div class="btn-group" role="group"><a href="#" id="quiz-next-btn" class="btn btn-default btn-block text-navy strong btn-sm">NEXT <i class="fa fa-chevron-circle-right"></i> </a></div></div>';

        quizHtml += '<div id="prev_finish" class="btn-group btn-group-justified mt-5" role="group"><div class="btn-group" role="group"><a href="#" id="quiz-prev-btn" class="btn btn-default btn-block text-navy strong btn-sm"><i class="fa fa-chevron-circle-left"></i> PREV  </a></div><div class="btn-group" role="group"><a href="#" id="quiz-finish-btn" class="btn btn-success btn-block btn-sm">Show Result</a></div></div>';


        //quizHtml += '<a href="#" id="quiz-prev-btn" class="col-xs-6 btn btn-default text-blue strong btn-sm pull-left"><i class="fa fa-chevron-circle-left"></i> PREV  </a>';

        //quizHtml += '<div id="quiz-controls" class="btn-fixed">';
        //quizHtml += '<div id="quiz-buttons">';
        //quizHtml += '<a href="#" id="quiz-next-btn" class="col-xs-6 btn btn-default text-blue strong btn-sm pull-right">NEXT <i class="fa fa-chevron-circle-right"></i> </a>';
        //quizHtml += '<a href="#" id="quiz-finish-btn" class="btn btn-success btn-block">Show Result</a>';
        //quizHtml += '<a href="#" id="quiz-restart-btn" class="btn btn-success btn-block">Restart</a>';

        //quizHtml += '</div>';
        //quizHtml += '</div>';

        base.$el.append(quizHtml).addClass('quiz-container quiz-start-state');

        $('#quiz-counter').hide();
        $('.question-container').hide();
        $(gameOverScreen).hide();
        $(resultsScreen).hide();
        $('#next').hide();
        $('#skip').hide();
        $('#prev_skip').hide();
        $('#prev_next').hide();
        $('#prev_finish').hide();
      },
      jumpToQuestion: function (questionNumber) {
        if (questionNumber < 1 || questionNumber > numQuestions) {
          return;
        }

        answerLocked = false;
        currentQuestion = questionNumber;

        // Hide all questions and show the selected one
        $('.question-container')
          .hide()
          .removeClass('active-question')
          .eq(questionNumber - 1)
          .slideDown()
          .addClass('active-question');

        base.methods.updateCounter();
      },

      start: function () {

        base.$el.removeClass('quiz-start-state').addClass('quiz-questions-state');
        $(startScreen).hide();

        //$('#quiz-controls').hide();
        //$('#quiz-finish-btn').hide();
        //$('#quiz-restart-btn').hide();
        $('.q-jump-counter-container').show();
        $('#quizInfo').hide();
        $('#questions').show();
        $('#quiz-counter').show();
        $('#skip').show();
        $('.question-container:first-child').show().addClass('active-question');
        base.methods.updateCounter();
      },
      answerQuestion: function (answerEl) {
        if (answerLocked) {
          return;
        }
        answerLocked = true;
        $('label#quiz-response').slideDown();
        $('#skip').hide();
        //$('#quiz-prev-btn').hide();
        $('label#quiz-response').html('<span class="strong text-red"><i class="fa fa-spinner fa-spin"></i> Please wait.. while loading your answer<span>');

        var $answerEl = $(answerEl),
          response = '',
          selected = $answerEl.data('index'),
          qid = $answerEl.data('qid'),
          currentQuestionIndex = currentQuestion - 1,
          correct = questions[currentQuestionIndex].correctIndex;

        $.ajax({
          cache: false,
          type: "GET",
          url: "ajax_gk_ques_solved.php",
          data: "qid=" + qid + "&user_ans=" + (selected + 1) + "",
          timeout: 5000,
          success: function (msg) {
            if (msg === '1') {
              if (selected === correct) {
                $answerEl.addClass('list-group-item-success strong');
                response = questions[currentQuestionIndex].correctResponse;
                score++;
              } else {
                $answerEl.addClass('list-group-item-danger strong');
                $('#' + qid + correct + '').addClass('list-group-item-success strong');
                //$answerEl.correct.addClass('list-group-item-success strong');
                response = questions[currentQuestionIndex].incorrectResponse;
                if (!base.options.allowIncorrect) {
                  base.methods.gameOver(response);
                  return;
                }
              }
              $('label#quiz-response').slideDown();
              $('label#quiz-response').html(response);
              //$('#prev_next').slideDown();
              //$('#skip').hide();
              //$('#prev_skip').hide();
            }
          },
          error: function () {
            answerLocked = false;
            //currentQuestion = currentQuestion - 1;
            $('label#quiz-response').show();
            $('label#quiz-response').html('<span class="strong text-red"><i class="fa fa-exclamation-circle"></i> Oops!! Some error in showing answer please select your answer again</span>');
            $('#next').hide();
            $('#prev_next').hide();
            $('#prev_finish').hide();
          }
        });

        if (currentQuestion <= 1) {
          $('#next').show();
        } else {
          $('#prev_next').show();
          $('#prev_skip').hide();
        }
        // check to see if we are at the last question
        if (currentQuestion === numQuestions) {
          //$('#quiz-next-btn').hide();
          //$('#quiz-prev-btn').hide();
          $('#prev_next').hide();
          $('#prev_finish').show();
        }
        base.methods.updateCounter();
        if (typeof base.options.answerCallback === 'function') {
          base.options.answerCallback(currentQuestion, selected === correct);
        }
      },
      nextQuestion: function () {
        answerLocked = false;
        currentQuestion = currentQuestion + 1;

        $('.active-question')
          .hide()
          .removeClass('active-question')
          .next('.question-container')
          .slideDown()
          .addClass('active-question');

        $('#skip').show();
        //$('#quiz-controls').hide();
        $('label#quiz-response').hide();

        if (currentQuestion <= 1) {
          $('#skip').show();
        } else {
          $('#prev_skip').show();
          $('#skip').hide();
          $('#next').hide();
          $('#prev_next').hide();
        }
        // check to see if we are at the last question
        if (currentQuestion === numQuestions + 1) {
          $('#prev_finish').show();
          //$('#quiz-finish-btn').show();
        }
        base.methods.updateCounter();

        if (typeof base.options.nextCallback === 'function') {
          base.options.nextCallback();
        }
      },
      skipQuestion: function () {
        answerLocked = false;
        currentQuestion = currentQuestion + 1;
        $('.active-question')
          .hide()
          .removeClass('active-question')
          .next('.question-container')
          .slideDown()
          .addClass('active-question');
        //$('#quiz-controls').hide();
        $('label#quiz-response').hide();
        if (currentQuestion <= 1) {
          $('#prev_skip').hide();
          $('#prev_next').hide();
          $('#skip').show();
        } else {
          $('#prev_skip').show();
          $('#prev_next').hide();
          $('#prev_finish').hide();
          $('#skip').hide();
        }
        // check to see if we are at the last question
        if (currentQuestion === numQuestions + 1) {
          $('#prev_skip').hide();
          $('#prev_finish').show();
          base.methods.finish();
        }
        base.methods.updateCounter();
      },
      prevQuestion: function () {
        answerLocked = false;
        currentQuestion = currentQuestion - 1;
        $('.active-question')
          .hide()
          .removeClass('active-question')
          .prev('.question-container')
          .slideDown()
          .addClass('active-question');
        //$('#quiz-controls').hide();
        $('label#quiz-response').hide();
        if (currentQuestion <= 1) {
          $('#skip').show();
          $('#prev_skip').hide();
          $('#prev_next').hide();
          $('#prev_finish').hide();
        } else {
          $('#prev_next').hide();
          $('#prev_finish').hide();
          $('#skip').hide();
          $('#prev_skip').show();
        }
        base.methods.updateCounter();

      },
      gameOver: function (response) {
        // if gameover screen not in DOM, add it
        if ($(gameOverScreen).length === 0) {
          var quizHtml = '';
          quizHtml += '<div id="' + gameOverScreen.substr(1) + '">';
          quizHtml += '<p id="quiz-gameover-response"></p>';
          quizHtml += '<p><a href="#" id="quiz-retry-btn">Retry</a></p>';
          quizHtml += '</div>';
          base.$el.append(quizHtml);
        }
        $('#quiz-gameover-response').html(response);
        $('#quiz-counter').hide();
        $('#questions').hide();
        $(gameOverScreen).show();
      },
      finish: function () {
        base.$el.removeClass('quiz-questions-state').addClass('quiz-results-state');
        $('.active-question').hide().removeClass('active-question');
        $('#quiz-counter').hide();
        $('label#quiz-response').hide();
        $('#skip').hide();
        $('#next').hide();
        $('#prev_skip').hide();
        $('#prev_next').hide();
        $('#prev_finish').hide();
        $(resultsScreen).show();
        $('#quiz-more-btn').show();

        $('#quiz-results').html('You got ' + score + ' out of ' + numQuestions + ' correct!');
        if (typeof base.options.finishCallback === 'function') {
          base.options.finishCallback();
        }
      },
      restart: function () {
        base.methods.reset();
        base.$el.addClass('quiz-questions-state');
        $('#questions').show();
        $('#quiz-counter').show();
        $('.question-container:first-child').show().addClass('active-question');
        base.methods.updateCounter();
      },
      reset: function () {
        answerLocked = false;
        currentQuestion = 1;
        score = 0;
        $('.answers a').removeClass('bg-green strong bg-red strong');
        base.$el.removeClass().addClass('quiz-container');
        $('#quiz-restart-btn').hide();
        $(gameOverScreen).hide();
        $(resultsScreen).hide();
        $('#quiz-controls').hide();
        $('label#quiz-response').hide();
        $('#quiz-next-btn').show();
        $('#quiz-counter').hide();
        $('.active-question').hide().removeClass('active-question');
      },
      home: function () {
        base.methods.reset();
        base.$el.addClass('quiz-start-state');
        $(startScreen).show();

        if (typeof base.options.homeCallback === 'function') {
          base.options.homeCallback();
        }
      },
      updateCounter: function () {
        var countStr = base.options.counterFormat
          .replace('%current', Math.min(currentQuestion, numQuestions))
          .replace('%total', numQuestions);
        $('#quiz-counter2').html(countStr);

        // Reset dropdown selection to the current question
        $('#question-jump').val(currentQuestion);
      }

    };

    base.methods.init();
  };

  $.quiz.defaultOptions = {
    allowIncorrect: true,
    counter: true,
    counterFormat: '%current/%total',
    startScreen: '#quiz-start-screen',
    startButton: '#quiz-start-btn',
    homeButton: '#quiz-home-btn',
    resultsScreen: '#quiz-results-screen',
    gameOverScreen: '#quiz-gameover-screen'
  };

  $.fn.quiz = function (options) {
    return this.each(function () {
      new $.quiz(this, options);
    });
  };
}(jQuery, window, document));
