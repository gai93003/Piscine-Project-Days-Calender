
import fs from "fs";
import daysData from "./days.json" with { type: "json" };
import { getNthWeekdayOfMonth } from "./common.mjs";

const formatDateToICS = (date) => {
    return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
};

const generateICS = (year) => {
    let icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//My Calendar//EN\n`;

    daysData.forEach(event => {
        const eventDate = getNthWeekdayOfMonth(
            year, event.monthName, event.dayName, event.occurrence || event.occurrence
        );

        if (!eventDate) {
            console.warn(`Skipping event "${event.name}" due to invalid date.`);
            return; // Skip events with invalid dates
        }

        icsContent += `BEGIN:VEVENT\n`;
        icsContent += `DTSTAMP:${formatDateToICS(new Date())}\n`;
        icsContent += `DTSTART;VALUE=DATE:${eventDate.toISOString().split("T")[0].replace(/-/g, "")}\n`;
        icsContent += `SUMMARY:${event.name}\n`;
        icsContent += `END:VEVENT\n`;
    });

    icsContent += `END:VCALENDAR`;
    return icsContent;
};


// Set year dynamically or use current year
const currentYear = new Date().getFullYear();
const icsData = generateICS(currentYear);

// Write to file
fs.writeFileSync("generated-days.ics", icsData);
console.log("✅ ICS file generated successfully.");
