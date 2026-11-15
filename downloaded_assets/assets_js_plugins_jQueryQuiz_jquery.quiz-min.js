;
(function ($, window, document, undefined) {

    'use strict';

    $.quiz = function (el, options) {
        var base = this;

        // Access to jQuery version of element
        base.$el = $(el);

        // Add a reverse reference to the DOM object
        base.$el.data('quiz', base);

        base.options = $.extend($.quiz.defaultOptions, options);

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

                $(document).on('click', startButton, function (e) {
                    e.preventDefault();
                    base.methods.start();
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

                $(document).on('click', '#quiz-finish-btn2', function (e) {
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
                    quizHtml += '<div id="quiz-counter"><center><a class="btn btn-default btn-flat btn-block btn-xs"><h4 class="text-center"><strong><div id="quiz-counter2"></div></strong></h4></a></center><br /></div>';
                }


                quizHtml += '<form class="form-horizontal" role="form" id="quiz_form" method="post" action="?action=quiz_result">';
                quizHtml += '<div id="questions">';
                $.each(questions, function (i, question) {
                    quizHtml += '<div class="question-container">';
                    quizHtml += '<div class="answers btn-group-vertical btn-block" data-toggle="buttons">';
                    quizHtml += '<label class="btn bg-navy strong lb-justify"><h4>' + (++i) + '. ' + question.q + '</h4></label>';
                    $.each(question.options, function (index, answer) {
                        var option='';
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
                        quizHtml += '<label id="' + question.qid + index + '" data-qid="' + question.qid + '" data-index="' + index + '" class="ansOpt btn btn-white btn-block lb-justify"><input type="radio"  value="' + (index + 1) + '" id="radio1_' + (index + 1) + '" name="' + question.qid + '" autocomplete="off"><strong>(' + (option) + ') </strong>' + answer + '</label>';
                    });
                   // quizHtml += '<input type="radio" checked="checked" style="display:none" value="AQ_quiz" id="radio1_' + (index + 1) + '" name="' + question.qid + '" />';
                    quizHtml += '<label class="btn btn-white btn-block lb-justify" style="display:none;" id="quiz-response"></label>';
                    quizHtml += '</div>';
                    quizHtml += '</div>';
                });

                quizHtml += '</div>';

                // if results screen not in DOM, add it
                if ($(resultsScreen).length === 0) {
                    quizHtml += '<div id="' + resultsScreen.substr(1) + '">';
                    quizHtml += '<p id="quiz-results"></p>';
                    quizHtml += '</div>';
                }

                quizHtml += '<div id="quiz-controls">';
                quizHtml += '<div id="quiz-buttons" class="mt-5">';
                quizHtml += '<a href="#" id="quiz-next-btn" class="btn btn-default btn-block strong text-navy">Next <i class="fa fa-chevron-circle-right"></i></a>';
                quizHtml += '<div id="submit-result-form">';
                quizHtml += '<button type="submit" id="quiz-finish-btn" class="btn btn-danger strong btn-block">Check Result <i class="fa fa-chevron-circle-down"></i></button>';
                quizHtml += '</div>';
                quizHtml += '<a href="#" id="quiz-restart-btn" class="btn btn-success btn-block">Restart</a>';
                quizHtml += '</div>';
                quizHtml += '</div>';
                quizHtml += '</form>';

                base.$el.append(quizHtml).addClass('quiz-container quiz-start-state');

                $('#quiz-counter').hide();
                $('.question-container').hide();
                $(gameOverScreen).hide();
                $(resultsScreen).hide();
                $('#quiz-controls').hide();
            },
            start: function () {
                base.$el.removeClass('quiz-start-state').addClass('quiz-questions-state');
                $(startScreen).hide();
                $('#quiz-controls').hide();
                $('#quiz-finish-btn').hide();
                $('#quiz-restart-btn').hide();
                $('#quizInfo').hide();
                $('#questions').show();
                $('#quiz-counter').show();
                $('.question-container:first-child').show().addClass('active-question');
                base.methods.updateCounter();
            },
            answerQuestion: function (answerEl) {
                if (answerLocked) {
                    return;
                }
                answerLocked = true;

                var $answerEl = $(answerEl),
                    response = '',
                    selected = $answerEl.data('index'),
                    qid = $answerEl.data('qid'),
                    currentQuestionIndex = currentQuestion - 1,
                    correct = questions[currentQuestionIndex].correctIndex;

                if (selected === correct) {
                    $answerEl.addClass('bg-right strong');
                    response = questions[currentQuestionIndex].correctResponse;
                    score++;
                } else {
                    $answerEl.addClass('bg-wrong strong');
                    $('#' + qid + correct + '').addClass('bg-right strong');
                    response = questions[currentQuestionIndex].incorrectResponse;
                    if (!base.options.allowIncorrect) {
                        base.methods.gameOver(response);
                        return;
                    }
                }
                $('label#quiz-response').show();
                $('label#quiz-response').html(response);
                $('#quiz-controls').fadeIn();

                if (typeof base.options.answerCallback === 'function') {
                    base.options.answerCallback(currentQuestion, selected === correct);
                }
            },
            nextQuestion: function () {
                answerLocked = false;

                $('.active-question')
                    .hide()
                    .removeClass('active-question')
                    .next('.question-container')
                    .show()
                    .addClass('active-question');

                $('#quiz-controls').hide();
                $('label#quiz-response').hide();

                // check to see if we are at the last question
                if (++currentQuestion === numQuestions) {
                    $('#quiz-next-btn').hide();
                    $('#submit-result-form').show();
                    $('#quiz-finish-btn').show();
                }

                base.methods.updateCounter();

                if (typeof base.options.nextCallback === 'function') {
                    base.options.nextCallback();
                }
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
                $('#quiz-finish-btn').hide();
                $('#quiz-next-btn').hide();
                //$('#quiz-restart-btn').show();
                $(resultsScreen).show();
                //$.post('ajax_update_score.php?right='+ score + '&wrong='+ (numQuestions-score) +'');
                //$.post('ajax_update_score.php?right=24&wrong=26');
                $.ajax({
                    type: "GET",
                    url: "ajax_update_score.php",
                    data: "right=" + score + "&wrong=" + (numQuestions - score) + "",
                    success: function (msg) {
                        var redUrl = "quiz.php?action=quiz_result&uuid=" + msg;
                        redUrl = redUrl.replace(/\s/g, '');
                        window.location.href = unescape(redUrl);
                    }
                });
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
                var countStr = base.options.counterFormat.replace('%current', currentQuestion).replace('%total', numQuestions);
                $('#quiz-counter2').html(countStr);
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
