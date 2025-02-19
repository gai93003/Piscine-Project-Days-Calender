import "@testing-library/jest-dom"; // Enable custom matchers
import { fireEvent, screen } from "@testing-library/dom";

import { getNthWeekdayOfMonth } from "./common.mjs";

test("should return the correct first Monday of January 2025", () => {
    const result = getNthWeekdayOfMonth(2025, "January", "Monday", "first");
    expect(result.toISOString().split("T")[0]).toBe("2025-01-06");
});

test("should return the correct last Friday of March 2025", () => {
    const result = getNthWeekdayOfMonth(2025, "March", "Friday", "last");
    expect(result.toISOString().split("T")[0]).toBe("2025-03-28");
});

test("should return null for an invalid occurrence", () => {
    const result = getNthWeekdayOfMonth(2025, "January", "Monday", "seventh");
    expect(result).toBeNull();
});
