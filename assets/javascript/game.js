$(document).ready(function () {

    //hides restart button
    $("#restart-button").hide();

    //Objects for characters set HP, attack, counter attack
    var Gandalf = {
        name: "Gandalf",
        startingHP: 180,
        HP: 180,
        startingattackDamage: 8,
        attackDamage: 0,
        counterAttack: 25,

    }

    var Gimli = {
        name: "Gimli",
        startingHP: 120,
        HP: 120,
        startingattackDamage: 8,
        attackDamage: 0,
        counterAttack: 10
    }

    var Gollum = {
        name: "Gollum",
        startingHP: 100,
        HP: 100,
        startingattackDamage: 8,
        attackDamage: 0,
        counterAttack: 5
    }

    var Legolas = {
        name: "Legolas",
        startingHP: 100,
        HP: 150,
        startingattackDamage: 8,
        attackDamage: 0,
        counterAttack: 20
    }

    var attacker = {};
    var yourCharacter = {};

    //push HP to HTML
    $('.gandalfHP').append(Gandalf.HP);
    $('.gimliHP').append(Gimli.HP);
    $('.legolasHP').append(Legolas.HP);
    $('.gollumHP').append(Gollum.HP);

    //makes each character div a variable to append to different div.
    // var gandalfCT;
    var gandalfCT = $("#gandalfCT");

    var gimliCT = $("#gimliCT");
    var gollumCT = $("#gollumCT");
    var legolasCT = $("#legolasCT");

    // onclick function using jquery to choose your character and put others as enemies
    $(".character-tile").on("click", function () {
        if ($('#your-character').is(':empty')) {
            characterChoice(this);
            // finds your character object
            if (this.id == "gandalfCT") {
                yourCharacter = Gandalf;
            }
            else if (this.id == "gimliCT") {
                yourCharacter = Gimli;
            }
            else if (this.id == "gollumCT") {
                yourCharacter = Gollum;
            }
            else {
                yourCharacter = Legolas;
            }

            $("#your-character-fight-stats").html(" ");
        }
        //finds defender's object
        else {

            defenderArea(this);
            if (this.id == "gandalfCT") {
                attacker = Gandalf;

            }
            else if (this.id == "gimliCT") {
                attacker = Gimli;
            }
            else if (this.id == "gollumCT") {
                attacker = Gollum;
            }
            else {
                attacker = Legolas;
            }

            $("#your-character-fight-stats").html(" ");
        }

    })

    //Attack button on.click
    $("#button").on("click", function () {
        //Plays theme of Modor!
        playAudioLOT();
        yourCharacter.attackDamage = yourCharacter.attackDamage + yourCharacter.startingattackDamage;
        //displays message you haven't picked a character to play as
        if ($('#your-character').is(':empty')) {
            $("#your-character-fight-stats").html("You have not selected a character to play as");
        }
        //displays message sayiing you haven't picked character to battle
        else if ($("#defender").is(':empty')) {
            $("#your-character-fight-stats").html("You have not selected a character to battle");
        }
        //displays who you are attacking and the damage done to them


        else {
            $("#your-character-fight-stats").html("You attacked " + attacker.name + " for " + yourCharacter.attackDamage + " damage");
            //displays who is attacking you and the damage they do to you
            $("#defender-character-fight-stats").html(attacker.name + " attacked you back for " + attacker.counterAttack + " damage");
            //decreases your character HP
        }
        yourCharacter.HP = yourCharacter.HP - attacker.counterAttack;

        // determines if you lose by measuring if your characer's HP is <= 0
        if (yourCharacter.HP <= 0) {
            $("#defender-character-fight-stats").html("Game over.... you lose!!!");
            $("#your-character-fight-stats").html(" ");
            $("#restart-button").show();

        }
        //decreases defenders HP
        attacker.HP = attacker.HP - yourCharacter.attackDamage;

        //determines if you have won by seeing if current and waiting enemies are defeated
        if (attacker.HP <= 0 && $('.enemiesrow').is(':empty')) {
            $("#your-character-fight-stats").html("You Win!!!");
            $("#defender-character-fight-stats").html(" ");
            $("#restart-button").show();
        }
        else if (attacker.HP <= 0) {
            $("#defender").empty();
            $("#your-character-fight-stats").html(" ");
            $("#defender-character-fight-stats").html(" ");
        }

        //Replaces current html of hp of your character and 
        //need to append yourcharacter hP into the hp id of who is in the yourcharacter div
        $(`.${yourCharacter.name}`).html(yourCharacter.HP);

        $(`.${attacker.name}`).html(attacker.HP)
        //doubles your character attack damage by
        // yourCharacter.attackDamage = yourCharacter.attackDamage + startingattackDamage;
    });

    // function to choose enemies avaliable to attack
    function eata() {
        //look up jquery nest children (nth child)
        var options = $('#character-choice').removeClass('neutral-character-background').children().addClass('enemy-character-background');
        $('.enemiesrow').append(options);
    }

    //function to choose character you play as
    function characterChoice(CC) {
        $('#your-character').append(CC);
        eata();
    }

    // function to choose character you fight
    function defenderArea(DA) {
        $('#defender').append(DA);
    }
    //restart button
    $("#restart-button").click(function () {
        location.reload();

        //audio track


    });
    function playAudioLOT() {
        LOTTheme.play();
    }
})


