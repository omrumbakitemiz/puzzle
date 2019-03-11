import React from 'react';
import GridLayout from 'react-grid-layout';

/**
 * This method returns imageId from given gridItem, it uses gridItem's x and y properties.
 *
 * id = (x + 4 * y + 1) => x ve y koordinatlar olmak üzere, id: x ve y koordinatlarındaki elemanın `id` sidir.
 * @param {{x: number, y: number}} gridItem
 * @returns {id: number} id
 */
const getImageIdFromGridItem = gridItem => {
  const { x, y } = gridItem;
  const id = x + 4 * y + 1;
  return id;
};

/**
 * This method returns relocated grid items.
 *
 * `originalImageId` Mevcut index'te bulunması gereken resim
 * `newImageId` Mevcut index'te şu anda bulunan resim
 * @param {[{x: number, y: number}]} originalLayout
 * @param {[{x: number, y: number}]} newLayout
 * @param {[{src: string, key: number}]} images
 */
const getRelocatedGridItems = (originalLayout, newLayout, images) => {
  const changedGridItems = [];
  if (originalLayout.length === newLayout.length) {
    for (let index = 0; index < originalLayout.length; index++) {
      const originalImageId = getImageIdFromGridItem(originalLayout[index]);
      const newImageId = getImageIdFromGridItem(newLayout[index]);
      if (originalImageId !== newImageId) {
        console.log(`CHANGED ITEMS FOUND: originalId:${originalImageId} - newId: ${newImageId}`);
        // imageId değerleri dizi indexleri gibi 0'dan değil 1'den başlamaktadır. Bu nedenle -1 işlemi gereklidir.
        const originalImageData = images[originalImageId - 1].src;
        const newImageData = images[newImageId - 1].src;
        changedGridItems.push({
          originalImage: { originalImageId, originalImageData },
          newImage: { newImageId, newImageData },
        });
      }
    }
  }
  return changedGridItems;
};

const onLayoutChange = (originalLayout, changedLayout, images) => {
  console.log('onLayChange:', changedLayout);
  const changedGridItems = getRelocatedGridItems(originalLayout, changedLayout, images);
  console.log(changedGridItems);
};

const BasicGrid = props => {
  const { images, layout } = props;
  console.log('props:', props);

  const onDragStop = (...args) => {
    console.log('dragStop:', ...args);
  };

  return (
    <GridLayout
      className="layout"
      layout={layout}
      cols={5}
      rowHeight={600 / 5}
      margin={[1, 1]}
      width={600}
      autoSize={false}
      onDragStart={(...args) => console.log(args)}
      onDragStop={(...args) => onDragStop(args)}
      onLayoutChange={changedLayout => onLayoutChange(layout, changedLayout, images)}
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
