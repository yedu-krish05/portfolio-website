import { NodeIO } from '@gltf-transform/core';
import fs from 'fs';

async function extract() {
  const io = new NodeIO();
  const document = await io.read('c:/Users/Asus/my-portfolio/portfolio/public/assets/cards.glb');
  
  const textures = document.getRoot().listTextures();
  textures.forEach((t, i) => {
    const ext = t.getMimeType() === 'image/jpeg' ? 'jpeg' : 'png';
    fs.writeFileSync(`c:/Users/Asus/my-portfolio/public/assets/extracted_${i}.${ext}`, t.getImage());
    console.log(`Extracted texture ${i} to extracted_${i}.${ext}`);
  });
}

extract();
