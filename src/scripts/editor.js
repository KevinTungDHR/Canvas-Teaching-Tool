export default class Editor{
  constructor({editor: cm, view: view }){
    this.cm = cm;
    this.view = view;
    this.handleInput = this.handleInput.bind(this);
    this.cm.on("keyup", this.handleInput);
  }

  setView(view){
    this.view = view;
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