import { MouseController } from "./MouseInput";

export default class BasicMouseController implements MouseController {
  _lastMouseX: number;
  _lastMouseY: number;
  _focused: boolean;

  constructor() {
    this._focused = false;
    this.clearLastMouseCoords();
  }

  setLastMouseCoords(x: number, y: number) {
    this._lastMouseX = x;
    this._lastMouseY = y;
  }

  lastMouseX() {
    return this._lastMouseX;
  }

  lastMouseY() {
    return this._lastMouseY;
  }

  hasLastMouse() {
    return !isNaN(this.lastMouseX()) || !isNaN(this.lastMouseY());
  }

  mousemove(x: number, y: number) {
    this.setLastMouseCoords(x, y);
  }

  wheel(_mag: number, _x: number, _y: number): boolean {
    return false;
  }

  mousedown(_button: any, _downStart: number, x: number, y: number): boolean {
    this.setLastMouseCoords(x, y);
    return true;
  }

  clearLastMouseCoords() {
    this.setLastMouseCoords(NaN, NaN);
  }

  mouseup(_button: any, _downEnd: number, _x: number, _y: number) {
    this.clearLastMouseCoords();
  }

  blur() {
    this._focused = false;
  }

  focus() {
    this._focused = true;
  }

  focused() {
    return this._focused;
  }
}
