import Editor from "./editor";
import View from "./view";
import { levels } from './levels';

export default class Game{
  constructor({iframe: iframe, codemirror: codemirror}){
    this.iframe = iframe;
    this.level = levels[0];
    this.initialSetup = this.level.setup
    this.view = new View({renderView: iframe, level: this.level });
    this.editor = new Editor({editor: codemirror, view: this.view});
    this.checkCompletion = this.checkCompletion.bind(this);
    this.bindHandlers();
    this.setup.bind(this);
    this.setup()
  }


  // Need to change code editor setup for initial values
  setup(){
    const minLines = 10;
    let startingValue = "";
    for(let i = 0; i < minLines; i++){
      startingValue += "\n";
    }

    this.editor.cm.setValue(startingValue);
    let doc = this.editor.cm.getDoc();
    doc.replaceRange(this.level.setup.main, {line: 0, ch: 0})
    this.editor.cm.on('beforeChange', this.readOnlyHandler)
    this.loadInstructions();
  }

  readOnlyHandler(cm, change){
    if (this.level.readOnlyLines.indexOf(change.from.line) !== -1){
      change.cancel();
    }
  }

  loadInstructions(){
    const instructionsElement = document.querySelector(".instructions")
    instructionsElement.innerHTML = this.level.instructions;
  }

  bindHandlers(){
    this.editor.cm.on("keyup", this.checkCompletion)
    this.readOnlyHandler = this.readOnlyHandler.bind(this)
  }

  completeLevel(){
    let nextLevel = this.level.currentLevel + 1
    this.level = levels[nextLevel];
    this.loadLevel()
  }

  loadLevel(){
    this.initialSetup = this.level.setup;
    this.view.level = this.level;
    this.editor.view = this.view;
    this.editor.cm.off('beforeChange', this.readOnlyHandler);
    this.editor.cm.setValue("");
    this.setup()
    this.view.setupView();
  }

  checkCompletion(){
    const userInput = this.editor.cm.getValue();
    if(this.level.solution(userInput)){
      this.completeLevel()
    }
  }

  reset(){
    
  }
}