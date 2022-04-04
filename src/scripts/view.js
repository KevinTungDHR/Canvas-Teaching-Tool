export default class View {
  constructor({level: level, iframe: iframe}){
    this.defaultBody = `
      <div class='canvas-container'>
        <canvas id='canvas' height="700px" width="770px"></canvas>
        <canvas id='background' height="700px" width="770px"></canvas>
      </div>`;
    this.level = level;
    this.iframe = iframe;
    this.setupView = this.setupView.bind(this);
    this.iframe.addEventListener("load", this.setupView);
    // Avoid adding event listener everytime we change levels
  }

  setLevel(level){
    this.level = level;
  }
  // need to update iframe to reflect code editor
  setupView(){
    this.addHtmlContent();
    this.addBackgroundCanvasContent();
    this.addInitialCanvasContent();
  }

  addHtmlContent(){
    let htmlContent = { type: "html", value: this.defaultBody }
    this.iframe.contentWindow.postMessage(htmlContent, "*");
  }

  // Wrap everything in an anonymous function so that you can redeclare variables
  // Need to find a fix for global variables
  addBackgroundCanvasContent(){
    const setupVal = `(() => {${this.level.setup.background}})()`
    let jsSetup = { type: "setupScript", value: setupVal }
    this.iframe.contentWindow.postMessage(jsSetup, "*");
  }

  addInitialCanvasContent(){
    this.updateContent(this.level.setup.main)
  }

  updateContent(content){
    const value = `(() => {${content}})()`;
    const script = { type: 'script', value };
    this.iframe.contentWindow.postMessage(script, "*");
  }
}
