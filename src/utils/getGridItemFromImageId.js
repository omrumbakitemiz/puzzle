/**
 * This method returns `gridItem` with coordinates from given `imageId`.
 *
 * id = (x + 4 * y + 1) => x ve y koordinatlar olmak üzere, id: x ve y koordinatlarındaki elemanın `id` sidir.
 * @param {number} imageId
 * @returns {{x: number, y: number}} gridItem
 */
function getGridItemFromImageId(imageId) {
  let x = -1;
  let y = -1;

  do {
    x++;
    y = (imageId - x - 1) / 4;
  } while (y % 1 !== 0);

  return { x, y };
}

export default getGridItemFromImageId;
