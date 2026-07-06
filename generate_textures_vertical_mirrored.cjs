const { createCanvas } = require('@napi-rs/canvas');
const fs = require('fs');

async function main() {
  console.log('Generating MIRRORED VERTICAL Lanyard Texture...');
  const lanCanvas = createCanvas(1600, 363);
  const lanCtx = lanCanvas.getContext('2d');

  lanCtx.fillStyle = '#111';
  lanCtx.fillRect(0, 0, 1600, 363);

  lanCtx.fillStyle = '#fff';
  lanCtx.font = 'bold 200px "Segoe UI", Arial, sans-serif';
  lanCtx.textAlign = 'center';
  lanCtx.textBaseline = 'middle';
  // We draw the string backwards so it maps correctly from top to bottom on the strap!
  const text = "HSIRK";
  
  const drawVerticalText = (startX) => {
    const spacing = 220; // Big space between each letter
    for (let i = 0; i < text.length; i++) {
      const letter = text[i];
      const x = startX + (i * spacing);
      const y = 363 / 2;
      
      lanCtx.save();
      lanCtx.translate(x, y);
      lanCtx.rotate(Math.PI / 2); // Rotate 90 degrees clockwise
      
      // The user says the text is mirrored on the 3D model.
      // To counteract a mirrored 3D UV mapping without messing with the sequence order,
      // we can just mirror the letters left-to-right before drawing them!
      lanCtx.scale(-1, 1); // Mirror horizontally
      
      lanCtx.fillText(letter, 0, 0);
      lanCtx.restore();
    }
  };

  drawVerticalText(360);

  const lanBuffer = await lanCanvas.encode('jpeg');
  fs.writeFileSync('c:/Users/Asus/my-portfolio/public/assets/new.jpeg', lanBuffer);

  console.log('Done!');
}

main().catch(console.error);
