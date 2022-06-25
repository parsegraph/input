import TouchRecord from "./TouchRecord";
import addListeners from "./addListeners";
import { midPoint } from "parsegraph-matrix";
import AbstractInput from "./AbstractInput";
import fuzzyEquals from "parsegraph-fuzzyequals";
import { MouseController } from "./MouseInput";

const WHEEL_GRANULARITY = 1;

export default class TouchInput extends AbstractInput<MouseController> {
  _monitoredTouches: TouchRecord[];
  _touchstartTime: number;
  _touchendTimeout: any;
  _zoomSize: number;

  constructor() {
    super();
    this._monitoredTouches = [];
    this._touchstartTime = null;
  }

  addListeners(container: HTMLElement): () => void {
    container.setAttribute("tabIndex", "0");
    return addListeners(this, container, [
      ["touchstart", this.touchstartListener],
      ["touchmove", this.touchmoveListener],
      ["touchend", this.removeTouchListener],
      ["touchcancel", this.removeTouchListener],
    ]);
  }

  touchstartListener(event: TouchEvent) {
    event.preventDefault();
    this.control().focus();
    if (this._touchendTimeout) {
      clearTimeout(this._touchendTimeout);
      this._touchendTimeout = null;
    }
    for (let i = 0; i < event.changedTouches.length; ++i) {
      const touch = event.changedTouches[i];
      const touchX = touch.pageX;
      const touchY = touch.pageY;
      const touchRec = new TouchRecord(
        touch.identifier,
        touchX,
        touchY,
        touchX,
        touchY
      );
      this._monitoredTouches.push(touchRec);
      this.control().mousedown(touch.identifier, Date.now(), touchX, touchY);

      touchRec.touchstart = Date.now();
      this._touchstartTime = Date.now();
    }

    if (this.numActiveTouches() > 1) {
      this._touchstartTime = null;
    }
  }

  touchmoveListener(event: TouchEvent) {
    /* if (!this._focused) {
      return;
    }*/
    event.preventDefault();
    // console.log("touchmove", event);

    for (let i = 0; i < event.changedTouches.length; ++i) {
      const touch = event.changedTouches[i];
      const touchRecord = this.getTouchByIdentifier(touch.identifier);

      const touchX = touch.pageX;
      const touchY = touch.pageY;
      /* this.handleEvent("touchmove", {
        multiple: this._monitoredTouches.length != 1,
        x: touchX,
        y: touchY,
        dx: touchX - touchRecord.x,
        dy: touchY - touchRecord.y,
      });*/
      touchRecord.x = touchX;
      touchRecord.y = touchY;
      if (this.numActiveTouches() === 1) {
        this.control().mousemove(touchX, touchY);
      }
    }

    if (this.numActiveTouches() > 1) {
      const zoomCenter = midPoint(
        this._monitoredTouches[0].x,
        this._monitoredTouches[0].y,
        this._monitoredTouches[1].x,
        this._monitoredTouches[1].y
      );

      const zoomSize = Math.sqrt(
        Math.pow(this._monitoredTouches[1].x - this._monitoredTouches[0].x, 2) +
          Math.pow(this._monitoredTouches[1].y - this._monitoredTouches[0].y, 2)
      );
      if (
        isNaN(this._zoomSize) ||
        !fuzzyEquals(zoomSize, this._zoomSize, WHEEL_GRANULARITY)
      ) {
        this.control().wheel(
          this._zoomSize > zoomSize ? WHEEL_GRANULARITY : -WHEEL_GRANULARITY,
          zoomCenter[0],
          zoomCenter[1]
        );
        this._zoomSize = zoomSize;
      }
    }
  }

  removeTouchListener(event: TouchEvent) {
    // console.log("touchend");
    for (let i = 0; i < event.changedTouches.length; ++i) {
      const touch = event.changedTouches[i];
      const removedTouch = this.removeTouchByIdentifier(touch.identifier);
      this.control().mouseup(touch.identifier, Date.now(), removedTouch.x, removedTouch.y);
    }

    if (this.numActiveTouches() > 0) {
      return;
    }
    this._touchstartTime = null;
  }

  numActiveTouches() {
    let realMonitoredTouches = 0;
    this._monitoredTouches.forEach(function (touchRec) {
      if (touchRec.touchstart) {
        realMonitoredTouches++;
      }
    }, this);
    return realMonitoredTouches;
  }

  getTouchByIdentifier(identifier: number): TouchRecord {
    for (let i = 0; i < this._monitoredTouches.length; ++i) {
      if (this._monitoredTouches[i].identifier == identifier) {
        return this._monitoredTouches[i];
      }
    }
    return null;
  }

  removeTouchByIdentifier(identifier: number) {
    let touch = null;
    for (let i = 0; i < this._monitoredTouches.length; ++i) {
      if (this._monitoredTouches[i].identifier == identifier) {
        touch = this._monitoredTouches.splice(i--, 1)[0];
        break;
      }
    }
    return touch;
  }
}
