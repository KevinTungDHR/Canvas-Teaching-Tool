import { debounce } from "./util";

export default class Editor{
  constructor({editor: cm, view: view, game: game }){
    this.game = game;
    this.cm = cm;
    this.view = view;
    this.bindHandlers();
    this.cm.on("keyup", this.handleInput);
  }

  setView(view){
    this.view = view;
  }

  bindHandlers(){
    this.readOnlyHandler = this.readOnlyHandler.bind(this)
    // this.handleInput = this.handleInput.bind(this);
    this.handleInput = debounce(this.handleInput.bind(this), 100)
  }

  clearEditor(){
    this.cm.setValue("");
  }

  numberOfReadOnlyLines(){
    return this.game.level.readOnlyLines.length;
  }

  setMinEditorLines(){
    const minLines = this.numberOfReadOnlyLines() + 3;
    let startingValue = "";
    for(let i = 0; i < minLines; i++){
      startingValue += "\n";
    }
    this.cm.setValue(startingValue);
  }

  prefillEditor(level){
    let doc = this.cm.getDoc();
    doc.replaceRange(level.setup.main, {line: 0, ch: 0})
  }

  addReadOnlyListener(){
    this.cm.on('beforeChange', this.readOnlyHandler)
  }

  removeReadOnlyListener(){
    this.cm.off('beforeChange', this.readOnlyHandler);
  }

  readOnlyHandler(cm, change){
    if (this.game.level.readOnlyLines.indexOf(change.from.line) !== -1){
      change.cancel();
    }
  }



  handleInput(event){
    const codeMirrorInput = this.cm.getValue();
    this.view.updateContent(codeMirrorInput);
  }
}

// Sample code to draw rectangle found online for testing purposes only
// function draw() {
//   var canvas = document.getElementById('canvas');
//   if (canvas.getContext) {
//     var ctx = canvas.getContext('2d');
//     ctx.fillRect(25, 25, 100, 100);
//     ctx.clearRect(45, 45, 60, 60);
//     ctx.strokeRect(50, 50, 50, 50);
//   }
// }