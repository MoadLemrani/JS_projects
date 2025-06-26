function calculateAge() {
  const bd = document.getElementById("bd").value;
  const result = document.getElementById("result");

  if (!bd) {
    result.textContent = "Please select your birthday";
    return;
  }

  const birthDate = new Date(bd);
  const today = new Date();

  let ageYears = today.getFullYear() - birthDate.getFullYear();
  let ageMonths = today.getMonth() - birthDate.getMonth();
  let ageDays = today.getDate() - birthDate.getDate();

  if (ageDays < 0) {
    ageMonths--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    ageDays += prevMonth.getDate();
  }

  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }

  result.textContent = `You are ${ageYears} years, ${ageMonths} months and ${ageDays} days old.`;
}