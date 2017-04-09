//This project is a web version of the popular 1980s game, Simon.

//Game object
var game = {
    computer: {
        //Array that has computer moves. The computer generates all 20 moves at one go.
        arr: [],
        //Determines whether th computer can make a move.
        turn: true,
        //Switch for the strict mode.
        strictMode: false,
        //Pushes a random number into the array.
        pushNum: function() {
            var randomNum = Math.floor(Math.random() * 4);
            game.computer.arr.push(randomNum);
        },
        //Level of the game at any given time.
        level: 1,
        //creates an array with 20 elements by calling the pushNum function.
        play: function() {
            for (var i = 0; i < 20; i++) {
                game.computer.pushNum();
            }
        },
        //Calls function that displays the moves on the buttons.
        display: function() {
            var i = 0;
            function Loop() {
                setTimeout(function() {
                    i++;
                    //Calls lights
                    game.computer.lights(game.computer.arr[i-1]);
                    if (i < game.computer.level) {
                        Loop();
                    }
                    if (i === game.computer.level) {
                        setTimeout(function(){game.human.turn = true;}, 400);
                    }
                }, 700);
            }
            Loop();
        },
        //Displays moves on buttons and plays audio.
        lights: function(number) {
            switch(number) {
                case 0:
                    var audio = new ('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
                    audio.play();
                    $('#top-left').addClass('light-color');
                    setTimeout(function() {
                        $('#top-left').removeClass('light-color');
                    }, 500);
                    break;
                case 1:
                    var audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
                    audio.play();
                    $('#top-right').addClass('light-color');
                    setTimeout(function() {
                        $('#top-right').removeClass('light-color');
                    }, 500);
                    break;
                case 2:
                    var audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
                    audio.play();
                    $('#bottom-left').addClass('light-color');
                    setTimeout(function() {
                        $('#bottom-left').removeClass('light-color');
                    }, 500);
                    break;
                case 3:
                    var audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
                    audio.play();
                    $('#bottom-right').addClass('light-color');
                    setTimeout(function() {
                        $('#bottom-right').removeClass('light-color');
                    }, 500);
                    break;
            }
        }
    },
    human: {
        arr: [],
        turn: false,
        error: false,
        counter: 0,
    },
    //When it's the human's turn.
    clickProcedure: function(value) {
        if (game.human.turn === true) {
            game.human.counter++;
            if (game.computer.arr[game.human.counter - 1] !== value) {
                game.human.turn = false;
                $('.level-display').html("X");
                setTimeout(function() {$('.level-display').html(" ");}, 200);
                setTimeout(function() {$('.level-display').html("X");}, 400);
                if (game.computer.strictMode === false) {
                    if (game.computer.level  < 10) {
                        setTimeout(function() {$('.level-display').html('0' + game.computer.level);}, 800);
                    } else {
                        setTimeout(function() {$('.level-display').html(game.computer.level);}, 800);
                    }
                    
                    setTimeout(function() {game.computer.display();}, 1000);
                } else {
                    setTimeout(function() {game.reset();}, 1000);
                }
                
                game.human.error = true;
                console.log('wrong');
                game.human.counter = 0;
            } else if (game.human.counter === game.computer.level) {
                if (game.computer.level < 20) {
                    game.computer.level++;
                    if (game.computer.level < 10) {
                        $('.level-display').html('0' + game.computer.level);
                    } else {
                        $('.level-display').html(game.computer.level);
                    }
                    
                    game.human.turn = false;
                    game.human.counter = 0;
                    setTimeout(function() {game.computer.display()}, 500);
                } else {
                    console.log("test");
                    $("#you-win").modal({"backdrop": "static"});
                    $('#you-win').modal('show');
                }  
            }
        }
    },
    //resets game.
    reset: function() {
        game.computer.arr = [];
        game.computer.turn = true;
        game.human.turn = false;
        game.computer.level = 1;
        game.init();
    },
    //starts game.
    init: function() {
        game.computer.play();
        $('.level-display').html('0' + game.computer.level);
        setTimeout(function() {game.computer.display()}, 1000);
        console.log(game.computer.arr);
    },
    //stops game.
    stop: function() {
        game.computer.arr = [];
        game.computer.turn = true;
        game.human.turn = false;
        game.computer.level = 1;
        $('.level-display').html("");
    },
    //if the game button is on or off.
    on: false,
};

$(document).ready(function() {
    //Start button click event
    $('.start-button-display').click(function() {
        if (game.on === true) {
            game.init();
        }
    });
    //on or off button click event.
    $('.on-off-button').click(function() {
        $(this).toggleClass('on-off-active');
        $(this).html() == "On" ? $(this).html('Off') : $(this).html('On');
        game.on = !game.on;
        if (game.on === false) {
            game.stop();
        }
    });
    //Strict button click event.
    $('.strict-button-display').click(function() {
        $(this).toggleClass('strict-active');
//        $(this).html() == "On" ? $(this).html('Off') : $(this).html('On');
        game.computer.strictMode = !game.computer.strictMode;
    });
    //Click event for each button.
    $('#top-left').click(function() {
        var value = 0;
        if (game.human.turn === true) {
            var audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
            audio.play();
            $(this).addClass('light-color');
            
            game.clickProcedure(value);
            setTimeout(function() {
                $('#top-left').removeClass('light-color');
            }, 500);
        }
    });
    $('#top-right').click(function() {
        var value = 1;
        if (game.human.turn === true) {
            var audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
            audio.play();
            $(this).addClass('light-color');
            
            game.clickProcedure(value);
            setTimeout(function() {
                $('#top-right').removeClass('light-color');
            }, 500);
        }
    });
    $('#bottom-left').click(function() {
        var value = 2;
        if (game.human.turn === true) {
            var audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
            audio.play();
            $(this).addClass('light-color');
            
            game.clickProcedure(value);
            setTimeout(function() {
                $('#bottom-left').removeClass('light-color');
            }, 500);
        }
    });
    $('#bottom-right').click(function() {
        var value = 3;
        if (game.human.turn === true) {
            var audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
            audio.play();
            $(this).addClass('light-color');
            
            game.clickProcedure(value);
            setTimeout(function() {
                $('#bottom-right').removeClass('light-color');
            }, 500);
        }
    });
    //Click events for the modal buttons
    $('#choose-yes').click(function() {
        game.reset();
    });
    $('#choose-no').click(function() {
        game.stop();
        $('.on-off-button').toggleClass('on-off-active');
    });
});