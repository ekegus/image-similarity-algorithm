import { sum } from "./main";

describe("sum", () => {
  test("outputs something", () => {
    expect(sum(1, 1)).toEqual(2);
  });
});
