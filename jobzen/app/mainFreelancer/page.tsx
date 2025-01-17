"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../footer/page';
import Navbar from '../navbarFreelancer/page';





interface JobCategory {
  id:string,
  category: string;
  image: string;
}

interface JobOwner {
  id: number;
  name: string;
  email: string;
  password: string;
  adress: string;
  phone: number;
  image: string;
  rating: number;
  description: string;
}

interface Job {
  id:number,
  jobtitle: string;
  location: string;
  budget: number;
  image: string;
  role: string;
  description: string;
  qualification: string;
  createdAt: string;
  jobOwnerId: number;
  jobCategoryId: number;
}


function page() {
  const [jobcategory, setJobcategory] = useState<JobCategory[]>([]);
  const [jobowner, setJobowner] = useState<JobOwner[]>([]);
  const [job, setJob] = useState<Job[]>([]);
  const [initialJobCount, setInitialJobCount] = useState(4);
  const [jobsForToday, setJobsForToday] = useState<Job[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/jobCategory/jobCategory')
      .then((res) => {
        const JobCategory: JobCategory[] = res.data;
        setJobcategory(JobCategory);
      })
      .catch((err) => {
        console.log(err);
      });
    getAllJobOwner();
    getAllJob();
  }, []);

  const getAllJobOwner = () => {
    axios
      .get('http://localhost:3000/jobOwner/job-owner')
      .then((res) => {
        const JobOwner: JobOwner[] = res.data;
        setJobowner(JobOwner);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllJob = () => {
    axios
      .get('http://localhost:3000/job/job')
      .then((res) => {
        const allJobs: Job[] = res.data;
        setJob(allJobs);

        const today = new Date().toISOString().split('T')[0];
        const jobsToday = allJobs.filter((job) => job.createdAt.split('T')[0] === today);
        setJobsForToday(jobsToday);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  interface StarRatingProps {
    rating: number;
  }
  
  const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
    const fullStars: number = Math.floor(rating);
    const halfStar: boolean = rating % 1 !== 0;
    const emptyStars: number = 5 - fullStars - (halfStar ? 1 : 0);
  
    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, index) => (
          <span key={index} className="text-yellow-500">&#9733;</span>
        ))}
        {halfStar && <span className="text-yellow-500">&#9733;</span>}
        {[...Array(emptyStars)].map((_, index) => (
          <span key={`empty-${index}`} className="text-gray-500">&#9733;</span>
        ))}
      </div>
    );
  };
  

  return (
    <div>
 <Navbar/>

      <div className='flex space-x-2 text-8xl ml-[5%] mb-[3cm] mt-[8cm]'>
        <h1 className='font-jockey-one text-bluefateh'>EXPLORE</h1>
        <h1 className='font-jockey-one text-[#172554]'>CATEGORY</h1>
      </div>
      
      <div className="flex justify-between ml-[10%] mr-[10%]">
        {jobcategory.map((el, i) => (
          
          <div key={i} className="relative text-center ">
            <Link href={`/jobsbycategory/${el.id}`}>
            <h1
              className="text-4xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white z-10 hover:scale-125 "
            >
              {el.category}
            </h1>
            </Link>
            <img
              src={el.image}
              alt=""
              className="w-[8cm] h-[8cm] object-cover brightness-50 rounded-xl"
            />
          </div>
        ))}
      </div>
      
    
      <div className='flex space-x-2 text-8xl ml-[5%] mb-[3cm] mt-[6cm]'>
        <h1 className='font-jockey-one text-bluefateh'>LATEST </h1>
        <h1 className='font-jockey-one text-[#172554]'>JOB OFFER</h1>
      </div>
      <div className='grid grid-cols-2 gap-[3cm] mt-[1cm] mb-[1cm] ml-[15%] mr-[10%]'>
        {jobsForToday.slice(0, initialJobCount).map((element, i) => (
          <div className="w-[12cm] h-60 flex flex-col justify-center gap-4 bg-neutral-50 rounded-lg shadow p-4 hover:scale-110">
          <div className="flex gap-4">
            <img className="bg-neutral-500 w-32 h-32 shrink-0 rounded-lg" src={element.image} alt=""/>
            <div className="flex flex-col">
              <p className="text-xl font-bold">{element.jobtitle}</p>
              <span className="font-bold text-neutral-700 italic"></span>
              <p className="text-base line-clamp-3">
                {element.role}
              </p>
              <p className="text-lg">{element.budget} TND /hr</p>
              <p className="text-sm">posted at: {(element.createdAt).split('T')[0]}</p>
            </div>
          </div>
          <button className=" hover:bg-indigo-700 bg-indigo-500 font-bold text-neutral-50 rounded p-2">
            APPLY
          </button>
        </div>
        
        ))}
      </div>



   

      <div className="flex items-center justify-center  ">
        <Link href='/'>
          
            <button className="relative border hover:border-sky-600 duration-500 group cursor-pointer text-sky-50 overflow-hidden h-14 w-56 rounded-md bg-sky-800 p-2 flex justify-center items-center font-extrabold"
              onClick={() => setInitialJobCount(initialJobCount + 3)}>
              <div className="absolute z-10 w-48 h-48 rounded-full group-hover:scale-150 transition-all duration-500 ease-in-out bg-sky-900 delay-150 group-hover:delay-75"></div>
              <div className="absolute z-10 w-40 h-40 rounded-full group-hover:scale-150 transition-all duration-500 ease-in-out bg-sky-800 delay-150 group-hover:delay-100"></div>
              <div className="absolute z-10 w-32 h-32 rounded-full group-hover:scale-150 transition-all duration-500 ease-in-out bg-sky-700 delay-150 group-hover:delay-150"></div>
              <div className="absolute z-10 w-24 h-24 rounded-full group-hover:scale-150 transition-all duration-500 ease-in-out bg-sky-600 delay-150 group-hover:delay-200"></div>
              <div className="absolute z-10 w-16 h-16 rounded-full group-hover:scale-150 transition-all duration-500 ease-in-out bg-sky-500 delay-150 group-hover:delay-300"></div>
              <p className="z-10">LOAD MORE</p>
            </button>
          
        </Link>
      </div>

      <div className=" bg-[#172554] flex mb-[3cm] mt-[3cm] ml-[2cm] mr-[2cm]">
        <div className="w-1/2 flex items-center justify-start">
          <img
            src="https://th.bing.com/th/id/R.2a57b1b2b1436476315e0daf72e96025?rik=SRomhRzX4A59Zg&pid=ImgRaw&r=0"
            alt=""
            className="mx-auto brightness-[75%]"
          />
        </div>
        <div className="bg-gradient-to-br from-[#172554] to-[#267296] w-1/2 ">
          <p className="font-jockey-one text-bluefateh text-8xl font-bold mb-[0.5cm] mt-[2cm] ml-[1cm] mr-[1cm]">JOBZEN</p>
          <p className="font-jockey-one text-white text-8xl font-bold mb-[1cm] mt-[2cm] ml-[1cm] mr-[1cm]">Connecting IT Talent with Tomorrow's Opportunities</p>
          <div className="flex space-x-16 ml-[3cm]"> 
          <Link href={'/allcompanies'}>
          <button
  className="cursor-pointer text-white font-bold relative text-2xl w-[6cm] h-[3cm] text-center bg-gradient-to-r from-violet-500 from-10% via-sky-500 via-30% to-pink-500 to-90% bg-[length:400%] rounded-[30px] z-10 hover:animate-gradient-xy hover:bg-[length:100%] before:content-[''] before:absolute before:-top-[5px] before:-bottom-[5px] before:-left-[5px] before:-right-[5px] before:bg-gradient-to-r before:from-violet-500 before:from-10% before:via-sky-500 before:via-30% before:to-pink-500 before:bg-[length:400%] before:-z-10 before:rounded-[35px] before:hover:blur-xl before:transition-all before:ease-in-out before:duration-[1s] before:hover:bg-[length:10%] active:bg-violet-700 focus:ring-violet-700"
>
        ALL<br /> COMPANIES
    </button>
         </Link>
         <Link href={'/alljobsoffers'}>
         <button
  className="cursor-pointer text-white font-bold relative text-2xl w-[6cm] h-[3cm] text-center bg-gradient-to-r from-violet-500 from-10% via-sky-500 via-30% to-pink-500 to-90% bg-[length:400%] rounded-[30px] z-10 hover:animate-gradient-xy hover:bg-[length:100%] before:content-[''] before:absolute before:-top-[5px] before:-bottom-[5px] before:-left-[5px] before:-right-[5px] before:bg-gradient-to-r before:from-violet-500 before:from-10% before:via-sky-500 before:via-30% before:to-pink-500 before:bg-[length:400%] before:-z-10 before:rounded-[35px] before:hover:blur-xl before:transition-all before:ease-in-out before:duration-[1s] before:hover:bg-[length:10%] active:bg-violet-700 focus:ring-violet-700"
>
        ALL<br /> JOBOFFER
    </button>
    </Link>
</div>

        </div>
      </div>
      
      <div className='flex space-x-2 text-8xl ml-[5%] mb-[3cm] mt-[3cm]'>
        <h1 className='font-jockey-one text-bluefateh'>BEST </h1>
        <h1 className='font-jockey-one text-[#172554]'>COMPANY</h1>
      </div>
      <div className='flex justify-between ml-[10%] mr-[10%]'>
  {jobowner.map((ele, i) => {
    return (
      ele.rating >= 3 && (
        <div key={i}>
          <Link href={`/companydetails/${ele.id}`}>
            <div className="relative flex w-80 flex-col rounded-xl bg-white text-gray-700 shadow-2xl hover:scale-110">
              <div>
                <div className='flex items-center justify-center'>
                  <img className="relative mx-4 -mt-6 h-60 w-60 overflow-hidden rounded-xl border-solid border-2 border-blueghamek" src={ele.image} alt="" />
                </div>
              </div>
              <div className="p-6">
                <h5 className="mb-2 block font-sans text-4xl font-semibold leading-snug tracking-normal text-blueghamek antialiased">
                  {ele.name}
                </h5>
                <div><StarRating rating={ele.rating} /></div>
                <div className='flex items-center justify-center mr-[1.5cm]'>
                  <img className='w-[20px] h-[20]' src="https://th.bing.com/th/id/OIP.RJwgX7x98VNnkH02LQ0L-AHaHa?rs=1&pid=ImgDetMain" alt="" />
                  <p className="  text-xl ">
                    {ele.adress}
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <button data-ripple-light="true" type="button" className="select-none rounded-lg bg-blueghamek py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                  Read More
                </button>
              </div>
            </div>
          </Link>
        </div>
      )
    );
  })}
</div>
<div className='mt-[8cm] ml-[1cm]'>
        <h1 className='text-4xl text-grisss mb-[1cm] '>company we helped grow</h1>
        <div className='flex space-x-10 ml-[2cm]'>
          <img className='h-[4cm] w-[8cm]' src="https://scontent.ftun9-1.fna.fbcdn.net/v/t39.30808-6/417431759_231763966677199_5653554093549890672_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=3635dc&_nc_ohc=hWnoDcHYd9UAX_VJfXc&_nc_oc=AQkUOzxbQBgBnpJARDCwQdNtU0Z3ipsugP7b1qaIzAXwStB6EBXhuQfkZxVlPdySBDA&_nc_ht=scontent.ftun9-1.fna&oh=00_AfAjZNWlT1oqwCA5LG7dGbHgBXvLf1uMfQgIQBVFPWmVRg&oe=65AB914A" alt="" />
          <img className='h-[4cm] w-[8cm]' src="https://scontent.ftun9-1.fna.fbcdn.net/v/t39.30808-6/417577798_231765153343747_8611348078106997068_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=3635dc&_nc_ohc=YfA7TelDY_kAX_ya66u&_nc_ht=scontent.ftun9-1.fna&oh=00_AfA4Xq8OQXp8BtfWXFZkDObMtQ0mAXd8UshkpBiNud2cCA&oe=65AB12D0" alt="" />
          <img className='h-[4cm] w-[8cm]' src="https://scontent.ftun9-1.fna.fbcdn.net/v/t39.30808-6/417444510_231765900010339_274947887996185958_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=3635dc&_nc_ohc=uuvIpkDWusoAX_XxalZ&_nc_ht=scontent.ftun9-1.fna&oh=00_AfCb_R2XK5iNwm0M-1U9iHqVqE9i19KvqP0GF_qBbrm8Iw&oe=65AB1FF2" alt="" />
          <img className='h-[4cm] w-[8cm]' src="https://scontent.ftun9-1.fna.fbcdn.net/v/t39.30808-6/417368508_231766510010278_5213960803376632728_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=3635dc&_nc_ohc=dXFxqDOPp3IAX_BU-GH&_nc_ht=scontent.ftun9-1.fna&oh=00_AfDzWNhVsZRRq9OpCGHPN-PvlvH3utNqgsfB_dRWAFqIyw&oe=65AC0862" alt="" />
          <img className='h-[4cm] w-[8cm]' src="https://scontent.ftun9-1.fna.fbcdn.net/v/t39.30808-6/418834089_231767446676851_2312434974819241847_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=3635dc&_nc_ohc=qbk4XetGLo4AX91x1yb&_nc_ht=scontent.ftun9-1.fna&oh=00_AfDjKjUaSc9ORHvRqsPdDWeQqbZ-JvkNAKNdw2e7-UsL7Q&oe=65AA929C" alt="" />
        </div>
      </div>
      


<Footer/>
    </div>
  );
}

export default page;
