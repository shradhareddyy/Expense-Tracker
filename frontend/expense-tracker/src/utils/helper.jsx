

export const validateEmail=(email)=>{
    const regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const getInitials=(firstName,lastName)=>{
    if (!firstName && !lastName) return ""; // Default initial for "User"
    const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : '';
    const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : '';
    return firstInitial + lastInitial;
}

export const addThousandsSeparator=(num)=>{
    if (num===null || isNaN(num)) return "";

    const [integerPart, fractionalPart] = num.toString().split('.');
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return fractionalPart ? `${formattedInteger}.${fractionalPart}` : formattedInteger;
}
    