import addListeners from "./addListeners";
import normalizeWheel from "parsegraph-normalizewheel";
import AbstractInput from "./AbstractInput";
import { FocusController } from "./FocusInput";

export interface MouseController extends FocusController {
  wheel(mag: number, x: number, y: number): boolean;
  mousemove(x: number, y: number): boolean;
  mousedown(button: any, downStart: number, x: number, y: number): boolean;
  mouseup(button: any, downEnd: number, x: number, y: number): boolean;
  lastMouseX(): number;
  lastMouseY(): number;
  update(t: Date): boolean;
}

export default class MouseInput extends AbstractInput<MouseController> {
  addListeners(container: HTMLElement): () => void {
    container.style.pointerEvents = "auto";
    return addListeners(this, container, [
      ["DOMMouseScroll", this.onWheel],
      ["mousewheel", this.onWheel],
      ["mousedown", this.mousedownListener],
      ["mousemove", this.mousemoveListener],
      ["mouseup", this.mouseupListener],
    ]);
  }

  /**
   * The receiver of all canvas wheel events.
   *
   * @param {WheelEvent} event current wheel event
   */
  onWheel(event: WheelEvent) {
    event.preventDefault();

    const x = event.offsetX;
    const y = event.offsetY;

    // console.log("Wheel event", wheel);
    const e = normalizeWheel(event);
    if (this.control()) {
      this.control().wheel(e.spinY, x, y);
    }
  }

  mousemoveListener(event: MouseEvent) {
    this.control().mousemove(event.offsetX, event.offsetY);
  }

  mouseupListener(event: MouseEvent) {
    this.control().mouseup(
      event.button,
      Date.now(),
      event.offsetX,
      event.offsetY
    );
  }

  mousedownListener(event: MouseEvent) {
    if (
      this.control().mousedown(
        event.button,
        Date.now(),
        event.offsetX,
        event.offsetY
      )
    ) {
      event.preventDefault();
      event.stopPropagation();
      this.container().focus();
    }
  }
}
