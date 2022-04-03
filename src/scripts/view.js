export default class View {
  constructor({level: level, renderView: renderView}){
    this.defaultBody = `
      <h1>hello</h1>
      <div class='canvas-container'>
        <canvas id='canvas' height="500px" width="500px"></canvas>
        <canvas id='background' height="500px" width="500px"></canvas>
      </div>`;
    this.level = level;
    this.renderView = renderView;
    this.setupView = this.setupView.bind(this);
    this.renderView.addEventListener("load", this.setupView);
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
    this.renderView.contentWindow.postMessage(htmlContent, "*");
  }

  // Wrap everything in an anonymous function so that you can redeclare variables
  // Need to find a fix for global variables
  addBackgroundCanvasContent(){
    const setupVal = `(() => {${this.level.setup.background}})()`
    let jsSetup = { type: "setupScript", value: setupVal }
    this.renderView.contentWindow.postMessage(jsSetup, "*");
  }

  addInitialCanvasContent(){
    this.updateContent(this.level.setup.main)
  }

  updateContent(content){
    const value = `(() => {${content}})()`;
    const script = { type: 'script', value };
    this.renderView.contentWindow.postMessage(script, "*");
  }
}
