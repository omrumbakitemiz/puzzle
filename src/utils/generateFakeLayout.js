import { generateRandomNumbers, getGridItemFromImageId, standardLayout } from './index';

function generateFakeLayout(originalLayout) {
  let fakeLayout = [];
  if (!originalLayout) {
    // fakeLayout = standardLayout;
    fakeLayout = Object.assign([], standardLayout);
  } else {
    // fakeLayout = [...originalLayout];
    fakeLayout = Object.assign([], originalLayout);
  }

  const randomImageIds = generateRandomNumbers(fakeLayout.length, fakeLayout.length);
  randomImageIds.forEach((imageId, index) => {
    const gridItemCoordinates = getGridItemFromImageId(imageId);
    fakeLayout[index].x = gridItemCoordinates.x;
    fakeLayout[index].y = gridItemCoordinates.y;
  });

  return fakeLayout;
}

export default generateFakeLayout;
