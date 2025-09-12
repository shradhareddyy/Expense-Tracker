// import React from 'react'
// import { getInitials } from '../../utils/helper';

// const CharAvatar = ({fullName,width,height,style}) => {
//   return (
//   <div 
//   className={`w-${width|| 'w-12'} ${height|| 'h-12'}  ${style || ''} flex items-center justify-center  rounded-full text-gray-900 font medium bg-gray-100 `}>
//     {getInitials(fullName || "")}
//   </div>);
// };

// export default CharAvatar

import React from 'react';
import { getInitials } from '../../utils/helper';

const CharAvatar = ({ firstName = '', lastName = '', size = 56, className = '' }) => {
  const initials = getInitials(firstName, lastName);

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-gray-100 text-gray-900 font-medium ${className}`}
      style={{
        width: size,
        height: size,
        lineHeight: `${size}px`,
        fontSize: Math.floor(size / 2.5),
      }}
      aria-label={`${firstName} ${lastName}`.trim()}
    >
      {initials}
    </div>
  );
};

export default CharAvatar;