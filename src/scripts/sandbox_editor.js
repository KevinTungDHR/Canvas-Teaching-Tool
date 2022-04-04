export default class SandboxEditor{
  constructor({editor: cm, view: view }){
    this.cm = cm;
    this.view = view;
    this.bindHandlers();
    this.setMinEditorLines();
    this.cm.on("keyup", this.handleInput);
  }

  setView(view){
    this.view = view;
  }

  bindHandlers(){
    this.handleInput = this.handleInput.bind(this);
  }

  setMinEditorLines(){
    const minLines = 5;
    let startingValue = "";
    for(let i = 0; i < minLines; i++){
      startingValue += "\n";
    }
    this.cm.setValue(startingValue);
  }

  handleInput(event){
    const codeMirrorInput = this.cm.getValue();
    this.view.updateContent(codeMirrorInput);
  }
}
