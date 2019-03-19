import getBase64 from './getBase64';
import { getImageIdFromGridItem, generateRandomNumbers, getGridItemFromImageId, generateFakeLayout } from './index';

describe('base64 Convert Tests', () => {
  test('converts file to base64 correctly', () => {
    const base64Regex = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;
    const file = new File([''], 'filename', { type: 'image/png' });

    getBase64(file, result => {
      expect(result).toMatch(base64Regex);
    });
  });
});

describe('getRelocatedGridItems Tests', () => {
  test('gets imageId as 1 from given gridItem', () => {
    const gridItem = { x: 0, y: 0 };
    const imageId = getImageIdFromGridItem(gridItem);
    expect(imageId).toEqual(1);
  });

  test('gets imageId as 13 from given gridItem', () => {
    const gridItem = { x: 0, y: 3 };
    const imageId = getImageIdFromGridItem(gridItem);
    expect(imageId).toEqual(13);
  });

  test('gets imageId as 16 from given gridItem', () => {
    const gridItem = { x: 3, y: 3 };
    const imageId = getImageIdFromGridItem(gridItem);
    expect(imageId).toEqual(16);
  });

  test('gets wrong imageId from given gridItem', () => {
    const gridItem = { x: 2, y: 2 };
    const imageId = getImageIdFromGridItem(gridItem);
    const compareResult = imageId === 10;
    expect(compareResult).toBeFalsy();
  });
});

describe('generateRandomNumbers tests', () => {
  it('should generate unique values', () => {
    const length1 = 16;
    const maxValue1 = 16;
    const length2 = 10;
    const maxValue2 = 10;
    const values1 = generateRandomNumbers(length1, maxValue1);
    const values2 = generateRandomNumbers(length2, maxValue2);

    // If values of the array are unique, sum of the values from array must be equal to `n * (n+1) / 2`
    // This rule applies only if the length and the max value are equal.
    const expectedSum1 = (length1 * (length1 + 1)) / 2;
    const actualSum1 = values1.reduce((partialSum, b) => partialSum + b, 0);
    expect(actualSum1).toEqual(expectedSum1);

    const expectedSum2 = (length2 * (length2 + 1)) / 2;
    const actualSum2 = values2.reduce((partialSum, b) => partialSum + b, 0);
    expect(actualSum2).toEqual(expectedSum2);
  });
});

describe('getImageIdFromGridItem tests', () => {
  it('should return correct grid items with 3,3', () => {
    const imageId1 = 16;
    const gridItem1 = getGridItemFromImageId(imageId1);
    expect(gridItem1).toEqual({ x: 3, y: 3 });
  });

  it('should return correct grid items with 0,0', () => {
    const imageId2 = 1;
    const gridItem2 = getGridItemFromImageId(imageId2);
    expect(gridItem2).toEqual({ x: 0, y: 0 });
  });

  it('should return correct grid items with 3,0', () => {
    const imageId3 = 4;
    const gridItem3 = getGridItemFromImageId(imageId3);
    expect(gridItem3).toEqual({ x: 3, y: 0 });
  });

  it('should return correct grid items with 2,1', () => {
    const imageId4 = 7;
    const gridItem4 = getGridItemFromImageId(imageId4);
    expect(gridItem4).toEqual({ x: 2, y: 1 });
  });

  it('should return correct grid items with 1,3', () => {
    const imageId4 = 14;
    const gridItem4 = getGridItemFromImageId(imageId4);
    expect(gridItem4).toEqual({ x: 1, y: 3 });
  });
});

describe('generateFakeLayout tests', () => {
  it('should generate unique gridItem coordinates', () => {
    const fakeLayout = generateFakeLayout();
    fakeLayout.forEach(layoutItem => {
      expect(layoutItem.x).toBeDefined();
      expect(layoutItem.y).toBeDefined();
    });

    /**
     * See {@link https://flaviocopes.com/how-to-get-unique-properties-of-object-in-array Unique properties of a set of objects}
     */
    const layoutSet = [...new Set(fakeLayout.map(layoutItem => `${layoutItem.x}-${layoutItem.y}`))];
    expect(layoutSet.length).toEqual(fakeLayout.length);
  });
});
