import { populateYearMonth, createCalendar } from "./web.mjs"; 
import { getNthWeekdayOfMonth } from "./common.mjs";
import daysData from "./days.json";

describe("Calendar UI Elements", () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <select id="year-selector"></select>
            <select id="month-selector"></select>
            <button id="next-btn">Next</button>
            <button id="prev-btn">Previous</button>
            <table id="calendar"><tbody></tbody></table>
        `;
    });

    test("should have select elements with correct IDs", () => {
        populateYearMonth();

        const yearSelector = document.getElementById("year-selector");
        const monthSelector = document.getElementById("month-selector");

        expect(yearSelector).not.toBeNull();
        expect(monthSelector).not.toBeNull();
    });

    test("should populate year-selector with years from 1950 to 2050", () => {
        populateYearMonth();
        const yearSelector = document.getElementById("year-selector");

        expect(yearSelector.children.length).toBe(101);
        expect(yearSelector.firstChild.value).toBe("1950");
        expect(yearSelector.lastChild.value).toBe("2050");
    });

    test("should populate month-selector with 12 months", () => {
        populateYearMonth();
        const monthSelector = document.getElementById("month-selector");

        expect(monthSelector.children.length).toBe(12);
        expect(monthSelector.firstChild.textContent).toBe("January");
        expect(monthSelector.lastChild.textContent).toBe("December");
    });

    test("should have buttons with correct text content", () => {
        const nextButton = document.getElementById("next-btn");
        const prevButton = document.getElementById("prev-btn");

        expect(nextButton).not.toBeNull();
        expect(nextButton.textContent).toBe("Next");

        expect(prevButton).not.toBeNull();
        expect(prevButton.textContent).toBe("Previous");
    });
});
