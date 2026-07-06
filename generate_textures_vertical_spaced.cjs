const { createCanvas } = require('@napi-rs/canvas');
const fs = require('fs');

async function main() {
  console.log('Generating SPACED VERTICAL Lanyard Texture...');
  const lanCanvas = createCanvas(1600, 363);
  const lanCtx = lanCanvas.getContext('2d');

  lanCtx.fillStyle = '#111';
  lanCtx.fillRect(0, 0, 1600, 363);

  lanCtx.fillStyle = '#fff';
  lanCtx.font = 'bold 200px "Segoe UI", Arial, sans-serif';
  lanCtx.textAlign = 'center';
  lanCtx.textBaseline = 'middle';
  
  const text = "KRISH";
  
  const drawVerticalText = (startX) => {
    const spacing = 220; // Big space between each letter
    for (let i = 0; i < text.length; i++) {
      const letter = text[i];
      const x = startX + (i * spacing);
      const y = 363 / 2;
      
      lanCtx.save();
      lanCtx.translate(x, y);
      lanCtx.rotate(Math.PI / 2);
      lanCtx.fillText(letter, 0, 0);
      lanCtx.restore();
    }
  };

  // Only draw ONE instance of the word on the texture.
  // Since the texture repeats 4 times (across both sides of the strap),
  // this will make the word appear exactly twice on the visible front parts of the strap!
  // Width of text is 4 * 220 = 880. Center is (1600 - 880) / 2 = 360.
  drawVerticalText(360);

  const lanBuffer = await lanCanvas.encode('jpeg');
  fs.writeFileSync('c:/Users/Asus/my-portfolio/public/assets/new.jpeg', lanBuffer);

  console.log('Done!');
}

main().catch(console.error);
