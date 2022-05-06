const rock = document.getElementById('Rock');
const paper = document.getElementById('Paper');
const scissor = document.getElementById('Scissor');
const output = document.getElementById('output');
const score_board = document.getElementById('scoreBoard');
const playAgain = document.getElementById('playAgain');
const user_name = document.getElementById('name_table');
const round_id = document.getElementById('round');
const input = document.querySelector('input');
const submit_name = document.getElementById('submit');
const submit_round = document.getElementById('submit_1');
const display_round = document.getElementById('display_rounds');

/*Sound effect*/
const win = new Audio('audio/win.mp3');
const lose = new Audio('audio/fail.mp3');
const tie = new Audio('audio/tie.mp3');
const Game_win = new Audio('audio/Winning.mp3');
const Game_lose = new Audio('audio/losing.mp3');
const Game_tie = new Audio('audio/tie_ending.mp3');

var names,priority=false;
var choices = ['rock','paper','scissor'];
var user_score = 0;
var computer_score = 0;
var round_number,round_by_round = 0;

function name_change(){
    names = input.value;
    if(priority){
        document.getElementById('name_tables').innerText = names;
    }else{
        user_name.innerText = names;
    }
    input.value = "";
}

function rounds(){
    round_number = round_id.value;
    round_id.value = "";
    display_round.innerHTML = "The number of round you choose is <strong>"+round_number+"</strong>";
}

function evaluate(userChoice){
    if(names==undefined){
        alert('Please enter your name and submit it');
        return; 
    }
    if(!round_number || round_number>50 || round_number<=0){
        alert('Please enter the number of rounds you would like to play and submit it (The number should be between 1 and 50)');
        return;
    }
    
    var computerChoice = choices[Math.floor(Math.random()*choices.length)];
    var doubleOutput = userChoice +"_"+computerChoice;
    round_by_round++;
    
    if(computerChoice==userChoice){
        output.innerHTML = "<span id='draw'>Round "+round_by_round+": Draw</span> <br>The computer choice is <i>"+computerChoice+"</i> and your choice is <i>"+userChoice+"</i> too";
        tie.play();
    }
    else{
        if(userChoice=='rock'){
            if(doubleOutput=='rock_paper'){
                output.innerHTML = "<span id='lose'>Round "+round_by_round+": You lost </span> <br>The computer choice is <i>"+computerChoice+"</i> and your choice is <i>"+userChoice+"</i>";
                computer_score++;
                lose.play();
            }else{
                output.innerHTML = "<span id='win'>Round "+round_by_round+": You win </span> <br>The computer choice is <i>"+computerChoice+"</i> and your choice is <i>"+userChoice+"</i>";
                user_score++;
                win.play();
            }
        }
        if(userChoice=='paper'){
            if(doubleOutput=='paper_rock'){
                output.innerHTML = "<span id='win'>Round "+round_by_round+": You win </span> <br>The computer choice is <i>"+computerChoice+"</i> and your choice is <i>"+userChoice+"</i>";
                user_score++;
                win.play();
            }else{
                output.innerHTML = "<span id='lose'>Round "+round_by_round+": You lost </span> <br>The computer choice is <i>"+computerChoice+"</i> and your choice is <i>"+userChoice+"</i>";
                computer_score++;
                lose.play();
            }
        }
        if(userChoice=='scissor'){
            if(doubleOutput=='scissor_rock'){
                output.innerHTML = "<span id='lose'>Round "+round_by_round+": You lost </span> <br>The computer choice is <i>"+computerChoice+"</i> and your choice is <i>"+userChoice+"</i>";
                computer_score++;
                lose.play();
            }else{
                output.innerHTML = "<span id='win'>Round "+round_by_round+": You win </span> <br>The computer choice is <i>"+computerChoice+"</i> and your choice is <i>"+userChoice+"</i>";
                user_score++;
                win.play();
            }
        }
    }
    scoreBoard();
}
function scoreBoard(){
    if(user_score<computer_score){
        priority = true;
        score_board.innerHTML="";
        score_board.innerHTML=
        `<Table id="scoreBoard" border='1'>
        <thead>
            <th>Names</th>
            <th>Score</th>
        </thead>
        <tbody>
            <tr class="active-row">
                <td>Computer</td>
                <td>`+computer_score+`</td>
            </tr>  
            <tr>
                <td id="name_tables">`+names+`</td>
                <td id="computerScore">`+user_score+`</td>
            </tr>
        </tbody>
        </Table>`
    }else{
        priority = true;
        score_board.innerHTML="";
        score_board.innerHTML=
        `<Table id="scoreBoard" border='1'>
            <thead>
                <th>Names</th>
                <th>Score</th>
            </thead>
            <tbody>
                <tr class="active-row">
                    <td id="name_tables">`+names+`</td>
                    <td>`+user_score+`</td>
                </tr>  
                <tr>
                    <td>Computer</td>
                    <td id="computerScore">`+computer_score+`</td>
                </tr>
            </tbody>
        </Table>`
    }
    round_number--;
    if(round_number==0){
        if(user_score==computer_score){
            setTimeout(draw_sound,1500);
        }
        else if(user_score<computer_score){
            setTimeout(lose_sound,1500);
        }
        else{
            setTimeout(win_sound,1500);
        }
        disable();  
    }
}

function draw_sound(){
    output.innerHTML = "<span id='draw'>Game Result: It's a DRAW</span>";
    Game_tie.play();
}

function lose_sound(){
    output.innerHTML = "<span id='lose'>Game Result: Hard luck you lost!!! </span>";
    Game_lose.play();
}

function win_sound(){
    output.innerHTML = "<span id='win'>Game Result: Congratulations you win!!! </span>";
    Game_win.play();
}

function disable(){
    rock.disabled = true;
    scissor.disabled = true;
    paper.disabled = true;
    round_id.disabled = true;
    input.disabled = true;
    submit_name.disabled = true;
    playAgain.classList.add('glow');
}

submit_name.onclick=function(){
    name_change();
}
submit_round.onclick=function(){
    rounds();
}
rock.onclick = function(){
    evaluate('rock');
}
paper.onclick = function(){
    evaluate('paper');
}
scissor.onclick = function(){
    evaluate('scissor');
}
playAgain.onclick = function(){
    document.location.reload();
}
