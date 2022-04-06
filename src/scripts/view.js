export default class View {
  constructor({level: level, iframe: iframe}){
    this.defaultBody = `
      `;
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
    this.addSolutionCanvas()
  }

  addHtmlContent(){
    let htmlContent = { type: "html", value: this.defaultBody };
    this.iframe.contentWindow.postMessage(htmlContent, "*");
  }

  // Wrap everything in an anonymous function so that you can redeclare variables
  // Need to find a fix for global variables
  addBackgroundCanvasContent(){
    const setupVal = `(() => {${this.level.setup.background}})()`;
    let jsSetup = { type: "setupScript", value: setupVal };
    this.iframe.contentWindow.postMessage(jsSetup, "*");
  }

  addSolutionCanvas(){
    if (this.level.setup.solution){
      const setupVal = `(() => {${this.level.setup.solution}})()`;
      let solutionSetup = { type: "solutionScript", value: setupVal };
      this.iframe.contentWindow.postMessage(solutionSetup, "*");
    }
  }

  addInitialCanvasContent(){
    this.updateContent(this.level.setup.main);
  }

  updateContent(content){
    const value = `(() => {${content}})()`;
    const script = { type: 'script', value };
    this.iframe.contentWindow.postMessage(script, "*");
  }
}
