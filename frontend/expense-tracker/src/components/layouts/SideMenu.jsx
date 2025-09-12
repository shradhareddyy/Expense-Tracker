// import React, { useContext } from 'react';
// import { SIDE_MENU_DATA } from '../../utils/data';
// import { UserContext } from '../../context/userContext';
// import { useNavigate } from 'react-router-dom';

// const SideMenu = ({ activeMenu }) => {
//     const { user, clearUser } = useContext(UserContext);
//     const navigate = useNavigate();

//     const handleClick = (route) => {
//         if (route === 'logout') {
//             handleLogout();
//             return;
//         }
//         navigate(route);
//     };

//     const handleLogout = () => {
//         localStorage.clear();
//         clearUser();
//         navigate('/login');
//     };

//     return (
//         <div className="w-64 h-[calc(100vh-64px)] bg-white border-r border-gray-200 p-6 shadow-md flex flex-col">
//             <div className="flex flex-col items-center mb-8">
//                 {user?.profileImageURL ? (
//                     <img
//                         src={user?.profileImageURL || ""}
//                         alt={`${user.firstName || "User"} profile`}
//                         className="w-20 h-20 rounded-full object-cover mb-4"
//                     />
//                 ) : (
//                     <div className="w-20 h-20 rounded-full bg-gray-200 mb-4" />
//                 )}
//                 <h5 className="text-gray-950 font medium leading-6">
//                     {user?.firstName || ""}
//                 </h5>

            


//             </div>
//             {SIDE_MENU_DATA.map((item, index) => (
//                 <button
//                     key={`menu_${index}`}
//                     className={`w-full flex items-center gap-4 text-[15px] ${
//                         activeMenu === item.label ? 'text-white bg-primary' : 'hover:bg-violet-200 hover:text-primary'
//                     } py-3 px-6 rounded-lg mb-3`}
//                     onClick={() => handleClick(item.path)}
//                 >
//                     <item.icon className="text-xl" />
//                     {item.label}
//                 </button>
//             ))}
//         </div>
//     )
// };

// export default SideMenu;




import React, { useContext,useState } from 'react';
import { SIDE_MENU_DATA } from '../../utils/data';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import CharAvatar from '../cards/CharAvatar';

const SideMenu = ({ activeMenu }) => {
    const { user, clearUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [imgError, setImgError] = useState(false);

  // Build full name and initials right here
  const capitalize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : '');
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).map(capitalize).join(' ').trim();
  const initials = `${user?.firstName?.[0] || ''}${user?.lastName?.[0] || ''}`.toUpperCase();


    const handleClick = (route) => {
        if (route === '/logout' || route === 'logout') {
            handleLogout();
            return;
        }
        navigate(route);
    };

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate('/login');
    };

    return (
        <div className="w-64 h-[calc(100vh-64px)] bg-white border-r border-gray-200 p-6 shadow-md flex flex-col">
            <div className="flex flex-col items-center mb-8">
                {user?.profileImageUrl ? (
                    <img
                        src={user.profileImageUrl}
                        alt={`${user.firstName || "User"} profile`}
                        className="w-30 h-30 rounded-full object-cover mb-4"
                        onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = '/fallback-avatar.png';
                        }}
                    />
                ) : (
                       <CharAvatar
            firstName={user?.firstName || ''}
            lastName={user?.lastName || ''}
            size={144}
            className="mb-4 shadow-md border border-gray-100"
          />


                )}
                <h5 className="text-gray-950 font-medium leading-6">
                    {fullName}
                </h5>
            </div>

            {SIDE_MENU_DATA.map((item, index) => (
                <button
                    key={`menu_${index}`}
                    className={`w-full flex items-center gap-4 text-[15px] ${
                        activeMenu === item.label ? 'text-white bg-primary' : 'hover:bg-violet-200 hover:text-primary'
                    } py-3 px-6 rounded-lg mb-3 transition-colors duration-150`}
                    onClick={() => handleClick(item.path)}
                >
                    {item.icon && <item.icon className="text-xl" />}
                    {item.label}
                </button>
            ))}
        </div>
    )
};

export default SideMenu;