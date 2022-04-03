import Editor from "./editor";
import View from "./view";
import { levels } from './levels';

export default class Game{
  constructor({iframe: iframe, codemirror: codemirror}){
    this.iframe = iframe;
    this.level = levels[0];
    this.view = new View({renderView: iframe, level: this.level });
    this.editor = new Editor({editor: codemirror, view: this.view});
    this.bindHandlers();
    this.addCheckCompletionListener()
    this.setup()
  }

  bindHandlers(){
    this.readOnlyHandler = this.readOnlyHandler.bind(this)
    this.checkCompletion = this.checkCompletion.bind(this);
    this.setup.bind(this);
  }

  setup(){
    this.setMinEditorLines();
    this.prefillEditor();
    this.addReadOnlyListener();
    this.loadInstructions();
  }

  setMinEditorLines(){
    const minLines = 10;
    let startingValue = "";
    for(let i = 0; i < minLines; i++){
      startingValue += "\n";
    }
    this.editor.cm.setValue(startingValue);
  }

  prefillEditor(){
    let doc = this.editor.cm.getDoc();
    doc.replaceRange(this.level.setup.main, {line: 0, ch: 0})
  }

  addReadOnlyListener(){
    this.editor.cm.on('beforeChange', this.readOnlyHandler)
  }

  removeReadOnlyListener(){
    this.editor.cm.off('beforeChange', this.readOnlyHandler);
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

  completeLevel(){
    let nextLevel = this.level.currentLevel + 1
    this.level = levels[nextLevel];
    this.loadLevel()
  }

  loadLevel(){
    this.view.setLevel(this.level);
    this.editor.setView(this.view);
    this.removeReadOnlyListener();
    this.clearEditor();
    this.setup()
    this.view.setupView();
  }

  clearEditor(){
    this.editor.cm.setValue("");
  }

  addCheckCompletionListener(){
    this.editor.cm.on("keyup", this.checkCompletion)
  }

  checkCompletion(){
    const userInput = this.editor.cm.getValue();
    if(this.level.solution(userInput)){
      this.completeLevel()
    }
  }
}