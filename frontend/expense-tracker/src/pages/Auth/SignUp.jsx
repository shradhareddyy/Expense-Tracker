import React,{useState} from 'react'
import { useNavigate,Link } from 'react-router-dom';
import AuthLayout from '../../components/layouts/AuthLayout';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';  
import uploadImage from '../../utils/uploadImage';    

const SignUp = () => {

  const [profilePic,setProfilePic] = useState(null);
  const[firstName,setFirstName] = useState("");
  const[lastName,setLastName] = useState("");
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");


  const[error,setError] = useState(null);
  const{updateUser}=useContext(UserContext);

  const navigate = useNavigate();

  //handle signup form submit
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);

    // let profileImageUrl="";

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!firstName) {
      setError("Please enter your first name.");
      return;
    }

    if (!lastName) {
      setError("Please enter your last name.");
      return;
    }

    if (!password) {
      setError("Please enter a password.");
      return;
    }

    // setError("");

    //SignUp API call
    try{


      //upload profile image if selected
      let profileImageUrl="";
      if (profilePic){
        const imguploadRes=await uploadImage(profilePic);
        console.log("Image upload response:", imguploadRes);
        profileImageUrl=imguploadRes.imageUrl || imguploadRes.url||"";
        if (!profileImageUrl) {
        // log full response and stop or decide to continue without image
        console.error("Upload returned no URL:", imguploadRes);
        throw new Error("Image upload failed");
      }

      }


    





      const response=await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
        firstName,
        lastName,
        email,
        password,
        profileImageUrl,
      });
      const{token,user}=response.data;

      if (token){
        //store the token in the local storage
        localStorage.setItem("token",token);

        updateUser(user);
          localStorage.setItem("user", JSON.stringify(user)); // <-- add this line

        navigate("/dashboard");
      }else {
      setError("Signup failed. No token returned.");
    }
    }catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center items-center">
        <h3 className='text-xl font-semibold text-black'> Create an Account  </h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6 ">Join us today by entering your details below.</p>
       

       <form onSubmit={handleSignUp}>

        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>
        

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
          
          <Input
            value ={firstName}
            onChange={({target})=> setFirstName(target.value)}
            label="First Name"
            placeholder="Enter your first name"
            type="text"
            />

          <Input
            value={lastName}
            onChange={({target})=> setLastName(target.value)}
            label="Last Name"
            placeholder="Enter your last name"
            type="text"
          />

          <Input 
          value={email}
          onChange={({target})=>setEmail(target.value)}
          label="Email Address"
          placeholder="Enter your email"
          type="text"
        />
        <Input
         value={password}
          onChange={({target})=>setPassword(target.value)}
          label="Password"
          placeholder="Enter your password (min 8 characters)"
          type="password"
        />
      </div>
      {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
                <button type="submit" className="btn-primary">
                SIGN UP
                </button>
        
                <p className="text-[13px] text-slate-800 mt-3">
                  Already have an account?{" "}
                  <Link className="font-medium text-primary underline" to="/login">
                  Login
                  </Link>
                </p>
       </form>
      </div>
    </AuthLayout>
  )
}

export default SignUp