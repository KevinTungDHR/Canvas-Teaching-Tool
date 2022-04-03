import Editor from "./editor";
import View from "./view";
import { levels } from './levels';

export default class Game{
  constructor({iframe: iframe, codemirror: codemirror}){
    this.iframe = iframe;
    this.level = levels[0];
    this.view = new View({renderView: iframe, level: this.level });
    this.editor = new Editor({editor: codemirror, view: this.view, game: this});
    this.bindHandlers();
    this.setup()
    this.addCheckCompletionListener()
  }

  currentLevel(){
    return this.level;
  }

  bindHandlers(){
    this.setup.bind(this);
    this.checkCompletion = this.checkCompletion.bind(this);
  }

  setup(){
    this.editor.setMinEditorLines();
    this.editor.prefillEditor(this.level);
    this.editor.addReadOnlyListener();
    this.loadInstructions();
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
    this.resetEditorAndView();
    this.setup()
    this.view.setupView();
  }

  resetEditorAndView(){
    this.view.setLevel(this.level);
    this.editor.setView(this.view);
    this.editor.removeReadOnlyListener();
    this.editor.clearEditor();
  }

  addCheckCompletionListener(){
    this.editor.cm.on("keyup", this.checkCompletion)
  }

  checkCompletion(){
    const userInput = this.editor.cm.getValue();
    if (this.level.solution(userInput)){
      this.completeLevel();
    }
  }
}