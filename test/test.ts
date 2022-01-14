import { assert } from "chai";
import Input from "../dist/parsegraph-input";

describe("Package", function () {
  it("works", () => {
    const mainCont = document.createElement("div");
    const domCont = document.createElement("div");
    assert.ok(new Input(mainCont, domCont, () => false));
  });
});
