import { assert } from "chai";
import Input from "../src/index";

describe("Package", function () {
  it("works", () => {
    const mainCont = document.createElement("div");
    const domCont = document.createElement("div");
    assert.ok(new Input(mainCont, domCont, () => false));
  });
});
