
import Image from 'next/image'
import Link from "next/link";
import './globals.css';


export default function Page() {
  return (
    <div className="font-[kanit] bg-[url('/Desktop-1.png')] bg-cover bg-center"> 
    <div className=' flex items-center justify-center min-h-screen'>
    <div className='flex items-center justify-center  mx-auto py-12 px-16 bg-[#FCFCFC] rounded-lg  shadow-md  flex-col  min-h-fit '>
      <p className='text-[#605E5C] text-[32px]'>กรุณาเลือกประเภทผู้ใช้</p>
      <p className='text-[#A19F9D] text-[20px]'>กรุณาเลือกประเภทผู้ใช้</p>
    
    <div className='flex grid-cols-3 gap-12 pt-[50px] '>
      <Link href={"/student1"}>
        <div className=" group hover:bg-[url('/frame.png')]  pt-5 relative place-items-center border-[3px] rounded-[15px] w-[250px] h-[260px] border-[#D9D9D9]">
          <Image src="/Teacher-Boy-Mascot.png" alt="Teacher-Boy Mascot.png" width={180}height={180} />
          <p className='  group-hover:text-[#FCFCFC] text-[#605E5C] text-[18px] absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-2 text-center'> ผู้ดูแลระบบ</p>
        </div>
      </Link>

      <Link href={"/student1"}>
        <div className=" group hover:bg-[url('/frame.png')]  pt-5 relative place-items-center border-[3px] rounded-[15px] w-[250px] h-[260px] border-[#D9D9D9]">
          <Image src="/Teacher-Girl-Mascot.png" alt="Teacher-Girl Mascot.png" width={160} height={160}/>
          <p className='  group-hover:text-[#FCFCFC] text-[#605E5C] text-[18px] absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-2 text-center'> ผู้ดูแลระบบ</p>
        </div>
      </Link>

      <Link href={"/student1"}>
        <div className=" group hover:bg-[url('/frame.png')]  pt-5 relative place-items-center border-[3px] rounded-[15px] w-[250px] h-[260px] border-[#D9D9D9]">
          <Image src="/Student-girl.png" alt="Girl-Mascot.png" width={145} height={145} />
          <p className='  group-hover:text-[#FCFCFC] text-[#605E5C] text-[18px] absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-2 text-center'> ผู้ดูแลระบบ</p>
        </div>
      </Link>
      
    </div>
  </div>
  </div>
  </div>

  )
}

