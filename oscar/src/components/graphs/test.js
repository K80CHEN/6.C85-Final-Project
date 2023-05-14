import { missing } from "../../data/missing.js";
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
const data = missing.data.sort(function(a, b) {
  return new Date(a['Incident year'], months.indexOf(a['Reported Month'])) - new Date(b['Incident year'], months.indexOf(b['Reported Month']));
});

console.log(data);