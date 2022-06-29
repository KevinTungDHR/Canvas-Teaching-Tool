import CodeMirror from 'codemirror';
import "codemirror/mode/javascript/javascript.js";
import "codemirror/addon/display/autorefresh.js";
import Game from './scripts/game';
import { mseCompare, myThrottle, pixelCompare } from './scripts/util';

window.addEventListener("DOMContentLoaded", (event) => {
  const cm = CodeMirror.fromTextArea(document.querySelector("#codemirror"), {
    mode: "javascript",
    theme: "base16-light",
    tabSize: 2,
    lineWrapping: true,
    lineNumbers: true,
    autoRefresh: true,
  });

  const iframe = document.querySelector(".render-view");

  const srcdoc = 
  `<html>
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
           
            if (type === 'coordinates'){
              let coordinatesScript = document.querySelector(".coordinatesScript");
              if(coordinatesScript){
                document.body.removeChild(coordinatesScript);
              }

              coordinatesScript = document.createElement("script");
              coordinatesScript.className = "coordinatesScript";
              coordinatesScript.innerHTML = value;
              document.body.appendChild(coordinatesScript);
            }

            if (type === 'html'){
              document.body.innerHTML = value;
            }

            if (type === 'setupScript'){
              // Need to clear or else old functions leave the canvas in wrong state.
              let bg = document.querySelector("#background");
              bg.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
              let setupScript = document.querySelector(".setup-script");
              if(setupScript){
                document.body.removeChild(setupScript);
              }
              
              setupScript = document.createElement("script");
              setupScript.className = "setup-script";
              setupScript.innerHTML = value;
              document.body.appendChild(setupScript);
            }

            if (type === 'solutionScript'){
              // Need to clear or else old functions leave the canvas in wrong state.
              let canvas = document.querySelector("#solution");
              canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
              let solutionScript = document.querySelector(".solution-script");
              if(solutionScript){
                document.body.removeChild(solutionScript);
              }
              
              solutionScript = document.createElement("script");
              solutionScript.className = "solution-script";
              solutionScript.innerHTML = value;
              document.body.appendChild(solutionScript);
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
            }
          })
        </script>
      </head>
      <body>
      </body>
    </html>
  `;

  iframe.srcdoc = srcdoc;
  addModeEventListeners();
  const game = new Game({iframe: iframe, codemirror: cm});
  addThrottledCoordinates();
  addModalListener();
});

function addModalListener(){
  let modal = document.querySelector('.modal');
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}


function addThrottledCoordinates(){
  const receiveMessage = function (event) {
    let posX = document.querySelector('.posX');
    let posY = document.querySelector('.posY');
    let [x, y] = event.data;
    posX.innerHTML = x;
    posY.innerHTML = y;
  };
  let throttledHandler = myThrottle(receiveMessage, 80);
  window.addEventListener("message", throttledHandler, true);
}


function addModeEventListeners(){
  const mseCompareButton = document.querySelector('.mseCompare');
  mseCompareButton.addEventListener('click', () => {
    // console.log(mseCompare());
  });

  const pixelCompareButton = document.querySelector('.pixelCompare');
  pixelCompareButton.addEventListener('click', () => {
    // console.log(pixelCompare());
  });
}



