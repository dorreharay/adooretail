import store from '@store'
import { setProducts, } from '@reducers/UserReducer'

function getState(reducer) {
  return store.getState()[reducer]
}

function chunkArray(myArray, chunk_size) {
  var results = [];

  while (myArray.length) {
    results.push(myArray.splice(0, chunk_size));
  }

  return results;
}

export function updateLayout(products) {
  const dispatch = store.dispatch

  const user = getState('user')
  const orders = getState('orders')

  const { layout } = orders

  if (!products) {
    const { currentAccount } = user

    if (currentAccount) {
      products = currentAccount.products
    }
  }

  if (!products) return 

  const flattenedProducts = products.flat()

  const sortedProducts = flattenedProducts.sort((a, b) => b.sortIndex - a.sortIndex)

  const newProducts = chunkArray(sortedProducts, layout);

  dispatch(setProducts(newProducts))

  return newProducts
}