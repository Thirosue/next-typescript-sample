import { useRouter } from 'next/router'
import { Product } from '../../repository/product-repository'

export const ProductRow = ({ product }: { product: Product }): JSX.Element => {
  const router = useRouter()

  return (
    <tr>
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="flex items-center">
          <div className="text-sm leading-5 font-medium text-gray-900">
            {product.name}
          </div>
        </div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="text-sm leading-5 text-gray-500">
          {product.description}
        </div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
        {product.quantity}
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          Active
        </span>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
        <a
          href="#"
          onClick={() => router.push(`/product/${product.id}`)}
          className="text-indigo-600 hover:text-indigo-900"
        >
          Edit
        </a>
      </td>
    </tr>
  )
}

export default ProductRow
