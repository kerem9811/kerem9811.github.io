// Utility function to format numbers with dots
function formatNumberWithDots(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Function to render the revenue chart
function renderRevenueChart(labels, currentMonthData, previousMonthData) {
  const ctx = document.getElementById("revenueChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Denne måned",
          data: currentMonthData,
          borderColor: "#2596be",
          backgroundColor: "rgba(37, 150, 190, 0.2)",
          fill: true,
        },
        {
          label: "Forrige måned",
          data: previousMonthData,
          borderColor: "rgba(146, 154, 155, 0.6)",
          backgroundColor: "rgba(146, 154, 155, 0.2)",
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          beginAtZero: true,
        },
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

// Call the function to fetch data and update the UI
fetchDataAndUpdateUI();

// Function to fetch data and update the UI
async function fetchDataAndUpdateUI() {
  try {
    const response = await fetch("dummyData.json"); // Updated path
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Handle potential missing data (more robust)
    const safeData = data || {}; // Default to empty object if data is null/undefined

    // Check if the data exists, and fill with a default object if it does not
    if (!data || typeof data !== "object") {
      console.log("Data fetched from API is invalid:", data);

      // Create dummy object to fill data
      const dummyData = {
        expectedRevenue: { value: 0, result: "N/A" },
        previousRevenue: { value: 0, result: "N/A" },
        bestRevenue: { value: 0, result: "N/A" },
        invoicingPercentage: { value: "0%", previous: "N/A" },
        consultantsPercentage: { value: "0%", previous: "N/A" },
        hourlyRate: { value: 0, previous: "N/A" },
        chartData: { labels: [], currentMonth: [], previousMonth: [] },
        events: [{ name: "No events", date: "N/A" }],
        timeSinceLastEntry: [{ name: "No entries", days: "N/A" }],
        birthdays: [{ name: "No birthdays", date: "N/A" }],
        linkedin: {
          posts: { count: 0, change: "N/A" },
          views: { count: 0, change: "N/A" },
          followers: { count: 0, change: "N/A", total: 0 },
        },
      };

      // Assign dummyData to data to avoid errors below
      data = dummyData;
    }

    // Top Data Boxes
    document.getElementById("expected-revenue").textContent =
      formatNumberWithDots(data.expectedRevenue.value);
    // document.getElementById("result-expected").textContent = `RESULTAT: ${data.expectedRevenue.result}`;
    document.getElementById("previous-revenue").textContent =
      formatNumberWithDots(data.previousRevenue.value);
    // document.getElementById("result-previous").textContent = `RESULTAT: ${data.previousRevenue.result}`;
    document.getElementById("best-revenue").textContent = formatNumberWithDots(
      data.bestRevenue.value
    );
    // document.getElementById("result-best").textContent = `RESULTAT: ${data.bestRevenue.result}`;

    document.getElementById("budget-month").textContent = formatNumberWithDots(
      data.budgetMonth.value
    );
    document.getElementById("budget-lastyear").textContent =
      formatNumberWithDots(data.budgetLastYear.value);
    document.getElementById("month-sofar").textContent = formatNumberWithDots(
      data.monthSofar.value
    );

    // Data-box-2
    // Invoicing
    document.getElementById("invoicing-percentage").textContent =
      data.invoicingPercentage.value;
    document.getElementById("last-invoicing").textContent =
      data.invoicingPercentage.previous;
    // Consultants
    document.getElementById("consultants-percentage").textContent =
      data.consultantsPercentage.value;
    document.getElementById("last-consultants-label").textContent =
      data.consultantsPercentage.previous;
    // Hourly rate
    document.getElementById("hourly-rate").textContent = data.hourlyRate.value;
    document.getElementById("last-hourly-rate-label").textContent =
      data.hourlyRate.previous;
    // LinkedIn posts
    document.getElementById("linkedin-posts").textContent =
      data.linkedin.posts.count;
    document.getElementById("last-linkedin-posts-label").textContent =
      data.linkedin.posts.change;
    // LinkedIn views
    document.getElementById("linkedin-views").textContent =
      data.linkedin.views.count;
    document.getElementById("last-linkedin-views-label").textContent =
      data.linkedin.views.change;
    // LinkedIn followers
    document.getElementById("linkedin-followers").textContent =
      data.linkedin.followers.count;
    document.getElementById("last-linkedin-followers-label").textContent =
      data.linkedin.followers.change;

    // Chart Data (using optional chaining)
    const chartData = data.chartData;
    if (
      chartData &&
      chartData.labels &&
      chartData.currentMonth &&
      chartData.previousMonth
    ) {
      renderRevenueChart(
        chartData.labels,
        chartData.currentMonth,
        chartData.previousMonth
      );
    } else {
      console.warn("Chart data is missing or incomplete.");
      // Render a placeholder chart, or show an error message on the UI
      renderRevenueChart([], [], []); // Render an empty chart
    }

    // Upcoming Events (using map and join for concise list creation)
    const eventsList =
      data.events
        .map(
          (event) =>
            `<li><span>${event.name}</span> <span class="event-date">${event.date}</span></li>`
        )
        .join("") || "<li>No upcoming events</li>";
    document.getElementById("events-list").innerHTML = eventsList;

    // Time Since Last Entry
    const timeSinceList =
      data.timeSinceLastEntry
        .map(
          (entry) =>
            `<li><span>${entry.name}</span> <span class="days">${entry.days} days</span></li>`
        )
        .join("") || "<li>No entries</li>";
    document.getElementById("time-since-last-entry-list").innerHTML =
      timeSinceList;

    // Birthdays
    const birthdayList =
      data.birthdays
        .map(
          (bday) =>
            `<li><span>${bday.name}</span> <span class="event-date">${bday.date}</span></li>`
        )
        .join("") || "<li>No upcoming birthdays</li>";
    document.getElementById("birthday-list").innerHTML = birthdayList;
  } catch (error) {
    console.error("Error fetching or processing data:", error);
    // Display a user-friendly error message on the UI
  }
}

// Observe changes to the DOM
document.addEventListener("DOMContentLoaded", function () {
  const targetNode = document.getElementById("revenueChart");
  const config = { attributes: true, childList: true, subtree: true };

  const callback = function (mutationsList, observer) {
    for (let mutation of mutationsList) {
      if (mutation.type === "childList") {
        console.log("A child node has been added or removed.");
      }
      //else if (mutation.type === 'attributes') {
      //  console.log('The ' + mutation.attributeName + ' attribute was modified.');
      //}
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);

  // Initialize Bootstrap dropdown
  const dropdownElementList = [].slice.call(
    document.querySelectorAll(".dropdown-toggle")
  );
  const dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
    return new bootstrap.Dropdown(dropdownToggleEl);
  });
});
