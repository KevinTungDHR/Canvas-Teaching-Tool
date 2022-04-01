export default class Editor{
  constructor({editor: el, iframe: iframe }){
    this.el = el;
    this.iframe = iframe;
    this.output = `<html>${this.el.getValue()}</html>`;
    this.handleInput = this.handleInput.bind(this);
    this.el.on("keyup", this.handleInput);
  }

  handleInput(event){
    this.output = `<html>${this.el.getValue()}</html>`;
    console.log(this.iframe);
    this.iframe.setAttribute("srcdoc", this.output);
  }
}