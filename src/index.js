import CodeMirror from 'codemirror';
import "codemirror/mode/javascript/javascript.js";
import Editor from './scripts/editor';
import View from './scripts/view';

window.addEventListener("DOMContentLoaded", (event) => {
  const cm = CodeMirror.fromTextArea(document.querySelector("#codemirror"), {
    mode: "javascript",
    theme: "dracula",
    lineNumbers: true,
  });
  const iframe = document.querySelector(".render-view");
  iframe.srcdoc = `
      <html>
        <head>
     
          <script type='module' defer>
            window.addEventListener('message', (event) => {
              const { type, value } = event.data;
              console.log("in event listener");
              if (type === 'html'){
                console.log('in html listener');
                document.body.innerHTML = value;
              }

              if (type === 'setupScript'){
                // Need to clear or else old functions leave the canvas in wrong state.
                let canvas = document.querySelector("#canvas");
                canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
                let setupScript = document.querySelector(".setup-script");
                if(setupScript){
                  document.body.removeChild(userScript);
                }
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
              }
            })
          </script>
        </head>
        <body>
        </body>
      </html>
  `
  const view = new View({renderView: iframe});
  const editor = new Editor({editor: cm, view: view});
});


