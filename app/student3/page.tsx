'use client';
import Image from 'next/image'

export default function Home() {
    return (
      <div className="bg-[url('/Desktop-1.png')] w-screen h-screen flex justify-center items-center bg-title-1 font-[kanit]">
        <div className=' flex items-center justify-center min-h-screen'>
        <div className='flex items-center justify-center  mx-auto py-12 px-16 bg-[#FCFCFC] rounded-lg  shadow-md  flex-col  min-h-fit '>
          <Image src="/MultiStep3.png" alt="MultiStep3.png" width={340}height={340} />
          <Image src="/Logo-circle.png" alt="logo.png" width={140}height={140} className='mb-4 mt-8'/>
          <p className='text-body-1 text-[28px] font-bold pb-4 '>กรอกประวัติผู้ปกครอง</p>
          <div className='flex flex-col '>
            <input type="text" placeholder="ชื่อผู้ปกครอง" className="input input-bordered w-[450px] max-w-xs bg-system-light-gray text-body-2 mb-2" />
            <input type="text" placeholder="นามสกุลผู้ปกครอง" className="input input-bordered w-[450px] max-w-xs bg-system-light-gray mb-2" />
            <input type="text" placeholder="เบอร์ผู้ปกครอง" className="input input-bordered w-[450px] max-w-xs bg-system-light-gray mb-2" />
            <input type="text" placeholder="ความสัมพันธ์" className="input input-bordered w-[450px] max-w-xs bg-system-light-gray" />
            <button className='bg-primary-2 text-system-white p-3 mt-4 hover:bg-primary-2-hover w-full rounded-sm'>ถัดไป</button> 
          </div>
        
        
        </div> 
        </div>
      </div>
    );
  }