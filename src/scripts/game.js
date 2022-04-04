import Editor from "./editor";
import View from "./view";
import { levels } from './levels';
import { debounce } from "./util";

export default class Game{
  constructor({iframe: iframe, codemirror: codemirror}){
    this.iframe = iframe;
    this.level = this.getSavedlevel() || levels[0];
    this.view = new View({iframe: iframe, level: this.level });
    this.editor = new Editor({editor: codemirror, view: this.view, game: this});
    this.bindHandlers();
    this.setup();
    this.addCheckCompletionListener();
  }

  getSavedlevel(){
    const savedLevel = localStorage.getItem("level");

    if (savedLevel){
      let currentLevel = JSON.parse(savedLevel);
      return levels[currentLevel];
    }
    return undefined;
  }

  bindHandlers(){
    this.setup = this.setup.bind(this);
    this.checkCompletion = debounce(this.checkCompletion.bind(this), 1000);
    this.goPreviousLevel = this.goPreviousLevel.bind(this);
    this.goNextLevel = this.goNextLevel.bind(this);
  }

  setup(){
    this.editor.setMinEditorLines();
    this.editor.prefillEditor(this.level);
    this.editor.addReadOnlyListener();
    this.addLevelSelectListeners();
    this.loadInstructions();
  }

  loadInstructions(){
    const instructionsElement = document.querySelector(".instructions");
    instructionsElement.innerHTML = this.level.instructions;
  }

  completeLevel(){
    let nextLevel = this.level.currentLevel + 1;
    if (!levels[nextLevel]){
      alert("Last level reached!");
    } else {
      this.level = levels[nextLevel];
      this.loadLevel();
    }   
  }

  addLevelSelectListeners(){
    const backButton = document.querySelector(".back-level");
    const nextButton = document.querySelector(".next-level");
    backButton.addEventListener('click', this.goPreviousLevel);
    nextButton.addEventListener('click', this.goNextLevel);
  }

  goPreviousLevel(e){
    e.stopPropagation();
    if (this.level.currentLevel === 0){
      return;
    }

    let prevLevel = this.level.currentLevel - 1;
    this.level = levels[prevLevel];
    this.loadLevel();
  }

  goNextLevel(e){
    e.stopPropagation();
    if (this.level.currentLevel + 1 === levels.length){
      return;
    }

    this.completeLevel();
  }

  loadLevel(){
    this.resetEditorAndView();
    this.setup();
    this.view.setupView();
    localStorage.setItem("level", JSON.stringify(this.level.currentLevel));
  }

  resetEditorAndView(){
    this.view.setLevel(this.level);
    this.editor.setView(this.view);
    this.editor.removeReadOnlyListener();
    this.editor.clearEditor();
  }

  addCheckCompletionListener(){
    this.editor.cm.on("keyup", this.checkCompletion);
  }

  checkCompletion(){
    const userInput = this.editor.cm.getValue();
    if (this.level.solution(userInput)){
      this.completeLevel();
    }
  }
}