const { createCanvas, loadImage } = require('@napi-rs/canvas');
const fs = require('fs');

async function main() {
  console.log('Generating PERFECT ID Card Texture...');
  const canvas = createCanvas(1024, 1024);
  const ctx = canvas.getContext('2d');

  const face = await loadImage('c:/Users/Asus/my-portfolio/public/assets/yedu.jpeg');

  // Fill the entire texture with solid white to completely wipe Prince
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 1024, 1024);

  const patchCard = (offsetX) => {
    // We are on a clean white slate for the card.
    
    // Draw Yedu's photo as a large, beautiful rounded square photo in the top center
    const photoSize = 440;
    const photoX = offsetX + (512 - photoSize) / 2; // Centers it in the 512 wide space (x = 36)
    const photoY = 100;

    ctx.save();
    ctx.beginPath();
    ctx.roundRect(photoX, photoY, photoSize, photoSize, 30);
    ctx.clip();
    ctx.drawImage(face, photoX, photoY, photoSize, photoSize);
    ctx.restore();

    // Add a sleek border around the photo
    ctx.beginPath();
    ctx.roundRect(photoX, photoY, photoSize, photoSize, 30);
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#e0e0e0';
    ctx.stroke();

    // Write new name in a premium modern way
    const centerX = offsetX + 256;
    
    ctx.fillStyle = '#111';
    ctx.font = 'bold 80px "Segoe UI", Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('KRISH', centerX, 680); 
    
    // Add subtitle
    ctx.fillStyle = '#666';
    ctx.font = '36px "Segoe UI", Arial, sans-serif';
    ctx.fillText('Mobile App Developer', centerX, 760);
  };

  // Render front and back exactly the same so it looks good from any angle
  patchCard(0);
  patchCard(512);

  // Encode as JPEG to remove any alpha channel (fixes the card being transparent)
  const cardBuffer = await canvas.encode('jpeg');
  fs.writeFileSync('c:/Users/Asus/my-portfolio/public/assets/final_card.jpeg', cardBuffer);

  // --- Generate Lanyard Texture ---
  console.log('Generating PERFECT Lanyard Texture...');
  const lanCanvas = createCanvas(1600, 363);
  const lanCtx = lanCanvas.getContext('2d');

  lanCtx.fillStyle = '#111';
  lanCtx.fillRect(0, 0, 1600, 363);

  lanCtx.fillStyle = '#fff';
  // Use a MASSIVE font so it fills the strap width perfectly
  lanCtx.font = 'bold 250px "Segoe UI", Arial, sans-serif';
  lanCtx.textAlign = 'center';
  lanCtx.textBaseline = 'middle';
  
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
