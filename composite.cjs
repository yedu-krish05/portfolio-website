const { Jimp } = require('jimp');

async function main() {
  try {
    console.log('Loading images...');
    const bg = await Jimp.read('c:/Users/Asus/my-portfolio/portfolio/public/assets/new.jpeg');
    const face = await Jimp.read('c:/Users/Asus/my-portfolio/public/assets/yedu.jpeg');

    console.log('Resizing face...');
    face.resize({ w: 150, h: 150 });

    console.log('Compositing face on front and back cards...');
    // Left Card (Front)
    bg.composite(face, 250, 80);
    // Right Card (Back)
    bg.composite(face, 1150, 80);

    console.log('Covering old name text...');
    // The ID card background is likely white or light gray near the text
    const bgColor1 = bg.getPixelColor(250, 250);
    const bgColor2 = bg.getPixelColor(1150, 250);
    
    // Draw rectangle over left card text
    for (let y = 250; y < 290; y++) {
      for (let x = 230; x < 400; x++) {
        bg.setPixelColor(bgColor1, x, y);
      }
    }
    
    // Draw rectangle over right card text
    for (let y = 250; y < 290; y++) {
      for (let x = 1130; x < 1300; x++) {
        bg.setPixelColor(bgColor2, x, y);
      }
    }

    console.log('Saving result...');
    await bg.write('c:/Users/Asus/my-portfolio/public/assets/new.jpeg');
    console.log('Done!');
  } catch (err) {
    console.error(err);
  }
}

main();
