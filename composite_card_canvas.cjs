const { createCanvas, loadImage } = require('@napi-rs/canvas');
const fs = require('fs');

async function main() {
  const canvas = createCanvas(1024, 1024);
  const ctx = canvas.getContext('2d');

  console.log('Loading images...');
  const bg = await loadImage('c:/Users/Asus/my-portfolio/public/assets/extracted_0.png');
  const face = await loadImage('c:/Users/Asus/my-portfolio/public/assets/yedu.jpeg');

  console.log('Drawing background...');
  ctx.drawImage(bg, 0, 0);

  console.log('Drawing face...');
  ctx.drawImage(face, 176, 148, 200, 250);

  console.log('Covering old name text...');
  ctx.fillStyle = '#f0f0f0'; // Slight off-white or match exactly
  // Let's just sample the color at 150, 450
  const pixel = ctx.getImageData(150, 450, 1, 1).data;
  ctx.fillStyle = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
  ctx.fillRect(140, 445, 300, 65);

  console.log('Writing new name...');
  // Add a nice cursive or bold font
  ctx.font = 'bold 32px sans-serif';
  ctx.fillStyle = 'black';
  ctx.fillText('Name     KRISH', 155, 485);

  console.log('Saving result...');
  const buffer = await canvas.encode('png');
  fs.writeFileSync('c:/Users/Asus/my-portfolio/public/assets/final_card.png', buffer);
  console.log('Done!');
}

main().catch(console.error);
