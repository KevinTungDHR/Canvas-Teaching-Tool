import CodeMirror from 'codemirror';
import "codemirror/mode/javascript/javascript.js";
import Editor from './scripts/editor';

window.addEventListener("DOMContentLoaded", (event) => {
  const main = document.querySelector(".main");
 
  const cm = CodeMirror.fromTextArea(document.querySelector("#codemirror"), {
    mode: "javascript",
    theme: "dracula",
    lineNumbers: true,
  });
  const iframe = document.querySelector(".render-view");

  const editor = new Editor({editor: cm, iframe: iframe});
});