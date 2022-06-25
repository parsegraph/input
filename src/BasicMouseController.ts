import { MouseController } from "./MouseInput";

export default class BasicMouseController implements MouseController {
  _lastMouseX: number;
  _lastMouseY: number;
  _focused: boolean;

  constructor() {
    this._focused = false;
    this.setLastMouseCoords(NaN, NaN);
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
    return !isNaN(this.lastMouseX()) || !isNaN(this.lastMouseY())
  }

  mousemove(x: number, y: number) {
    this.setLastMouseCoords(x, y);
  }

  wheel(_: number, x:number, y:number): boolean {
    return false;
  }

  mousedown(_: any, _2: number): boolean {
    return true;
  }

  mouseup(button: any) {
    this._lastMouseX = NaN;
    this._lastMouseY = NaN;
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
