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
    this.createLevelMenu();
    this.addCheckCompletionListener();
    this.addEnterListener();
  }

  getSavedlevel(){
    const savedLevel = localStorage.getItem("level");

    if (savedLevel){
      let currentLevel = parseInt(savedLevel);
      return levels[currentLevel];
    }
    return undefined;
  }

  bindHandlers(){
    this.setup = this.setup.bind(this);
    this.checkCompletion = debounce(this.checkCompletion.bind(this), 1000);
    this.goToLevel = this.goToLevel.bind(this);
    this.goPreviousLevel = this.goPreviousLevel.bind(this);
    this.goNextLevel = this.goNextLevel.bind(this);
    this.completeLevel = this.completeLevel.bind(this);
  }

  setup(){
    this.editor.setMinEditorLines();
    this.editor.prefillEditor(this.level);
    this.editor.addReadOnlyListener();
    this.addLevelSelectListeners();
    this.loadLevelTitle();
    this.loadInstructions();
    this.addFadeIn();
    this.addDisabledEnter();
    this.removeEnterClasses();
  }

  loadLevelTitle(){
    const levelNumber = parseInt(this.level.currentLevel)
    const title = document.querySelector(".level-header");
    title.innerHTML = `Level - ${levelNumber + 1}`;
  }

  loadInstructions(){
    const instructionsElement = document.querySelector(".instructions");
    instructionsElement.innerHTML = this.level.instructions;
  }

  createLevelMenu(){
    const dropdown = document.querySelector(".dropdown-content");
    for(let i = 0; i < levels.length; i++){
      let li = document.createElement('li');
      li.innerHTML = i + 1;
      li.setAttribute('level', i);
      li.addEventListener('click', this.goToLevel);
      dropdown.append(li);
    }
  }

  goToLevel(e){
    let lvlString = e.target.getAttribute('level');
    this.level = levels[parseInt(lvlString)];
    this.loadLevel();
  }

  completeLevel(){
    let nextLevel = this.level.currentLevel + 1;
    if (!levels[nextLevel]){
      let modal = document.querySelector('.modal');
      modal.style.display = "block";
    } else {
      this.level = levels[nextLevel];
      this.loadLevel();
    }   
  }

  addLevelSelectListeners(){
    const backButton = document.querySelector(".triangle-left");
    const nextButton = document.querySelector(".triangle-right");
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
    this.removeFadeIn();
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
    this.editor.cm.on('keypress', this.checkCompletion);
  }

  addDisabledEnter(){
    let enterButton = document.querySelector(".enter");
    enterButton.style.pointerEvents = "none";
  }

  addEnterListener(){
    let enterButton = document.querySelector(".enter");
    enterButton.addEventListener("click", (e) =>{
      this.completeLevel();
    });
  }

  checkCompletion(){
    const userInput = this.editor.cm.getValue();

    if (this.level.solution(userInput)){
      let enterButton = document.querySelector(".enter");
      enterButton.style.pointerEvents = "auto";
      this.enterButtonShake();
    }
  }

  enterButtonShake(){
    let enterButton = document.querySelector(".enter");
    enterButton.classList.add('shake', 'correct')
  }

  removeEnterClasses(){
    let enterButton = document.querySelector(".enter");
    enterButton.classList.remove('.shake', 'correct')
  }

  addFadeIn(){
    const instructions = document.querySelector(".instructions");
    const title = document.querySelector(".level-header");

    title.classList.add('fadeIn');
    instructions.classList.add('fadeIn');
  }

  removeFadeIn(){
    const instructions = document.querySelector(".instructions");
    const title = document.querySelector(".level-header");

    title.classList.remove('fadeIn');
    instructions.classList.remove('fadeIn');
  }
}