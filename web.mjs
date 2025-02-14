// This is a placeholder file which shows how you can access functions and data defined in other files.
// It can be loaded into index.html.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getNthWeekdayOfMonth } from "./common.mjs";
import daysData from "./days.json" with { type: "json" };

let START_YEAR = 1950;
let END_YEAR   = 2050;
let monthName  = ["January", "February", "March", "April", "May", "June", "July", 
                    "August", "September", "October", "November", "December"];

export function populateYearMonth() {
    let today = new Date();
    let year  = document.getElementById("year-selector");
    let month = document.getElementById("month-selector");

    for(let i = START_YEAR; i <= END_YEAR; i++) {
        let option = document.createElement("option");
        option.textContent = i;
        option.value = i;
        year.appendChild(option);
    }

    for(let j = 0; j < 12; j++) {
        let option = document.createElement("option");
        option.textContent = monthName[j];
        option.value = monthName[j];
        month.appendChild(option);
    }

    year.value = today.getFullYear();
    month.value = monthName[today.getMonth()];
}

export function createCalendar() {
    let year = document.getElementById("year-selector");
    let month = document.getElementById("month-selector");
    let table = document.getElementById("calendar");
    let tbody = table.getElementsByTagName("tbody")[0];
    if(tbody) tbody.remove();

    let selectedYear  = parseInt(year.value);
    let selectedMonth = monthName.indexOf(month.value);
    let firstDay = new Date(selectedYear, selectedMonth, 1).getDay();
    let lastDate  = new Date(selectedYear, selectedMonth + 1, 0).getDate();

    tbody = document.createElement("tbody");
    let row = document.createElement("tr");

    let events = [];
    daysData.forEach(function(event){
        let eventDate = getNthWeekdayOfMonth(selectedYear, event.monthName, event.dayName, event.occurence);
        if(eventDate != null) {
            if(eventDate.getMonth() === monthName.indexOf(month.value)) {
                let test = [];
                test[0] = eventDate;
                test[1] = event;
                events.push(test);
            }
        }
    });

    let num = firstDay;
    if(num == 0) num = 7;
    for (let i = 1; i < num; i++) {
        let cell = document.createElement("td");
        row.appendChild(cell);
    }
        
    let date = 1;
    for(let j = firstDay; date <= lastDate; j++) {
        let cell = document.createElement("td");
        cell.textContent = date;
        row.appendChild(cell);

        events.forEach(function(event) {
            let mDate = event[0].getDate();
            if(date === mDate) {
                let br = document.createElement("br");
                cell.appendChild(br);
                cell.innerText = cell.textContent + "\r\n" + event[1].name;
            }
        });

        if (j % 7 === 0) { 
            tbody.appendChild(row);
            row = document.createElement("tr");
        }
        date = date + 1;
    }

    if (row.childNodes.length > 0) {
        tbody.appendChild(row);
    }

    table.appendChild(tbody);
}

window.onload = function() {
    populateYearMonth();
    createCalendar();

    let year    = document.getElementById("year-selector");
    let month   = document.getElementById("month-selector");
    let nextBtn = document.getElementById("next-btn");
    let prevBtn = document.getElementById("prev-btn"); 

    month.addEventListener("change", createCalendar);
    year.addEventListener("change", createCalendar);
    nextBtn.addEventListener("click", function(event) {
        let nextMonth = monthName.indexOf(month.value) + 1;
        if(nextMonth <= 11) month.value = monthName[nextMonth];
        else {
            if(year.value >= END_YEAR) return; 
            month.value = monthName[0];
            year.value = parseInt(year.value) + 1;
        }
        createCalendar();
    });
    prevBtn.addEventListener("click", function(event) {
        let prevMonth = monthName.indexOf(month.value) - 1;
        if(prevMonth != -1) month.value = monthName[prevMonth];
        else {
            if(year.value <= START_YEAR) return; 
            month.value = monthName[monthName.length - 1];
            year.value = parseInt(year.value) - 1;
        }
        createCalendar();
    });
}


