import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import moment from 'moment';
import TransactionInfoCard from '../cards/TransactionInfoCard';

const RecentTransactions = ({transactions, onSeeMore}) => {

 const getTitle = (tx) =>
    tx?.title ||
    tx?.category ||         // works for income like "Salary" if stored as category
    tx?.source ||           // or use source if you have it
    (tx?.type === 'income' ? 'Income' : 'Expense');


  return (
    <div className="card">
        <div className="flex items-center justify-between">
            <h5 className="text-lg"> Recent Transactions</h5>

            <button className="card-btn" onClick={onSeeMore}> 
                See All <LuArrowRight className="text-base" />
            </button>
        </div>
         
         <div className="mt-6">
            {transactions?.slice(0,5).map((item) => (
               <TransactionInfoCard 
               key={item._id}
               title={getTitle(item)}
               icon={item.icon}
               date={moment(item.date).format("DD MMM, YYYY")}
                amount={item.amount}
               type={item.type}
               hideDeleteBtn={true}
               />
            ))}
            </div>


        </div>


  );
}

export default RecentTransactions