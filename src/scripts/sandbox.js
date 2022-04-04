import SandboxView from "./sandbox_view"
import SandboxEditor from "./sandbox_editor"

export default class Sandbox{
  constructor({iframe: iframe, codemirror: codemirror}){
    this.view = new SandboxView({level: null, iframe: iframe})
    this.editor = new SandboxEditor({editor: codemirror, view: this.view})
  }
}