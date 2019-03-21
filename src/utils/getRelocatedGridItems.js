import getImageIdFromGridItem from './getImageIdFromGridItem';

function pushData(images, newImageId, originalImageId, changedGridItems) {
  // imageId değerleri dizi indexleri gibi 0'dan değil 1'den başlamaktadır. Bu nedenle -1 işlemi gereklidir.
  if (images[newImageId - 1] && images[originalImageId - 1]) {
    const originalImageData = images[originalImageId - 1].src;
    const newImageData = images[newImageId - 1].src;
    changedGridItems.push({
      originalImage: { originalImageId, originalImageData },
      newImage: { newImageId, newImageData },
    });
  }
}

/**
 * This method returns relocated grid items.
 *
 * `originalImageId` Mevcut index'te bulunması gereken resim
 * `newImageId` Mevcut index'te şu anda bulunan resim
 * @param {[{x: number, y: number}]} originalLayout
 * @param {[{x: number, y: number}]} newLayout
 * @param {[{src: string, key: number}]} images
 * @param {boolean} firstTime If firstTime parameter is true, returns all gridItems without filtering.
 * @return {Array<{originalImage: {originalImageId: number, originalImageData: string}, newImage: {newImageId: number, newImageData: string}}>}
 */
export default function getRelocatedGridItems(originalLayout, newLayout, images, firstTime = false) {
  const changedGridItems = [];
  if (originalLayout.length === newLayout.length) {
    for (let index = 0; index < originalLayout.length; index++) {
      const originalImageId = getImageIdFromGridItem(originalLayout[index]);
      const newImageId = getImageIdFromGridItem(newLayout[index]);

      if (firstTime) {
        pushData(images, newImageId, originalImageId, changedGridItems);
      } else if (newImageId && originalImageId !== newImageId) {
        console.log(`CHANGED ITEMS FOUND: originalId:${originalImageId} - newId: ${newImageId}`);
        pushData(images, newImageId, originalImageId, changedGridItems);
      }
    }
  }
  return changedGridItems;
}
