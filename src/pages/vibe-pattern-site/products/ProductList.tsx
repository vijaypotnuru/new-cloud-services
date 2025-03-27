import { Download, FileImageIcon } from 'lucide-react' 

const ProductList = () => {
  const products = [
    {
      domain: 'amazemedspa.com',
      status: 'Active',
      provider: 'Vextorinnovations',
      taken: 'Nov 20, 2024',
      expiration: 'Jun 24, 2025',
    },
  ]

  return (
    <div className='bg-black p-9 shadow-md'>
      <h2 className='mb-4 mt-12 text-xl text-white sm:text-2xl font-bold'>VPS Hostinger</h2>
      <div className='overflow-x-auto'>
        <table className='min-w-full border-collapse bg-blue-100 text-sm sm:text-base'>
          <thead>
            <tr>
              <th className='py-2 px-4'>Domain</th>
              <th className='py-2 px-4'>Status</th>
              <th className='py-2 px-4'>Provider</th>
              <th className='py-2 px-4'>Taken</th>
              <th className='py-2 px-4'>Expiration</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className='border-t text-center'>
                <td className='text-align-center py-2 px-4'>{product.domain}</td>
                <td className='py-2 px-4'>
                  <span className='rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 sm:text-sm'>
                    {product.status}
                  </span>
                </td>
                <td className='py-2 px-4'>{product.provider}</td>
                <td className='py-2 px-4'>{product.taken}</td>
                <td className='py-2 px-4'>{product.expiration}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className='mt-4 flex w-full items-center justify-center gap-2 rounded bg-blue-500 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700 sm:w-auto sm:text-base'>
          <Download className='h-5 w-5' /> Download Invoice
        </button>
      </div>
    </div>
  )
}

export default ProductList
