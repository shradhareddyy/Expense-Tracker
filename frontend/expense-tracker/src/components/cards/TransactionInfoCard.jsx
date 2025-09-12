import React from 'react'
import { LuUtensils,LuTrendingUp,LuTrendingDown,LuTrash2 } from 'react-icons/lu'

const TransactionInfoCard = ({title, icon, date, amount, type, hideDeleteBtn    }) => {

const getAmountStyles = () => type === 'income' ? 'bg-green-100/50 text-green-600' : 'bg-red-100/50 text-red-600';

  return (
    <div className='group relative flex items-center gap-4 mb-4  p-4 rounded-lg hover:bg-gray-50 cursor-pointer'>
        <div className=" w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full drop-shadow-xl">
            {icon ?(
                <img src={icon} alt={title} className="w-8 h-8 rounded-full object-cover mr-4" />
            ):(
                <LuUtensils  />
            )}
            </div>
            <div className='flex-1 flex items-center justify-between'>
                <div>
                    <p className="text-sm text-gray-500 font-medium">{title}</p>
                    <p className="text-xs text-gray-400 mt-1">{date}  </p>

                </div>

                <div className="flex items-center gap-3">
                    {!hideDeleteBtn && (
                        <button className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                          onClick={onDelete}>
                            <LuTrash2 size={18} />
                        </button>
                    )}
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-md ${getAmountStyles(type)}`}>

                     <h6 className="text-xs font-semibold">
                        {type === 'income' ? '+' : '-'}${amount}


                     </h6>

                     {type === 'income' ? (
                        <LuTrendingUp className="text-green-500" />
                     ) : (
                        <LuTrendingDown className="text-red-500" />
                     )}

                </div>
            </div>
            </div>
            </div>

  
  
)}

export default TransactionInfoCard