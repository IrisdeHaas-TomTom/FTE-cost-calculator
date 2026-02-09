// Dummy job data
const jobData = [
    { name: "Software Engineer II", level: 16, midpoint: 55000 },
    { name: "Senior Software Engineer", level: 17, midpoint: 68000 },
    { name: "Engineering Manager", level: 18, midpoint: 82000 },
    { name: "Director of Engineering", level: 19, midpoint: 105000 }
];

// Bonus rules
function getBonusPercent(level) {
    if (level === 16) return 7.5;
    if (level === 17) return 10;
    if (level === 18) return 15;
    return 20;
}

// Populate job dropdown
const jobSelect = document.getElementById("jobSelect");
jobData.forEach(j => {
    const opt = document.createElement("option");
    opt.value = j.name;
    opt.textContent = j.name;
    jobSelect.appendChild(opt);
});

// Listen for changes
jobSelect.addEventListener("change", updateJobData);
document.querySelectorAll("select, input").forEach(el => {
    el.addEventListener("input", calculateAll);
});

// Update job-related fields
function updateJobData() {
    const job = jobData.find(j => j.name === jobSelect.value);
    if (!job) return;

    document.getElementById("jobLevel").value = job.level;
    document.getElementById("midpoint").value = job.midpoint;
    document.getElementById("bonusPercent").value = getBonusPercent(job.level);

    calculateAll();
}

// Main calculation engine
function calculateAll() {
    const midpoint = Number(document.getElementById("midpoint").value) || 0;
    const bonusPercent = Number(document.getElementById("bonusPercent").value) || 0;

    const salaryYear = midpoint;
    const salaryMonth = salaryYear / 12;

    const bonusValue = salaryYear * (bonusPercent / 100);

    const stockPrice = Number(document.getElementById("stockPrice").value);
    const rsuValue = Number(document.getElementById("rsuValue").value);

    const rsuUnits = rsuValue / stockPrice;
    document.getElementById("rsuUnits").value = rsuUnits.toFixed(2);

    const compHTML = `
        <p><strong>Base Salary (Year):</strong> €${salaryYear.toLocaleString()}</p>
        <p><strong>Base Salary (Month):</strong> €${salaryMonth.toFixed(2)}</p>
        <p><strong>Bonus Amount:</strong> €${bonusValue.toLocaleString()}</p>
        <p><strong>RSU Annual Value:</strong> €${rsuValue.toLocaleString()}</p>
    `;
    document.getElementById("compSummary").innerHTML = compHTML;

    const costYear = salaryYear + bonusValue + rsuValue;
    const costMonth = costYear / 12;

    const costHTML = `
        <p><strong>Total Cost (Year):</strong> €${costYear.toLocaleString()}</p>
        <p><strong>Total Cost (Month):</strong> €${costMonth.toFixed(2)}</p>
    `;
    document.getElementById("costSummary").innerHTML = costHTML;

    const rangeHTML = `
        <p><strong>Low Range:</strong> €${(midpoint * 0.9).toLocaleString()}</p>
        <p><strong>Target Range:</strong> €${midpoint.toLocaleString()}</p>
        <p><strong>High Range:</strong> €${(midpoint * 1.1).toLocaleString()}</p>
    `;
    document.getElementById("rangeSummary").innerHTML = rangeHTML;
}

// Initial
updateJobData();
