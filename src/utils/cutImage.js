const cutImage = (image, numColsToCut, numRowsToCut) => {
  // const widthOfOnePiece = image.width / numColsToCut;
  // const heightOfOnePiece = image.width / numRowsToCut;
  const widthOfOnePiece = 160;
  const heightOfOnePiece = 160;

  const imagePieces = [];

  let keyCount = 0;
  for (let y = 0; y < numColsToCut; y++) {
    for (let x = 0; x < numRowsToCut; x++) {
      keyCount++;
      // console.log('image:', image);
      const xCoordinate = widthOfOnePiece * x;
      const yCoordinate = heightOfOnePiece * y;
      // console.log(`x: ${x}, y: ${y}`);
      // console.log(`xCoordinate: ${xCoordinate}, yCoordinate: ${yCoordinate}`);
      const canvas = document.createElement('canvas');
      canvas.width = widthOfOnePiece;
      canvas.height = heightOfOnePiece;
      const context = canvas.getContext('2d');
      context.drawImage(image, xCoordinate, yCoordinate, widthOfOnePiece, heightOfOnePiece, 0, 0, widthOfOnePiece, heightOfOnePiece);

      const imageData = canvas.toDataURL();
      imagePieces.push({ src: imageData, key: keyCount });
    }
  }

  return imagePieces;
  // for (let i = 0; i < 1; i++) {
  //   const x = (-widthOfOnePiece * i) % (widthOfOnePiece * 2);
  //   const y = heightOfOnePiece * i ? 0 : -heightOfOnePiece;
  //
  //   canvas.width = widthOfOnePiece;
  //   canvas.height = heightOfOnePiece;
  //
  //   console.log(`x: ${x}, y: ${y}`);
  //   // context.drawImage(image, x, y, widthOfOnePiece * 2, heightOfOnePiece * 2);
  //   context.drawImage(image, 160, 0, 160, 160, 0, 0, 160, 160);
  //
  //   imagePieces.push(canvas.toDataURL());
  // }

  // imagePieces now contains data urls of all the pieces of the image

  // load one piece onto the page
  // const anImageElement = document.getElementById('myImageElementInTheDom');
  // anImageElement.src = imagePieces[0];
};

export default cutImage;
