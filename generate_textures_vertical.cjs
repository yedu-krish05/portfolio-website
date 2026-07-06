const { createCanvas } = require('@napi-rs/canvas');
const fs = require('fs');

async function main() {
  // --- Generate Lanyard Texture ---
  console.log('Generating VERTICAL Lanyard Texture...');
  const lanCanvas = createCanvas(1600, 363);
  const lanCtx = lanCanvas.getContext('2d');

  lanCtx.fillStyle = '#111';
  lanCtx.fillRect(0, 0, 1600, 363);

  lanCtx.fillStyle = '#fff';
  // Use a font size that fits nicely on the strap width
  lanCtx.font = 'bold 200px "Segoe UI", Arial, sans-serif';
  lanCtx.textAlign = 'center';
  lanCtx.textBaseline = 'middle';
  
  const text = "KRISH";
  
  // We want to draw each letter rotated 90 degrees clockwise, spaced along the X axis.
  // The X axis represents the length of the strap.
  // We'll draw the sequence twice to cover the whole 1600px length (repeat={4,1} is used).
  
  const drawVerticalText = (startX) => {
    const spacing = 250; // Spacing between letters along X axis
    for (let i = 0; i < text.length; i++) {
      const letter = text[i];
      const x = startX + (i * spacing);
      const y = 363 / 2; // Center of the strap width
      
      lanCtx.save();
      lanCtx.translate(x, y);
      lanCtx.rotate(Math.PI / 2); // Rotate each letter clockwise
      lanCtx.fillText(letter, 0, 0);
      lanCtx.restore();
    }
  };

  // We draw the word in two locations along the strap length
  drawVerticalText(200);
  drawVerticalText(1000);

  const lanBuffer = await lanCanvas.encode('jpeg');
  fs.writeFileSync('c:/Users/Asus/my-portfolio/public/assets/new.jpeg', lanBuffer);

  console.log('Done!');
}

main().catch(console.error);
