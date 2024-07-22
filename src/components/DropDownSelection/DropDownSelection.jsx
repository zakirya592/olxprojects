import React from 'react'

function DropDownSelection() {
  return (
    <div className='hidden lg:block'>
      <ul className="flex gap-5 mt-4 ">
        <li className='text-detailscolor text-mg hover:text-texthover cursor-pointer'>Mobile Phones</li>
        <li className='text-detailscolor text-mg hover:text-texthover cursor-pointer'>Cars</li>
        <li className='text-detailscolor text-mg hover:text-texthover cursor-pointer'>Motorcycles</li>
        <li className='text-detailscolor text-mg hover:text-texthover cursor-pointer'>Houses</li>
        <li className='text-detailscolor text-mg hover:text-texthover cursor-pointer'>Video-Audios</li>
        <li className='text-detailscolor text-mg hover:text-texthover cursor-pointer'>Tablets</li>
        <li className='text-detailscolor text-mg hover:text-texthover cursor-pointer'>Land & Plots</li>
      </ul>
    </div>
  );
}

export default DropDownSelection