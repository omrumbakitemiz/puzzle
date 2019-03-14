import getBase64 from './getBase64';
import { getImageIdFromGridItem } from './index';

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
