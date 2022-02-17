const gameBoard = (() => {
    const m = 3;
    const  n = 3;
    function makeArray(){
        let arr = new Array(m); // create an empty array of length n
        for (var i = 0; i < m; i++) {
            arr[i] = new Array(n); // make each element an array
        }


        for (let i = 0; i < m; i++){
            for (let j = 0; j < n; j++){
                arr[i][j] = '-'
            }
        }
        return arr
    }
    return {makeArray: makeArray,}
})()

const player = (name, mark, isTurn) => {
    return {name, mark, isTurn}
}

let player1 = player('human', 'X', true)
let player2 = player('computer', 'O', false)

function chooseSpot (){
    let rand = Math.floor(Math.random() * 3);
    return rand
}

const game_array = gameBoard.makeArray()
function play(player){
    
    // choose a random spot
    let mark = player.mark
    let rand_row = chooseSpot()
    let rand_col = chooseSpot()
    let spot = game_array[rand_row][rand_col]

    // check if empty
    // if empty, place your mark, 
    // if not empty, choose another random number
    while (spot != '-'){
        rand_row = chooseSpot()
        rand_col = chooseSpot()
        spot = game_array[rand_row][rand_col]
    }

    game_array[rand_row][rand_col] = mark



    console.log(rand_row,rand_col)
    console.log(game_array)
}


// function to switch the players turns 
function switchPlayer(){
    if(player1.isTurn){
        play(player1)
        player1.isTurn = !player1.isTurn
        player2.isTurn = !player2.isTurn
        
    }
    else{
        play(player2)
        player2.isTurn = !player2.isTurn
        player1.isTurn = !player1.isTurn
        
    }
}

const game = (num) => {
    for (let i = 0; i < num; i++){
        switchPlayer()
    }
}

function getWinner(){
    // 00 01 02
    // 10 11 12
    //20 21 22
    
    //00 10 20
    // 01 11 21
    // 02 12 22

    // 00 11 22
    //02 11 20

    const winningMoves = 
            [['00', '01', '02'],
            ['10', '11', '12'],
            ['20', '21', '22'],
            ['00', '10', '20'],
            ['01', '11', '21'],
            ['02', '12', '22'],
            ['00', '11', '22'],
            ['02', '11', '20']];
    let x_arr = [];
    let o_arr = [];

    // when the first player enter the 3rd mark start checking for a winner
    // const resultArray = this._gameBoard.filter((item) => item != undefined);
  /*   game_array.forEach((item, index) => {
        if (item != 'X') {
            x_arr.push(index);
          } else if (item == 'O') {
            o_arr.push(index) ;
          }
    }) */

    for (let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++){
            if(game_array[i][j] == 'X'){
                let first = i.toString()
                let second = j.toString()
                let combined = first + second
                x_arr.push(combined);
            }
            else if(game_array[i][j] == 'O'){
                let first = i.toString()
                let second = j.toString()
                let combined = first + second
                o_arr.push(combined);
            }
        }
    }

    console.log(x_arr)
    console.log(o_arr)

    //compare with the winning formula
    for (let index = 0; index < winningMoves.length; index++) {
        const formula = winningMoves[index];
        let x_result = formula.every((item) => x_arr.includes(item));
        let o_result = formula.every((item) => o_arr.includes(item));

        if (x_result || o_result) {
          return x_result ? 'X wins' : 'O wins';
        } 
    }
}
game(9)
console.log(getWinner())