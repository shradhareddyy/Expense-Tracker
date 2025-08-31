import React from 'react'
import tracker1 from "../../assets/images/tracker1.png"
import {LuTrendingUpDown} from "react-icons/lu"

const AuthLayout = ({children}) => {
  return <div className="flex">
    <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
      <h2 className="text-lg font-medium text-black">Expense Tracker</h2>
        {children}
      </div>

      <div className="hidden md:block w-[40vw] h-screen bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative">
        <div className="w-50 h-50 rounded-[40px] bg-purple-500 absolute -top-7 -left-5"/>
         <div className="w-50 h-58 rounded-[40px]  border-[20px] border-fuchsia-600 absolute top-[30%] -right-10"/>
          <div className="w-50 h-50 rounded-[40px] bg-violet-500 absolute -bottom-7 -left-5"/>

        <div className='grid grid-cols-1 z-20'>
            <StatsInfoCard

            icon={<LuTrendingUpDown />}
            label="Track your own Income and Expenses"
            value="430,000"
            color="bg-primary"
            />
        </div>

        <img src={tracker1}
        className='w-70 lg:w-[90%] absolute bottom-20 shadow-lg shadow-blue-400/15' 
        />
        </div>
    </div>;
  
};

export default AuthLayout

const StatsInfoCard=({icon,label,value,color})=>{
  return (
    <div className={"flex gap-6 bg-white p-4 rounded-xl shadow-md shadow-purple-400/10 border-border-gray-200/50 z-10"}>
      <div className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}>
        {icon}
      </div>
      <div>
        <h6 className="text-xs text-gray-500 mb-1">{label}</h6>
        <span className="text-[20px]">${value}</span>
      </div>
    </div>
  )
}
