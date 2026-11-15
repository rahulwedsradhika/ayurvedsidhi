(function ($, window, document, undefined) {

  'use strict';

  $.quiz = function (el, options) {
    var base = this;

    // Access to jQuery version of element
    base.$el = $(el);

    // Add a reverse reference to the DOM object
    base.$el.data('quiz', base);

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
      questionsSolved = 0,
      answerLocked = false;

    base.methods = {
      init: function () {
        base.methods.setup();

        base.$el.on('click', startButton, function (e) {
          e.preventDefault();
          base.methods.start();
        });

        base.$el.on('change', '#question-jump', function () {
          var questionNumber = parseInt($(this).val());
          if (!isNaN(questionNumber)) {
            base.methods.jumpToQuestion(questionNumber);
          }
        });

        base.$el.on('click', homeButton, function (e) {
          e.preventDefault();
          base.methods.home();
        });

        base.$el.on('click', 'li.ansOpt', function (e) {
          e.preventDefault();
          base.methods.answerQuestion(this);
        });

        base.$el.on('click', '#quiz-next-btn', function (e) {
          e.preventDefault();
          base.methods.nextQuestion();
        });

        base.$el.on('click', '#quiz-skip-btn', function (e) {
          e.preventDefault();
          base.methods.skipQuestion();
        });

        base.$el.on('click', '#quiz-prev-btn', function (e) {
          e.preventDefault();
          base.methods.prevQuestion();
        });

        base.$el.on('click', '#quiz-finish-btn', function (e) {
          e.preventDefault();
          base.methods.finish();
        });

        base.$el.on('click', '#quiz-restart-btn, #quiz-retry-btn', function (e) {
          e.preventDefault();
          base.methods.restart();
        });
      },
      setup: function () {
        var quizHtml = '';

        function createQuestionOptions(questions) {
          return questions.map((q, i) => '<option value="' + (i + 1) + '"><strong>' + (i + 1) + ' - </strong>' + q.q + '</option>').join('');
        }
        if (base.options.counter) {
          quizHtml += '<div id="score_card" class="list-group q-jump-counter-container" style="display:none;"><div class="list-group-item"><div class="row text-red text-center strong live_score">Score: 0/0</div><div class="row">';
          quizHtml += '<div class="col-xs-6 border-right text-left"><label for="question-jump" class="mr-2 text-blue">Jump to Question </label></div>';
          quizHtml += '<div class="col-xs-6 text-blue text-right"><div id="quiz-counter"><div id="quiz-counter2"></div></div></div>';

          quizHtml += '</div></div>';
          // Add a dropdown for question navigation
          quizHtml += '<div class="list-group-item"><div id="question-jump-container" class="text-center mb-3">';
          //quizHtml += '';
          quizHtml += '<select id="question-jump" class="form-control" style="width: 100%;">';
          quizHtml += '<option value="">-- Select Question --</option>';
          quizHtml += createQuestionOptions(questions);
          quizHtml += '</select>';
          quizHtml += '</div></div></div>';
          // Append the dropdown to the main quiz container
        }
        quizHtml += '<div id="questions">';

        $.each(questions, function (i, question) {

          quizHtml += '<div class="question-container">';
          quizHtml += '<ul class="answers list-group">';
          quizHtml += '<li class="list-group-item text-justify strong lab_wrap">' + (++i) + '. ' + question.q + '</li>';

          quizHtml += '<li class="list-group-item no-gutter"><div class="row"><div class="btn-group btn-group-justified" role="group" aria-label="..."><div class="btn-group" role="group" id="S' + question.qid + '"><a data-toggle="tooltip" data-placement="top" title="Bookmark Question" data-icon="star" href="#BM' + question.qid + '" class="bookmark btn btn-flat bg-gray-light text-' + ((question.b === '1') ? "green" : "yellow") + ' btn-xs" id="' + question.qid + '"><i class="fa fa-bookmark"></i> ' + ((question.b === '1') ? "Bookmarked" : "Bookmark") + '</a></div><div class="btn-group" role="group">';

          quizHtml += "<a onClick=\"document.getElementById('ques_id2').value='" + question.qid + "';\" type=\"button\" class=\"btn btn-flat bg-gray-light text-blue btn-xs\" data-toggle=\"modal\" data-target=\"#quesNote\">";

          quizHtml += '<i class="fa fa-pencil"></i> Notes</a></div><div class="btn-group" role="group">';

          quizHtml += "<a class=\"btn btn-flat bg-gray-light text-red btn-xs\" onClick=\"document.getElementById('ques_id').value='" + question.qid + "';\" data-toggle=\"modal\" data-target=\"#reportQues\">";

          quizHtml += '<i class="fa fa-exclamation-triangle text-maroon"></i> Report</a></div></div></div></li>';

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
            quizHtml += '<li id="' + question.qid + index + '" data-qid="' + question.qid + '" data-index="' + index + '" class="ansOpt list-group-item lb-justify"><a href="#" class="list-group-item-text">(' + (option) + ')' + answer + '</a></li>';
          });
          quizHtml += '<li class="list-group-item lb-justify" style="display:none;" id="quiz-response"></li>';
          quizHtml += '</div>';
          quizHtml += '</ul>';
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
        quizHtml += '<div id="page_bottom"></div>';

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
      /*      jumpToQuestion: function (questionNumber) {
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
              $('li#quiz-response').hide();
              if (currentQuestion <= 1) {
                $('#skip').show();
                $('#next').hide();
                $('#prev_next').hide();
                $('#prev_skip').hide();
              } else {
                $('#prev_skip').show();
                $('#skip').hide();
                $('#next').hide();
                $('#prev_next').hide();
              }
              base.methods.updateCounter();
            },*/

      jumpToQuestion: function (questionNumber) {
        if (questionNumber < 1 || questionNumber > numQuestions) {
          return;
        }
        answerLocked = false;
        currentQuestion = questionNumber;
        $('.question-container')
          .hide()
          .removeClass('active-question')
          .eq(questionNumber - 1)
          .slideDown()
          .addClass('active-question');
        $('li#quiz-response').hide();
        $('#skip').toggle(currentQuestion <= 1);
        $('#prev_skip').toggle(currentQuestion > 1);
        $('#prev_next, #prev_finish').hide();
        if (currentQuestion === numQuestions) {
          //$('#prev').toggle();
          $('#prev_skip').toggle();
          $('#prev_finish').show();
        }
        base.methods.updateCounter();
      },
      /*      start: function () {
              base.$el.removeClass('quiz-start-state').addClass('quiz-questions-state');
              $(startScreen).hide();
              $('.q-jump-counter-container').show();
              $('#quizInfo').hide();
              $('#questions').show();
              $('#quiz-counter').show();
              $('#skip').show();
              $('.question-container:first-child').show().addClass('active-question');
              base.methods.updateCounter();
            },*/
      start: function () {
        base.$el.removeClass('quiz-start-state').addClass('quiz-questions-state');
        $(startScreen).hide();
        $('#questions').show();
        $('.q-jump-counter-container').show();
        $('#quiz-counter').show();
        $('#skip').show();
        $('.question-container:first-child').show().addClass('active-question');
        base.methods.updateCounter();
      },
      answerQuestion: function (answerEl) {
        if (answerLocked) {
          return;
        }
        var $questionContainer = $(answerEl).closest('.question-container');
        if ($questionContainer.hasClass('locked')) {
          $('li#quiz-response').slideDown();
          $('li#quiz-response').prepend('<div class="strong text-red">This question has already been solved.<div>');
          answerLocked = true;
          return;
        }
        let retryCount = 0;
        const maxRetries = 5;

        const $answerEl = $(answerEl);
        const selected = $answerEl.data('index');
        const qid = $answerEl.data('qid');
        const currentQuestionIndex = currentQuestion - 1;
        const correct = questions[currentQuestionIndex].correctIndex;

        answerLocked = true;
        $('li#quiz-response').slideDown();
        $('#skip').hide();
        $('li#quiz-response').html('<span class="strong text-red"><i class="fa fa-spinner fa-spin"></i> Please wait... loading your answer<span>');

        async function fetchAnswer() {
          try {
            const response = await fetch(`ajax_ques_solved.php?qid=${qid}&user_ans=${selected + 1}&t=${new Date().getTime()}`, {
              method: 'GET',
              headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate'
              }
            });

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            const msg = await response.text();

            if (msg === '1') {
              let responseText;
              if (selected === correct) {
                $answerEl.addClass('list-group-item-success strong');
                responseText = questions[currentQuestionIndex].correctResponse;
                score++;

              } else {
                $answerEl.addClass('list-group-item-danger strong');
                $(`#${qid}${correct}`).addClass('list-group-item-success strong');
                responseText = questions[currentQuestionIndex].incorrectResponse;

                if (!base.options.allowIncorrect) {
                  base.methods.gameOver(responseText);
                  return;
                }
              }

              questionsSolved++;
              $('.live_score').html(`Score: ${score}/${questionsSolved} - Percentage: (${Math.round((score / questionsSolved) * 100)}%)`);
              $questionContainer.addClass('locked');
              $questionContainer.find('.ansOpt').off('click');
              $('li#quiz-response').html(responseText);
              $('html, body').animate({
                scrollTop: $("#page_bottom").offset().top
              }, 800);
            }
          } catch (error) {
            retryCount++;
            if (retryCount <= maxRetries) {
              fetchAnswer();
            } else {
              console.error('Fetch Error:', error);
              $('li#quiz-response').html('<br><span class="strong text-red"><i class="fa fa-exclamation-circle"></i> Oops! An error occurred. Please try again.</span>');
            }
          } finally {
            answerLocked = false;
          }
        }

        fetchAnswer();
        if (currentQuestion <= 1) {
          $('#next').show();
        } else {
          $('#prev_next').show();
          $('#prev_skip').hide();
        }

        // Check to see if we are at the last question
        if (currentQuestion === numQuestions) {
          $('#prev_next').hide();
          $('#prev_finish').show();
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
        $('li#quiz-response').hide();
        $('html, body').animate({
          scrollTop: $("#score_card").offset().top
        }, 800);
        if (currentQuestion <= 1) {
          $('#skip').show();
        } else {
          $('#prev_skip').show();
          $('#skip').hide();
          $('#next').hide();
          $('#prev_next').hide();
        }
        // check to see if we are at the last question
        if (currentQuestion === numQuestions) {
          $('#prev_skip').hide();
          $('#prev_finish').show();
        }
        base.methods.updateCounter();

        if (typeof base.options.nextCallback === 'function') {
          base.options.nextCallback();
        }
      },
      /*skipQuestion: function () {
        answerLocked = false;
        currentQuestion = currentQuestion + 1;
        $('.active-question')
          .hide()
          .removeClass('active-question')
          .next('.question-container')
          .slideDown()
          .addClass('active-question');
        //$('#quiz-controls').hide();
        $('li#quiz-response').hide();
        $('#skip').toggle(currentQuestion <= 1);
        $('#prev_skip').toggle(currentQuestion > 1);
        $('#prev_next, #prev_finish').hide();

        // check to see if we are at the last question
        if (currentQuestion === numQuestions + 1) {
          $('#prev_skip').hide();
          $('#prev_finish').show();
          base.methods.finish();
        }
        base.methods.updateCounter();
      },*/
      skipQuestion: function () {
        answerLocked = false;
        currentQuestion = currentQuestion + 1;
        $('.active-question')
          .hide()
          .removeClass('active-question')
          .next('.question-container')
          .slideDown()
          .addClass('active-question');
        $('li#quiz-response').hide();
        $('#skip').toggle(currentQuestion <= 1);
        $('#prev_skip').toggle(currentQuestion > 1);
        $('#prev_next, #prev_finish').hide();
        if (currentQuestion === numQuestions) {
          $('#prev_skip').hide();
          $('#prev_finish').show();
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
        $('li#quiz-response').hide();
        $('#skip').toggle(currentQuestion <= 1);
        $('#prev_skip').toggle(currentQuestion > 1);
        $('#prev_next, #prev_finish').hide();

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
        //$('#quiz-counter').hide();
        $('li#quiz-response').hide();
        $('#skip').hide();
        $('#score_card').hide();
        $('#next').hide();
        $('#prev_skip').hide();
        $('#prev_next').hide();
        $('#prev_finish').hide();
        $(resultsScreen).show();
        $('#quiz-more-btn').show();

        $('#quiz-results').html('Your score is ' + score + ' out of ' + questionsSolved + ', which gives you a percentage of ' + Math.round((score / questionsSolved * 100)) + '%');
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
        $('li#quiz-response').hide();
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
        if ($('#quiz-counter2').length) {
          const countStr = base.options.counterFormat
            .replace('%current', Math.min(currentQuestion, numQuestions))
            .replace('%total', numQuestions);
          $('#quiz-counter2').text(countStr);
        } else {
          console.warn('Counter element missing.');
        }
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
