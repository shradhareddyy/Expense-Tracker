import React,{useState} from 'react'
import { useNavigate,Link } from 'react-router-dom';
import AuthLayout from '../../components/layouts/AuthLayout';
import Input from '../../components/layouts/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/layouts/Inputs/ProfilePhotoSelector';

const SignUp = () => {

  const [profilePic,setProfilePic] = useState(null);
  const[firstName,setFirstName] = useState("");
  const[lastName,setLastName] = useState("");
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");


  const[error,setError] = useState(null);

  const navigate = useNavigate();

  //handle signup form submit
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl="";

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

    setError("");

    //SignUp API call

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