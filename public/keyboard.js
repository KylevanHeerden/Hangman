// Keyboard generation and management script
// MIT license or some shit
// jonathan.gollnick@gmail.com
// No warranty, don't kill yourself if you're gonna blame it on me

window.addEventListener( "load", createKeyboard );


function guessLetter( key ) {
  hangmanCheckLetter( key.textContent );
  key.disabled = true;
}


function createKeyboard() {
  const keyboard = document.querySelector( ".keyboard" );

  if( keyboard ) {
    const keyboardLayout = [ "qwertyuiop",
                              "asdfghjkl",
                               "zxcvbnm" ];

    keyboardLayout.forEach(row => {
      const keyrow = document.createElement( "div" );
      keyrow.classList.add( "row" );
      
      row.split( '' ).forEach(letter => {
        const key = document.createElement( "button" );
        key.textContent = letter.toUpperCase();

        key.onclick = ( e ) => guessLetter( e.target );
        window.addEventListener( "keydown", k => {
          if( k.key == letter && !key.disabled ) guessLetter( key );
        });

        keyrow.appendChild( key );
      });

      keyboard.appendChild( keyrow );
    });
  }
}
