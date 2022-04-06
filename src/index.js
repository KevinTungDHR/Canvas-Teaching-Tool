import CodeMirror from 'codemirror';
import "codemirror/mode/javascript/javascript.js";
import "codemirror/addon/display/autorefresh.js";
import Game from './scripts/game';
import Sandbox from './scripts/sandbox';
import { mseCompare, pixelCompare } from './scripts/util';

window.addEventListener("DOMContentLoaded", (event) => {
  const cm = CodeMirror.fromTextArea(document.querySelector("#codemirror"), {
    mode: "javascript",
    theme: "dracula",
    tabSize: 2,
    lineWrapping: true,
    lineNumbers: true,
    autoRefresh: true,
  });

  // Turn on autorefresh so that when tabs become unhidden the formatting is correct
  const sandboxCm = CodeMirror.fromTextArea(document.querySelector("#codemirror-sandbox"), {
    mode: "javascript",
    theme: "dracula",
    autoRefresh: true,
    tabSize: 2,
    lineWrapping: true,
    lineNumbers: true,
  });


  const iframeSandbox = document.querySelector(".render-view-sandbox");
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
        <button class='myButton'>Call function B</button>
        <canvas  id='canvas' height="700px" width="845px"></canvas>
        <canvas id='solution' height="700px" width="845px"></canvas>
        <canvas id='background' height="700px" width="845px"></canvas>
      </body>
      <script>
          const canvas = document.querySelector('#canvas')
          canvas.addEventListener('mouseover', (e)=> {
            console.log(canvas)
            window.parent.postMessage('CallFunctionA', '*')
          }, false);
          
      </script>
    </html>
  `;

  iframe.srcdoc = srcdoc;
  iframeSandbox.srcdoc = srcdoc;
  addModeEventListeners();

  const sandbox = new Sandbox({iframe: iframeSandbox, codemirror: sandboxCm});
  const game = new Game({iframe: iframe, codemirror: cm});
});

function hideGameGroup(){
  const gameGroup = document.querySelector(".editor-game-group");
  gameGroup.classList.add("hidden");
}

function hideSandboxGroup(){
  const sandboxGroup = document.querySelector(".sandbox-group");
  sandboxGroup.classList.add("hidden");
}

function showGameGroup(){
  const gameGroup = document.querySelector(".editor-game-group");
  gameGroup.classList.remove("hidden");
}

function showSandboxGroup(){
  const sandboxGroup = document.querySelector(".sandbox-group");
  sandboxGroup.classList.remove("hidden");
}

function addModeEventListeners(){
  const sandboxButton = document.getElementById("sandbox-tab");
  const gameButton = document.getElementById("game-tab");
  sandboxButton.addEventListener('click', (e)=>{
    hideGameGroup();
    showSandboxGroup();
  });

  gameButton.addEventListener('click', (e)=>{
    showGameGroup();
    hideSandboxGroup();
  });

  const mseCompareButton = document.querySelector('.mseCompare');
  mseCompareButton.addEventListener('click', () => {
    console.log(mseCompare());
  });

  const pixelCompareButton = document.querySelector('.pixelCompare');
  pixelCompareButton.addEventListener('click', () => {
    console.log(pixelCompare());
  });
}



