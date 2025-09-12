import React from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import useUserAuth from '../../hooks/useUserAuth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths.js';
import { useEffect } from 'react';
import { LuHandCoins,LuWalletMinimal } from 'react-icons/lu';
import { IoCardOutline } from 'react-icons/io5';
import InfoCard from '../../components/cards/InfoCard';
import { addThousandsSeparator } from '../../utils/helper';
import RecentTransactions from '../../components/Dashboard/RecentTransactions';

const Home = () => {

  useUserAuth();

  const navigate=useNavigate();

  const[dashboardData,setDashboardData]=useState(null);
  const[loading,setLoading]=useState(false);
 
  const fetchDashboardData=async()=>{
    if (loading)
      return;

    setLoading(true);

    try{
      const response=await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );
      if (response.data){
        setDashboardData(response.data);
      }
    }catch(error){
      console.log("Error fetching dashboard data:",error);
    }finally{
      setLoading(false);
    }
  };

useEffect(()=>{
  fetchDashboardData();
 return()=>{};
},[]);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
          
     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      <InfoCard
      icon={<LuWalletMinimal/>}
      label="Total Balance"
      value={addThousandsSeparator(dashboardData?.totalBalance ||  0)}
      color="bg-primary"
      />
        <InfoCard
      icon={<LuWalletMinimal/>}
      label="Total Income"
      value={addThousandsSeparator(dashboardData?.totalIncome ||  0)}
      color="bg-orange-500"
      />
        <InfoCard
      icon={<LuHandCoins/>}
      label="Total Expenses"
      value={addThousandsSeparator(dashboardData?.totalExpenses||  0)}
      color="bg-red-500"
      />

   </div>
   </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <RecentTransactions
        transactions={dashboardData?.recentTransactions}
        onSeeMore={()=>navigate('/expense')}
        />

      </div>
    </DashboardLayout>
  );
};

export default Home