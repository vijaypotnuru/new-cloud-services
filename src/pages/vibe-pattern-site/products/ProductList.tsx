import { Download, FolderOpen } from 'lucide-react'

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

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '/Invoice_17-7-24_AMV.docx.pdf' // File path inside the public folder
    link.download = 'Invoice_17-7-24_AMV.pdf' // Name of the file when downloaded
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleFileManager = () => {
    document.getElementById('fileInput').click()
  }

  return (
    <div className='bg-black p-9 shadow-md'>
      <h2 className='mb-4 mt-12 text-xl font-bold text-white sm:text-2xl'>
        VPS Hostinger
      </h2>
      <div className='overflow-x-auto'>
        <table className='min-w-full border-collapse bg-blue-100 text-sm sm:text-base'>
          <thead>
            <tr>
              <th className='px-4 py-2'>Domain</th>
              <th className='px-4 py-2'>Status</th>
              <th className='px-4 py-2'>Provider</th>
              <th className='px-4 py-2'>Taken</th>
              <th className='px-4 py-2'>Expiration</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className='border-t text-center'>
                <td className='text-align-center px-4 py-2'>
                  {product.domain}
                </td>
                <td className='px-4 py-2'>
                  <span className='rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 sm:text-sm'>
                    {product.status}
                  </span>
                </td>
                <td className='px-4 py-2'>{product.provider}</td>
                <td className='px-4 py-2'>{product.taken}</td>
                <td className='px-4 py-2'>{product.expiration}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 flex gap-4">
          {/* Download Invoice Button */}
          <button
            className='flex items-center justify-center gap-2 rounded bg-blue-500 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700 sm:w-auto sm:text-base'
            onClick={handleDownload}
          >
            <Download className='h-5 w-5' /> Download Invoice
          </button>

          {/* File Manager Button */}
          <button
            className='flex items-center justify-center gap-2 rounded bg-gray-600 px-4 py-2 text-sm font-bold text-white hover:bg-gray-800 sm:w-auto sm:text-base'
            onClick={handleFileManager}
          >
            <FolderOpen className='h-5 w-5' /> File Manager
          </button>

          {/* Hidden File Input */}
          <input type="file" id="fileInput" className="hidden" />
        </div>
      </div>
    </div>
  )
}

export default ProductList
