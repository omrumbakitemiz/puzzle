import React from 'react';
import GridLayout from 'react-grid-layout';
import { getRelocatedGridItems } from '../../utils';

const BasicGrid = props => {
  const { images } = props;
  const { layout } = props;

  const onLayoutChange = changedLayout => {
    console.log('onLayChange:', changedLayout);
    const changedGridItems = getRelocatedGridItems(layout, changedLayout, images);
    console.log(changedGridItems);
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
