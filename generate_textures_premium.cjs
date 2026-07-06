const { createCanvas, loadImage } = require('@napi-rs/canvas');
const fs = require('fs');

async function main() {
  console.log('Generating PREMIUM ID Card Texture...');
  const canvas = createCanvas(1024, 1024);
  const ctx = canvas.getContext('2d');

  const bg = await loadImage('c:/Users/Asus/my-portfolio/public/assets/extracted_0.png');
  const face = await loadImage('c:/Users/Asus/my-portfolio/public/assets/yedu.jpeg');

  // Draw original layout
  ctx.drawImage(bg, 0, 0);

  const patchCard = (offsetX) => {
    // 1. Erase Prince's entire body and name
    // We will draw a nice soft rounded rectangle over the whole center area
    ctx.fillStyle = '#f8f9fa'; // Very light clean grey/white to match the card
    ctx.beginPath();
    ctx.roundRect(offsetX + 130, 130, 290, 380, 20); // Large bounding box for the profile area
    ctx.fill();

    // 2. Draw Yedu's photo in a beautiful Circle
    const centerX = offsetX + 276;
    const photoY = 160;
    const radius = 110;

    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, photoY + radius, radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    // The face image is square, so we draw it to fill the circle perfectly
    ctx.drawImage(face, centerX - radius, photoY, radius * 2, radius * 2);
    ctx.restore();

    // Add a sleek ring around the profile picture
    ctx.beginPath();
    ctx.arc(centerX, photoY + radius, radius, 0, Math.PI * 2, true);
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#e0e0e0';
    ctx.stroke();

    // 3. Write new name in a premium modern way
    ctx.fillStyle = '#111';
    ctx.font = 'bold 36px "Segoe UI", Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('KRISH', centerX, 430);
    
    // Add a subtle subtitle
    ctx.fillStyle = '#666';
    ctx.font = '20px "Segoe UI", Arial, sans-serif';
    ctx.fillText('Mobile App Developer', centerX, 465);
  };

  // Patch front card (offset 0)
  patchCard(0);
  
  // Patch back card (offset 512)
  patchCard(512);

  const cardBuffer = await canvas.encode('png');
  fs.writeFileSync('c:/Users/Asus/my-portfolio/public/assets/final_card.png', cardBuffer);

  // --- Generate Lanyard Texture ---
  console.log('Generating PREMIUM Lanyard Texture...');
  const lanCanvas = createCanvas(1600, 363);
  const lanCtx = lanCanvas.getContext('2d');

  lanCtx.fillStyle = '#111';
  lanCtx.fillRect(0, 0, 1600, 363);

  // Sleek, spaced out modern text
  lanCtx.fillStyle = '#fff';
  lanCtx.font = 'bold 72px "Segoe UI", Arial, sans-serif';
  lanCtx.textAlign = 'center';
  lanCtx.textBaseline = 'middle';
  
  // Adding spaces between letters for a "tracked out" premium look
  const lanyardText = 'K  R  I  S  H';
  lanCtx.fillText(lanyardText, 400, 181);
  lanCtx.fillText(lanyardText, 1200, 181);

  const lanBuffer = await lanCanvas.encode('jpeg');
  fs.writeFileSync('c:/Users/Asus/my-portfolio/public/assets/new.jpeg', lanBuffer);

  console.log('Done!');
}

main().catch(console.error);
