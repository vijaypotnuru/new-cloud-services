// @ts-nocheck
import React from 'react'
import HTMLFlipBook from 'react-pageflip'
import { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import pdf from './vibepatternnew01.pdf'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

const Pages = React.forwardRef((props, ref) => {
  return (
    <div className='demoPage' ref={ref}>
      <p>{props.children}</p>
    </div>
  )
})

Pages.displayName = 'Pages'

function Brochure() {
  const [numPages, setNumPages] = useState()
  const [dimensions, setDimensions] = useState({
    width: 400,
    height: 600,
  })

  React.useEffect(() => {
    function updateDimensions() {
      if (window.innerWidth < 768) {
        setDimensions({
          width: window.innerWidth,
          height: 310, // Maintain aspect ratio
        })
      } else {
        setDimensions({
          width: 448,
          height: 339,
        })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
  }

  return (
    <div className='flex min-h-screen w-full flex-col items-center justify-center gap-5 bg-black bg-cover bg-center p-4'>
      <h1 className='text-center text-3xl font-bold text-white font-serif'>
        Vibe Pattern Brochure
      </h1>
      <div className='flex w-full max-w-4xl justify-center'>
        <HTMLFlipBook
          width={dimensions.width}
          height={dimensions.height}
          size='stretch'
          minWidth={dimensions.width}
          maxWidth={dimensions.width * 2}
          minHeight={dimensions.height}
          maxHeight={dimensions.height}
          showCover={true}
          // mobileScrollSupport={true}
          className='bg-transparent'
        >
          {[...Array(numPages).keys()].map((pNum) => (
            <Pages key={pNum} number={pNum + 1}>
              <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
                <Page
                  pageNumber={pNum + 1}
                  width={dimensions.width}
                  height={dimensions.height}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                />
              </Document>
            </Pages>
          ))}
        </HTMLFlipBook>
      </div>
    </div>
  )
}

export default Brochure
