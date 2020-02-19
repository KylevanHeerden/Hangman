// Hangman script
// MIT license or some shit, idgaf
// jonathan.gollnick@gmail.com
// No warranty


const bones = document.querySelectorAll( ".hangman .bone" );

const bodyParts = [ ...document.querySelectorAll( ".hangman .body-part" ) ];

const letterSlots = [ ...document.querySelectorAll( ".letter" ) ];
const gameStatusLine = document.querySelector( "#status-line" );
const gameStatusSubtitle = document.querySelector( "#status-subtitle" );

const tryAgain = document.createElement( 'a' );
tryAgain.textContent = "try again";
tryAgain.href = "javascript:history.go(0);";


function gameOver() {
  bones.forEach(bone => {
    bone.style.animationName = bone.id;
    bone.style.animationPlayState = "running"
  });

  setStatusLine("Game Over!", "Keep going or ");
}

function setStatusLine(statusText, subtitleText, linkText="try again") {
  gameStatusLine.textContent = statusText;
  gameStatusSubtitle.innerHTML = "";
  tryAgain.textContent = linkText;
  gameStatusSubtitle.textContent = subtitleText;
  gameStatusSubtitle.appendChild( tryAgain );
}

function revealNext() {
  if( bodyParts.length == 0 ) return;

  bodyParts.shift().style.visibility = "visible";

  //All parts are now visible... game over
  if( bodyParts.length == 0 )
    gameOver();
}

function checkSolved() {
  for(let i=0; i<letterSlots.length; i++)
    if( letterSlots[i].textContent == '' ) return false;


  if( bodyParts.length > 0 ) {
    setStatusLine("You won!", "Now make him die or ");
  } else {
    setStatusLine("You're too late...", "gg no re. ", "or re?");
  }

  return true;
}

function hangmanCheckLetter( letter ) {
  fetch(`/hangman/check/${letter}`)
  .then(res => res.text())
  .then(data => {
    const spaces = JSON.parse(data);
    if(spaces.length > 0) {
      spaces.forEach(space => {
        letterSlots[space].textContent = letter;
      });
      
      checkSolved();
    } else {
      revealNext();
    }
  });
}

function getHint() {
  fetch( '/hangman/hint-pls' )
  .then(res => res.text())
  .then(data => {
    gameStatusSubtitle.innerHTML = "";
    gameStatusSubtitle.textContent = `Hint: ${data}`;
  });
}
