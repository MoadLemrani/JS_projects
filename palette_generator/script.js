const palette = document.getElementById('palette');
const generateBtn = document.getElementById('generate-btn');
const COLORS_IN_PALETTE = 5;

function getRandomColor() {
  // Generate random hex color code
  return '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
}

function generatePalette() {
  palette.innerHTML = ''; // Clear previous colors
  for (let i = 0; i < COLORS_IN_PALETTE; i++) {
    const color = getRandomColor();
    const colorBox = document.createElement('div');
    colorBox.classList.add('color-box');
    colorBox.style.backgroundColor = color;

    const colorCode = document.createElement('div');
    colorCode.classList.add('color-code');
    colorCode.textContent = color.toUpperCase();

    // Click on color to copy to clipboard
    colorBox.addEventListener('click', () => {
      navigator.clipboard.writeText(color)
        .then(() => alert(`Copied ${color.toUpperCase()} to clipboard!`))
        .catch(() => alert('Failed to copy'));
    });

    colorBox.appendChild(colorCode);
    palette.appendChild(colorBox);
  }
}

// Initial palette on page load
generatePalette();

generateBtn.addEventListener('click', generatePalette);
