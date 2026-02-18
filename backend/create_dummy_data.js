const XLSX = require('xlsx');
const path = require('path');

const data = [
    { "Register No": 101, "Name": "Alice", "UIT2404 3 R": "P" },
    { "Register No": 102, "Name": "Bob", "UIT2404 3 R": "P" },
    { "Register No": 103, "Name": "Charlie", "UIT2404 3 R": "F" },
    // Add more dummy data as needed
];

// Add 163 more successful students to match closely with the notebook (166 total)
for (let i = 0; i < 163; i++) {
    data.push({ "Register No": 200 + i, "Name": `Student ${i}`, "UIT2404 3 R": "P" });
}

const ws = XLSX.utils.json_to_sheet(data);
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

const filePath = path.join(__dirname, 'data', 'Clean_Result_Analysis_5002_Sem4.xlsx');
XLSX.writeFile(wb, filePath);
console.log('Dummy Excel file created at:', filePath);
