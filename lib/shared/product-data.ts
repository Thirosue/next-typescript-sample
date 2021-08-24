import { Product } from '../data/product'
import { Products } from '../data/products'

const data: Products = {
  products: [
    {
      id: 1,
      name: 'Strawberries',
      description: '16oz package of fresh organic strawberries',
      quantity: 1,
    },
    {
      id: 2,
      name: 'Sliced bread',
      description: 'Loaf of fresh sliced wheat bread',
      quantity: 2,
    },
    {
      id: 3,
      name: 'Apples',
      description: 'Bag of 7 fresh McIntosh apples',
      quantity: 3,
    },
    {
      id: 4,
      name: 'Item4',
      description: 'no.4',
      quantity: 4,
    },
    {
      id: 5,
      name: 'Item5',
      description: 'no.5',
      quantity: 5,
    },
    {
      id: 6,
      name: 'Item6',
      description: 'no.6',
      quantity: 6,
    },
    {
      id: 7,
      name: 'Item7',
      description: 'no.7',
      quantity: 7,
    },
    {
      id: 8,
      name: 'Item8',
      description: 'no.8',
      quantity: 8,
    },
    {
      id: 9,
      name: 'Item9',
      description: 'no.9',
      quantity: 9,
    },
    {
      id: 10,
      name: 'Item10',
      description: 'no.10',
      quantity: 10,
    },
    {
      id: 11,
      name: 'Item11',
      description: 'no.11',
      quantity: 11,
    },
    {
      id: 12,
      name: 'Item12',
      description: 'no.12',
      quantity: 12,
    },
    {
      id: 13,
      name: 'Item13',
      description: 'no.13',
      quantity: 13,
    },
    {
      id: 14,
      name: 'Item14',
      description: 'no.14',
      quantity: 14,
    },
    {
      id: 15,
      name: 'Item15',
      description: 'no.15',
      quantity: 15,
    },
    {
      id: 16,
      name: 'Item16',
      description: 'no.16',
      quantity: 16,
    },
  ],
}

const getRandomInt = (): number => {
  const max = 1000
  const min = 100
  return Math.floor(Math.random() * Math.floor(max) + min)
}

const addProduct = (product: Product): Product => {
  product.id = getRandomInt()
  data.products.push(product)
  return product
}

const updateProduct = (product: Product): Product => {
  const index = data.products.findIndex((v) => v.id === product.id)
  data.products.splice(index, 1, product)
  return product
}

const deleteProduct = (id: number): boolean => {
  data.products = data.products.filter((v) => v.id !== id)
  return true
}

const getProducts = (): Product[] => {
  return data.products
}

export default { addProduct, updateProduct, deleteProduct, getProducts }
