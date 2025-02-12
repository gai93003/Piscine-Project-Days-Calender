export function getNthWeekdayOfMonth(year, monthName, dayName, occurrence) {
    const monthIndex = new Date(`${monthName} 1, ${year}`).getMonth();
    const dayIndex = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].indexOf(dayName);

    if (occurrence === "last") {
        let lastMatchingDay = null;
        for (let day = 1; day <= 31; day++) {
            const date = new Date(year, monthIndex, day);

            if (date.getMonth() !== monthIndex) {
                break;
            }

            if (date.getDay() === dayIndex) {
                lastMatchingDay = date;
            }
        }
        return lastMatchingDay;
    }

    const occurrenceMap = {
        "first": 1,
        "second": 2,
        "third": 3,
        "fourth": 4,
        "fifth": 5
    };

    if (!(occurrence in occurrenceMap)) {
        return null;
    }

    const occurrenceNum = occurrenceMap[occurrence];
    let count = 0;

    for (let day = 1; day <= 31; day++) {
        const date = new Date(year, monthIndex, day);
        if (date.getMonth() !== monthIndex) {
            break;
        }
        if (date.getDay() === dayIndex) {
            count++;
            if (count === occurrenceNum) {
                return date;
            }
        }
    }

    return null;
}
