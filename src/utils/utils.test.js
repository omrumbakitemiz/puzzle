import getBase64 from './getBase64';
import { getImageIdFromGridItem, generateRandomNumbers } from './index';

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
    const actualSum1 = (length1 * (length1 + 1)) / 2;
    const expectedSum1 = values1.reduce((partialSum, b) => partialSum + b, 0);
    expect(actualSum1).toEqual(expectedSum1);

    const actualSum2 = (length2 * (length2 + 1)) / 2;
    const expectedSum2 = values2.reduce((partialSum, b) => partialSum + b, 0);
    expect(actualSum2).toEqual(expectedSum2);
  });
});
