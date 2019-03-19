import React from 'react';
import GridLayout from 'react-grid-layout';

import Rembrandt from 'rembrandt/build/browser';

import { getRelocatedGridItems } from '../../utils';

const BasicGrid = props => {
  const { images, layout, fakeLayout } = props;

  const onLayoutChange = changedLayout => {
    const changedGridItems = getRelocatedGridItems(layout, changedLayout, images);
    console.log(changedGridItems);
    changedGridItems.forEach(item => {
      const { originalImageData } = item.originalImage;
      const { newImageData } = item.newImage;

      const rembrandt = new Rembrandt({ imageA: originalImageData, imageB: newImageData });
      rembrandt.compare().then(response => {
        console.log('response:', response);
      });
    });
  };

  return (
    <GridLayout
      className="layout"
      layout={fakeLayout}
      cols={5}
      rowHeight={600 / 5}
      margin={[1, 1]}
      width={600}
      autoSize={false}
      onLayoutChange={changedLayout => onLayoutChange(changedLayout)}
      preventCollision={false}
      compactType="vertical"
    >
      {images.map(image => (
        <div key={image.key} id={image.key}>
          <img src={image.src} alt="PuzzleImage" />
        </div>
      ))}
    </GridLayout>
  );
};

export default BasicGrid;
