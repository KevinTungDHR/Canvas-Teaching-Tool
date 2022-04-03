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
    this.bindHandlers();
  }

  bindHandlers(){
    this.editor.el.on("keyup", this.checkCompletion)
  }

  run(){

  }

  checkCompletion(){
    const userInput = this.editor.el.getValue();
    console.log(this.level.solution.test(userInput));
  }

  reset(){

  }
}