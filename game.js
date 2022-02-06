const buttonColours = ["red", "blue", "green", "yellow"]
let gamePattern = []
let level = 0
let counter = 0
let error = 0

function playSound(color){
    const audio = new Audio("sounds\\" + color + ".mp3")
    audio.play()
}

function setAnimation(color){
    $("."+color).addClass("pressed")
    setTimeout( () => {
        $("."+color).removeClass("pressed")
    },100)
}

// it generates a new sequence from 0 to 3 to relate to the array index of the color
function nextSequence(){
    let randomNumber = Math.floor(Math.random() * 4)
    setTimeout( () => {
        let color = buttonColours[randomNumber]
        gamePattern.push(color)
        playSound(color)
        setAnimation(color)
    },800)
}

function updateLevel(){
    level++
    $('h1').text('Level '+level)
}

$(".btn").on('click', (event) => {
    const color = $(event.currentTarget).attr('id')
    
    if(counter < gamePattern.length){
        if(color === gamePattern[counter]){
            counter++;
            if(counter === gamePattern.length){
                updateLevel()
                counter = 0
                nextSequence()
            }
        }else {
            // if the player get a worng sequence of color reset the game
            const audio = new Audio('sounds\\wrong.mp3')
            audio.play()
            error = 1
            counter = 0
            gamePattern = []
            $("h1").text("Game Over, Press Any Key to Restart")
        }
    }
    setAnimation(color)
    playSound(color)
})

$(document).keypress((event) => {
    const key = event.originalEvent.key
    
    if(error){
        level = 0;
        updateLevel()
        error = 0
        nextSequence()
    }
    if( key == "a" || key == "A"){
        if(!level){ 
            updateLevel()
            nextSequence()
        }
    }
})