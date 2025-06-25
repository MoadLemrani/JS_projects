function generatePassword() {
  const length = 12;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  document.getElementById("password").value = password;
}

function copyPassword() {
  const passwordInput = document.getElementById("password");
  const copyBtn = document.getElementById("copyBtn");  
  if(passwordInput.value === "") return;

  navigator.clipboard.writeText(passwordInput.value).then(
    () => {
      copyBtn.innerText = "✔️";
      copyBtn.disabled = true;
      setTimeout(
        () => {
          copyBtn.innerText = "Copy";
          copyBtn.disabled = false;
        }, 1500
      );
    }
  );
}
