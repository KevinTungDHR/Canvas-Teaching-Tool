import CodeMirror from 'codemirror';
import "codemirror/mode/javascript/javascript.js";
import Editor from './scripts/editor';
import Game from './scripts/game';
import View from './scripts/view';

window.addEventListener("DOMContentLoaded", (event) => {
  const minLines = 10;
  let startingValue = "";
  for(let i = 0; i < minLines; i++){
    startingValue += "\n";
  }
  const cm = CodeMirror.fromTextArea(document.querySelector("#codemirror"), {
    mode: "javascript",
    theme: "dracula",
    lineNumbers: true,
  });

  cm.setValue(startingValue);
  const iframe = document.querySelector(".render-view");

  iframe.srcdoc = `
      <html>
        <head>
          <script>
            let styleSheet = document.querySelector("#canvas-style")
            if(styleSheet){
              document.head.removeChild(styleSheet)
            }

            let setupSheet = document.createElement("link");
            setupSheet.href = "./dist/main.css";
            setupSheet.rel = "stylesheet";
            setupSheet.type = "text/css";
            setupSheet.class = "canvas-style";

            document.head.appendChild(setupSheet);
          </script>
          <script type='module' defer>
            window.addEventListener('message', (event) => {
              const { type, value } = event.data;

              if (type === 'html'){
                document.body.innerHTML = value;
              }

              if (type === 'setupScript'){
                // Need to clear or else old functions leave the canvas in wrong state.
                let canvas = document.querySelector("#background");
                canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
                let setupScript = document.querySelector(".setup-script");
                if(setupScript){
                  document.body.removeChild(userScript);
                }
                
                console.log("setup Script")
                setupScript = document.createElement("script");
                setupScript.className = "setup-script";
                setupScript.innerHTML = value;
                document.body.appendChild(setupScript);
              }

              if (type === 'script'){
                // Need to clear or else old functions leave the canvas in wrong state.
                let canvas = document.querySelector("#canvas");
                canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
                let userScript = document.querySelector(".user-script");
                if(userScript){
                  document.body.removeChild(userScript);
                }
                userScript = document.createElement("script");
                userScript.className = "user-script";
                userScript.innerHTML = value;
                document.body.appendChild(userScript);
                console.log("IN SCRIPT")
              }
            })
          </script>
        </head>
        <body>
        </body>
      </html>
  `

  const game = new Game({iframe: iframe, codemirror: cm});
});


