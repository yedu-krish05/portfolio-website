const { createCanvas, loadImage } = require('@napi-rs/canvas');
const fs = require('fs');

async function main() {
  console.log('Generating ID Card Texture from Original...');
  const canvas = createCanvas(1024, 1024);
  const ctx = canvas.getContext('2d');

  const bg = await loadImage('c:/Users/Asus/my-portfolio/public/assets/extracted_0.png');
  const face = await loadImage('c:/Users/Asus/my-portfolio/public/assets/yedu.jpeg');

  // Draw original layout
  ctx.drawImage(bg, 0, 0);

  // Function to patch a card side
  const patchCard = (offsetX) => {
    // 1. Draw the user's face exactly where Prince's face is
    // Photo bounds: x=176, y=148, w=200, h=250
    // Yedu's photo is square, so we can draw it and let it stretch slightly, or crop it.
    // Stretching a bit is fine for ID photos.
    ctx.drawImage(face, offsetX + 176, 148, 200, 250);

    // 2. Erase the old name
    // The background is a white/grey gradient. We can sample the color near the text.
    // Or just draw a soft grey rectangle.
    ctx.fillStyle = '#efefef'; // Light grey/white
    ctx.fillRect(offsetX + 140, 435, 300, 60);

    // 3. Write new name
    ctx.fillStyle = '#000';
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Name     KRISH', offsetX + 276, 470);
  };

  // Patch front card (offset 0)
  patchCard(0);
  
  // Patch back card (offset 512)
  patchCard(512);

  const cardBuffer = await canvas.encode('png');
  fs.writeFileSync('c:/Users/Asus/my-portfolio/public/assets/final_card.png', cardBuffer);

  // --- Generate Lanyard Texture ---
  console.log('Generating Lanyard Texture...');
  const lanCanvas = createCanvas(1600, 363);
  const lanCtx = lanCanvas.getContext('2d');

  lanCtx.fillStyle = '#111';
  lanCtx.fillRect(0, 0, 1600, 363);

  lanCtx.fillStyle = '#fff';
  lanCtx.font = 'bold 64px sans-serif';
  lanCtx.textAlign = 'center';
  lanCtx.textBaseline = 'middle';
  
  lanCtx.fillText('KRISH', 400, 181);
  lanCtx.fillText('KRISH', 1200, 181);

  const lanBuffer = await lanCanvas.encode('jpeg');
  fs.writeFileSync('c:/Users/Asus/my-portfolio/public/assets/new.jpeg', lanBuffer);

  console.log('Done!');
}

main().catch(console.error);
