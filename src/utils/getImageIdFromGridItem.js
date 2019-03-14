/**
 * This method returns imageId from given gridItem, it uses gridItem's x and y properties.
 *
 * id = (x + 4 * y + 1) => x ve y koordinatlar olmak üzere, id: x ve y koordinatlarındaki elemanın `id` sidir.
 * @param {{x: number, y: number}} gridItem
 * @returns {id: number} id
 */
export default function getImageIdFromGridItem(gridItem) {
  const { x, y } = gridItem;
  const id = x + 4 * y + 1;
  return id;
}
