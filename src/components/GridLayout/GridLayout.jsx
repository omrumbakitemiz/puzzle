import React, { useState } from 'react';
import GridLayout from 'react-grid-layout';

import Rembrandt from 'rembrandt/build/browser';

import { getRelocatedGridItems } from '../../utils';

import styles from './GridLayout.module.css';

function compareImage(image, result) {
  const { originalImageData } = image.originalImage;
  const { newImageData } = image.newImage;

  const rembrandt = new Rembrandt({ imageA: originalImageData, imageB: newImageData });
  rembrandt.compare().then(compareResult => {
    result({
      ...compareResult,
      originalImageId: image.originalImage.originalImageId,
      newImageId: image.newImage.newImageId,
    });
  });
}

function checkCompareResult(compareResult) {
  return compareResult.newImageId === compareResult.originalImageId;
}

const BasicGrid = props => {
  const { images, layout, fakeLayout, firstTimeProp, onCorrectImages } = props;
  const [show, setShow] = useState(true);
  const [firstTime, setfirstTime] = useState(firstTimeProp);
  const [correctImages, setCorrectImages] = useState([]);

  const onLayoutChange = changedLayout => {
    const changedGridItems = getRelocatedGridItems(layout, changedLayout, images, true);

    setfirstTime(false);
    const tempCorrectImages = [];
    console.log('changedGridItems:', changedGridItems);
    changedGridItems.forEach((changedGridItem, index) => {

      compareImage(changedGridItem, result => {
        const checkResult = checkCompareResult(result);
        if (checkResult === true) {
          console.log(`index: ${index + 1}, checkResult: ${checkResult}`);
          const layoutIndex = changedGridItem.originalImage.originalImageId;
          tempCorrectImages.push(layoutIndex);
        }
      });
    });
    setTimeout(() => {
      setCorrectImages(tempCorrectImages);
      // onCorrectImages(correctImages);
    }, 500);
  };

  return (
    <>
      {show ? (
        <div>
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
              <div key={image.key}>
                <img src={image.src} alt="PuzzleImage" />
              </div>
            ))}
          </GridLayout>
        </div>
      ) : null}
      <div className={styles.correctImagesContainer}>
        <p>
          <strong>Correct Images:</strong>
        </p>
        {correctImages.length > 0
          ? correctImages.map(image => (
              <i key={image}>
                {image}
                <span> ,</span>
              </i>
            ))
          : '...'}
      </div>
    </>
  );
};

export default BasicGrid;
