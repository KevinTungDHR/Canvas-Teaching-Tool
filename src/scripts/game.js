import Editor from "./editor";
import View from "./view";
import { levels } from './levels';

export default class Game{
  constructor({iframe: iframe, codemirror: codemirror}){
    this.iframe = iframe;
    this.level = levels[0] || 0;
    this.initialSetup = this.level.setup
    this.view = new View({renderView: iframe, defaults: { setup: this.initialSetup}});
    this.editor = new Editor({editor: codemirror, view: this.view});
    this.checkCompletion = this.checkCompletion.bind(this);
    this.setup.bind(this);
    this.setup()
  }

  // Need to change code editor setup for initial values
  setup(){
    this.bindHandlers();
    const that = this;
    let doc = this.editor.cm.getDoc();
    doc.replaceRange(`let canvas = document.getElementById('canvas')
    let ctx = canvas.getContext('2d')
    ctx.fillRect(100, 100, 200, 200)
    `, {line: 0, ch: 0})
    this.editor.cm.on('beforeChange', function(cm, change){
      if (that.level.readOnlyLines.indexOf(change.from.line) !== -1){
        change.cancel();
      }
    })
   
  }

  bindHandlers(){
    this.editor.cm.on("keyup", this.checkCompletion)
  }

  run(){

  }

  checkCompletion(){
    const userInput = this.editor.cm.getValue();
    console.log(this.level.solution(userInput));
  }

  reset(){

  }
}