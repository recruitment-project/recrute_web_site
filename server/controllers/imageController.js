

export const getUserCV = async (req, res) => {
    try {
        const offre = await Offres.find();
        res.json(offre);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}




// import textToImage from "text-to-image";
// import { createCanvas, loadImage,registerFont } from 'canvas';


// import path from 'path';    
// import fs from 'fs';

// export const conversion = async (req, res)  => {
//   const text = req.body.texte;
//   const width = 400;
//   const height = 200;
//   const i = Math.floor(Math.random() * 100) + 1;
//   const canvas =  createCanvas(width, height);
//   const context = canvas.getContext('2d');

//   loadImage('../images/CVV.png').then((backgroundImage) => {
//     // Set the canvas dimensions equal to the background image dimensions
//     canvas.width = backgroundImage.width;
//     canvas.height = backgroundImage.height;

//     // Draw the background image on the canvas
//     context.drawImage(backgroundImage, 0, 0);

//     // Set the background image as the fill pattern
//     const pattern = context.createPattern(backgroundImage, 'no-repeat');
//     context.fillStyle = pattern;

//     // Fill the entire canvas with the background image pattern
//     context.fillRect(0, 0, canvas.width, canvas.height);

//     // Now you can perform other drawing operations on the canvas
//     // For example, you can add text on top of the background image
//     context.font = '24px Arial';
//     context.fillStyle = 'black';
//     context.fillText(text, 50, 50);

//     const directory = 'C:/Users/pc/Desktop/recrute_web_site-main/client/src/components/conversion/images';
//     if (!fs.existsSync(directory)) {
//     fs.mkdirSync(directory);
//     }
//   const imageName = `output13.png`;
//   const filePath = `C:/Users/pc/Desktop/recrute_web_site-main/client/src/components/conversion/images/${imageName}`;
//   const imageUrl = `images/output13.png`;
//   const writeStream = fs.createWriteStream(filePath);
//   const stream = canvas.createPNGStream();
//   stream.pipe(writeStream)
//   const out = fs.createWriteStream(imageUrl);
  
  
//   stream.pipe(out);

  

//   out.on('finish', () => {
//     console.log('Image saved!');
//     res.send({ imageUrl: `./images/${imageName}` });
//   });


//   out.on('error', (err) => {
//     console.error('Image save error:', err);
//     res.status(500).json({ error: 'Failed to save image' });
//   });
// }
// )}

