import { assert } from "chai";
import todo from "../dist/parsegraph-input";

describe("Package", function () {
  it("works", () => {
    assert.equal(todo(), 42);
  });
});
