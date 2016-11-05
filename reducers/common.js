// from http://redux.js.org/docs/recipes/reducers/RefactoringReducersExample.html

export function updateObject(oldObject, newValues) {
  return {...oldObject, ...newValues};
}

export function updateItemInArray(array, itemIdString, itemId, updateItemCallback) {
  const updatedItems = array.map(item => {
    if (item[itemIdString] !== itemId) {
      return item;
    }
    const updatedItem = updateItemCallback(item);
    return updatedItem;
  });
  return updatedItems;
}
