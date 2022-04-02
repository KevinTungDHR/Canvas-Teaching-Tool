import Editor from "./editor";
import View from "./view";

export default class Game{
  constructor({iframe: iframe, codemirror: codemirror}){
    this.level = 0;
    this.view = new View({renderView: iframe});
    this.editor = new Editor({editor: codemirror, view: this.view});
  }

  run(){

  }

  checkCompletion(){

  }

  reset(){
    
  }
}