const { Jimp, loadFont, SANS_32_BLACK } = require('jimp');

async function main() {
  try {
    console.log('Loading images...');
    const bg = await Jimp.read('c:/Users/Asus/my-portfolio/public/assets/extracted_0.png');
    const face = await Jimp.read('c:/Users/Asus/my-portfolio/public/assets/yedu.jpeg');

    console.log('Resizing face...');
    face.resize({ w: 200, h: 250 });

    console.log('Compositing face...');
    bg.composite(face, 176, 148);

    console.log('Covering old name text...');
    const bgColor = bg.getPixelColor(150, 450);
    
    // Draw rectangle over text
    for (let y = 445; y < 510; y++) {
      for (let x = 140; x < 450; x++) {
        bg.setPixelColor(bgColor, x, y);
      }
    }

    console.log('Writing new name...');
    const font = await loadFont(SANS_32_BLACK);
    bg.print(font, 155, 465, 'Name   KRISH');

    console.log('Saving result...');
    await bg.write('c:/Users/Asus/my-portfolio/public/assets/final_card.png');
    console.log('Done!');
  } catch (err) {
    console.error(err);
  }
}

main();
