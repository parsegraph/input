import BasicMouseController from "./BasicMouseController";
import TouchInput from "./TouchInput";
import MouseInput from "./MouseInput";

class DemoMouseController extends BasicMouseController {
  _cb: (...args: any[]) => void;

  constructor(cb: (...args: any[]) => void) {
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

  mousedown(button: any, downStart: number, x: number, y: number): boolean {
    super.mousedown(button, downStart, x, y);
    this.log("Mousedown", button, downStart, x, y);
    return true;
  }

  mousemove(x: number, y: number): boolean {
    if (this.hasLastMouse()) {
      this.log("Mousemove", x - this.lastMouseX(), y - this.lastMouseY());
    }
    super.mousemove(x, y);
    return true;
  }

  mouseup(button: any, downEnd: number, x: number, y: number) {
    this.log("Mouseup", button, downEnd, x, y);
    return super.mouseup(button, downEnd, x, y);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("demo");

  const control = new DemoMouseController((...args: any[]) => {
    root.innerHTML = args.join(" ") + "<br/>" + root.innerHTML;
  });

  const touchInput = new TouchInput();
  touchInput.setControl(control);
  touchInput.mount(root);

  const mouseInput = new MouseInput();
  mouseInput.setControl(control);
  mouseInput.mount(root);
});
