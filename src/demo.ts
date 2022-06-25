import BasicMouseController from "./BasicMouseController"
import TouchInput from "./TouchInput";
import MouseInput from "./MouseInput";

class DemoMouseController extends BasicMouseController {
  _cb: (...args: any[])=>void;

  constructor(cb: (...args:any[])=>void) {
    super();
    this._cb = cb;
  }

  log(...args: any[]) {
    this._cb(...args);
  }

  wheel(wheel: number, x: number, y: number): boolean {
    this.log("Wheel", wheel, x, y);
    super.wheel(wheel, x, y);
    return false;
  }

  mousedown(x: number, y: number): boolean {
    super.mousedown(x, y);
    this.log("Mousedown");
    return true;
  }

  mousemove(x: number, y: number): boolean {
    if (this.hasLastMouse()) {
      this.log("Mousemove", x - this.lastMouseX(), y - this.lastMouseY());
    }
    super.mousemove(x, y);
    return true;
  }

  mouseup(button: any) {
    this.log("Mouseup", button);
    super.mouseup(button);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("demo");

  const control = new DemoMouseController((...args: any[])=>{
    console.log(...args);
  });

  const touchInput = new TouchInput();
  touchInput.setControl(control);
  touchInput.mount(root);

  const mouseInput = new MouseInput();
  mouseInput.setControl(control);
  mouseInput.mount(root);
});
