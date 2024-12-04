document.getElementById("check-btn").addEventListener("click", () => {
    const input = document.getElementById("text-input").value;
    const result = document.getElementById("result");
  
    if (!input) {
      alert("Please input a value");
      return;
    }
  
    const sanitizedInput = input
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");
    const reversedInput = sanitizedInput.split("").reverse().join("");
  
    if (sanitizedInput === reversedInput) {
      result.textContent = `${input} is a palindrome`;
    } else {
      result.textContent = `${input} is not a palindrome`;
    }
  });
  