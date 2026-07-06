const { createCanvas, loadImage } = require('@napi-rs/canvas');
const fs = require('fs');

async function main() {
  console.log('Generating ID Card Texture...');
  // 1. Generate Card Texture (1024x1024)
  const cardCanvas = createCanvas(1024, 1024);
  const cardCtx = cardCanvas.getContext('2d');

  // Fill white background for the entire card (front and back)
  cardCtx.fillStyle = 'white';
  cardCtx.fillRect(0, 0, 1024, 1024);

  const face = await loadImage('c:/Users/Asus/my-portfolio/public/assets/yedu.jpeg');

  // Draw front card
  // Center is 256. If width is 400, x = 256 - 200 = 56
  // Draw face
  cardCtx.drawImage(face, 56, 150, 400, 400);
  
  // Draw name text
  cardCtx.fillStyle = 'black';
  cardCtx.font = 'bold 64px sans-serif';
  cardCtx.textAlign = 'center';
  cardCtx.fillText('Name     KRISH', 256, 800);
  
  // Add a nice border just in case
  cardCtx.strokeStyle = '#ccc';
  cardCtx.lineWidth = 4;
  cardCtx.strokeRect(20, 20, 472, 984); // Front border
  cardCtx.strokeRect(532, 20, 472, 984); // Back border

  // Draw back card (just a logo or name)
  cardCtx.fillText('TEAM X', 768, 512);

  const cardBuffer = await cardCanvas.encode('png');
  fs.writeFileSync('c:/Users/Asus/my-portfolio/public/assets/final_card.png', cardBuffer);

  // 2. Generate Lanyard Texture (1600x363)
  console.log('Generating Lanyard Texture...');
  const lanyardCanvas = createCanvas(1600, 363);
  const lanCtx = lanyardCanvas.getContext('2d');

  // Fill black background
  lanCtx.fillStyle = '#111';
  lanCtx.fillRect(0, 0, 1600, 363);

  // Write "KRISH" repeatedly
  lanCtx.fillStyle = 'white';
  lanCtx.font = 'bold 80px sans-serif';
  lanCtx.textAlign = 'center';
  lanCtx.textBaseline = 'middle';
  
  // The strap texture wraps, so let's place it a few times
  lanCtx.fillText('KRISH', 400, 181);
  lanCtx.fillText('KRISH', 1200, 181);

  const lanBuffer = await lanyardCanvas.encode('jpeg');
  fs.writeFileSync('c:/Users/Asus/my-portfolio/public/assets/new.jpeg', lanBuffer);

  console.log('Done!');
}

main().catch(console.error);
