const { createCanvas, loadImage } = require('@napi-rs/canvas');
const fs = require('fs');

async function main() {
  console.log('Generating FINAL ID Card Texture...');
  const canvas = createCanvas(1024, 1024);
  const ctx = canvas.getContext('2d');

  const bg = await loadImage('c:/Users/Asus/my-portfolio/public/assets/extracted_0.png');
  const face = await loadImage('c:/Users/Asus/my-portfolio/public/assets/yedu.jpeg');

  ctx.drawImage(bg, 0, 0);

  const patchCard = (offsetX) => {
    // 1. Completely erase Prince's body and old name text
    // The card is 0-512 wide and 0-1024 tall.
    // Prince is huge, so we cover from x=40 to x=472, y=100 to y=950 with a solid color.
    // To keep it looking like a nice ID card, we'll draw a large rounded rectangle.
    ctx.fillStyle = '#ffffff'; // Solid white to cleanly wipe the slate
    ctx.beginPath();
    ctx.roundRect(offsetX + 40, 100, 432, 850, 30);
    ctx.fill();

    // 2. Draw Yedu's photo
    // We'll use a large rounded rectangle so any stretching is less noticeable than a circle.
    // The photo will be placed in the upper middle area.
    const photoWidth = 280;
    const photoHeight = 350;
    const photoX = offsetX + 256 - (photoWidth / 2);
    const photoY = 200;

    ctx.save();
    ctx.beginPath();
    ctx.roundRect(photoX, photoY, photoWidth, photoHeight, 20);
    ctx.clip();
    ctx.drawImage(face, photoX, photoY, photoWidth, photoHeight);
    ctx.restore();

    // Add a sleek border around the photo
    ctx.beginPath();
    ctx.roundRect(photoX, photoY, photoWidth, photoHeight, 20);
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#e0e0e0';
    ctx.stroke();

    // 3. Write new name in a premium modern way
    const centerX = offsetX + 256;
    ctx.fillStyle = '#111';
    ctx.font = 'bold 48px "Segoe UI", Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('KRISH', centerX, 700); // Moved down significantly to match standard ID layouts
    
    // Add subtitle
    ctx.fillStyle = '#666';
    ctx.font = '28px "Segoe UI", Arial, sans-serif';
    ctx.fillText('Mobile App Developer', centerX, 750);
  };

  patchCard(0);
  patchCard(512);

  const cardBuffer = await canvas.encode('png');
  fs.writeFileSync('c:/Users/Asus/my-portfolio/public/assets/final_card.png', cardBuffer);

  // --- Generate Lanyard Texture ---
  console.log('Generating FINAL Lanyard Texture...');
  const lanCanvas = createCanvas(1600, 363);
  const lanCtx = lanCanvas.getContext('2d');

  lanCtx.fillStyle = '#111';
  lanCtx.fillRect(0, 0, 1600, 363);

  lanCtx.fillStyle = '#fff';
  lanCtx.font = 'bold 72px "Segoe UI", Arial, sans-serif';
  lanCtx.textAlign = 'center';
  lanCtx.textBaseline = 'middle';
  
  // The subagent reported the text was rotated 90 degrees counter-clockwise on the lanyard.
  // We will rotate it 90 degrees clockwise here so it renders correctly upright.
  // We'll draw it in a few places along the strap (x = 400, x = 1200).
  const lanyardText = 'K R I S H';
  
  lanCtx.save();
  lanCtx.translate(400, 181);
  lanCtx.rotate(Math.PI / 2);
  lanCtx.fillText(lanyardText, 0, 0);
  lanCtx.restore();

  lanCtx.save();
  lanCtx.translate(1200, 181);
  lanCtx.rotate(Math.PI / 2);
  lanCtx.fillText(lanyardText, 0, 0);
  lanCtx.restore();

  const lanBuffer = await lanCanvas.encode('jpeg');
  fs.writeFileSync('c:/Users/Asus/my-portfolio/public/assets/new.jpeg', lanBuffer);

  console.log('Done!');
}

main().catch(console.error);
