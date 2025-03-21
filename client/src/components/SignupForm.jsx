import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSignupMutation } from '../features/auth/userApi';
import { useDispatch } from 'react-redux';
import { setUser, setError } from '../features/auth/authSlice';
import Select from 'react-select'; // For searchable dropdowns
import { FiBookOpen } from "react-icons/fi"


const Signup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState("");
  const [role, setRole] = useState("Tutor"); // To toggle between tutor and student
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [signup] = useSignupMutation();

 const onSubmit = async (data) => {
    setError(null);
    setIsLoading(true);

    try {
      const result = await signup({
        userName: data.userName,
        email: data.email,
        phoneNo: data.phoneNo,
        experience: data.experience,
        subject: data.subject,
        state: selectedState?.value,
        city: selectedCity,
        bio: data.bio,
        fee: data.fee,
        password: data.password,
        role, // Adding the selected role (tutor/student)
      }).unwrap();

      const user = result.user;
      const token = result.user.refreshToken;

      localStorage.setItem('authToken', result.user.refreshToken);
      localStorage.setItem('user', JSON.stringify(result.user));

      dispatch(setUser({ user, token }));

      navigate('/'); // Redirect to home/dashboard
    } catch (err) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // // Handle state change and update city dropdown
  // const handleStateChange = (selectedOption) => {
  //   setSelectedState(selectedOption);
  //   setSelectedCity(""); // Reset selected city when state changes
  // };

  // // Handle role toggle (Tutor/Student)
  // const handleRoleToggle = (roleType) => {
  //   setRole(roleType);
  // };
  
  const handleRoleToggle = (selectedRole) => {
    setRole(selectedRole);
};

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
};

// const  = (e) => {
//     e.preventDefault();
//     // Handle form submission
//     console.log(formData);
// };

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
         
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create a new account
          </h2>
          </div>

        {error && (
          <motion.div 
            className="bg-red-50 border-l-4 border-red-400 p-4 text-red-700 flex items-center"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>{error}</span>
          </motion.div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
          <button
              type="button"
              onClick={() => handleRoleToggle('tutor')}
              className={`py-2 px-4 border rounded-md mr-8 ml-25 ${role === 'tutor' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
            >
              Tutor
            </button>
            <button
              type="button"
              onClick={() => handleRoleToggle('student')}
              className={`py-2 px-4 border rounded-md  ${role === 'student' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
            >
              Student
            </button>
            {/* UserName */}
            <div>
              <label htmlFor="userName" className="mt-10">
                User Name
              </label>
              <input
                id="userName"
                name="userName"
                type="text"
                autoComplete="name"
                {...register('userName', { required: 'User name is required' })}
                className={`appearance-none rounded-md relative block w-full px-3 py-2 border mb-4 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${errors.userName ? 'border-red-500' : ''}`}
                placeholder="User Name"
              />
              {errors.userName && <p className="text-red-500 text-xs">{errors.userName.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="sr-only">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                {...register('email', { 
                  required: 'Email is required', 
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' }
                })}
                className={`appearance-none rounded-md relative block w-full px-3 py-2 border mb-4 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${errors.email ? 'border-red-500' : ''}`}
                placeholder="Email Address"
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>

            {/* PhoneNo */}
            <div>
              <label htmlFor="phoneNo" className="sr-only">
                Phone Number
              </label>
              <input
                id="phoneNo"
                name="phoneNo"
                type="text"
                autoComplete="tel"
                {...register('phoneNo', { required: 'Phone number is required' })}
                className={`appearance-none rounded-md relative block w-full px-3 py-2 border mb-4 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${errors.phoneNo ? 'border-red-500' : ''}`}
                placeholder="Phone Number"
              />
              {errors.phoneNo && <p className="text-red-500 text-xs">{errors.phoneNo.message}</p>}
            </div>

            {/* Experience */}
            {role === 'tutor' ? (
               <div>
               <label htmlFor="experience" className="sr-only">
                 Experience (Years)
               </label>
               <input
                 id="experience"
                 name="experience"
                 type="number"
                 {...register('experience', { required: 'Experience is required' })}
                 className={`appearance-none rounded-md relative block w-full px-3 py-2 border mb-4 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${errors.experience ? 'border-red-500' : ''}`}
                 placeholder="Experience (in Years)"
               />
               {errors.experience && <p className="text-red-500 text-xs">{errors.experience.message}</p>}
             </div>
            ): role === 'student'?(
              <div>
              <label htmlFor="grade" className="sr-only">
                Experience (Years)
              </label>
              <input
                id="Grade"
                name="Grade"
                type="number"
                {...register('Grade', { required: 'Grade  is required' })}
                className={`appearance-none rounded-md relative block w-full px-3 py-2 border mb-4 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${errors.grade ? 'border-red-500' : ''}`}
                placeholder="Grade"
              />
              {errors.grade && <p className="text-red-500 text-xs">{errors.grade.message}</p>}
            </div>
            ):null}
           

            {/* Subjects (Multiple selection) */}
            <div>
              <label htmlFor="subject" className="sr-only">
                Subjects
              </label>
              <input 
                id="subject"
                name="subject"
                multiple
                {...register('subject', { required: 'Please select at least one subject' })}
                className={`appearance-none rounded-md relative block w-full px-3 py-2 border mb-4 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${errors.subject ? 'border-red-500' : ''}`}
                 placeholder="Enter intrested subjects"
              >
                {/* {subjects.map((subject) => (
                  <option key={subject} value={subject}>{subject}</option>
                ))} */}
             </input>
              {errors.subject && <p className="text-red-500 text-xs">{errors.subject.message}</p>}
            </div>

            {/* State Dropdown (Searchable) */}
            <div>
              <label htmlFor="state" className="sr-only">
                State
              </label>
              <input
                id="state"
                name="state"
                type='text'
               {...register('state', { required: 'state is required' })}
               className={`appearance-none rounded-md relative block w-full px-3 py-2 border mb-4 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${errors.state? 'border-red-500' : ''}`}
                placeholder="Enter state name"
                
              />
              {errors.state && <p className="text-red-500 text-xs">{errors.state.message}</p>}
            </div>
            <div>
              <label htmlFor="City" className="sr-only">
                State
              </label>
              <input
                id="City"
                name="City"
                type='text'
               {...register('state', { required: 'city is required' })}
               className={`appearance-none rounded-md relative block w-full px-3 py-2 border mb-4 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${errors.state? 'border-red-500' : ''}`}
                placeholder="Enter City name"
                
              />
              {errors.state && <p className="text-red-500 text-xs">{errors.state.message}</p>}
            </div>

            {/* City Dropdown */}
            {/* <div>
              <label htmlFor="city" className="sr-only">
                City
              </label>
              <select
                id="city"
                name="city"
                {...register('city', { required: 'Please select a city' })}
                onChange={(e) => setSelectedCity(e.target.value)}
                value={selectedCity}
                className={`appearance-none rounded-md relative block w-full px-3 py-2 border mb-4 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${errors.city ? 'border-red-500' : ''}`}
              >
                {selectedState && cities[selectedState.value] && cities[selectedState.value].map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              {errors.city && <p className="text-red-500 text-xs">{errors.city.message}</p>}
            </div> */}

            {/* Bio */}
            <div>
              <label htmlFor="bio" className="sr-only">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                rows="4"
                {...register('bio', { required: 'Bio is required' })}
                className={`appearance-none rounded-md relative block w-full px-3 py-2 border mb-4 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${errors.bio ? 'border-red-500' : ''}`}
                placeholder="Tell us about yourself"
              />
              {errors.bio && <p className="text-red-500 text-xs">{errors.bio.message}</p>}
            </div>

            {/* Fee per Month */}
            {role =='tutor'?(
            <div>
              <label htmlFor="fee" className="sr-only">
                Fee per Month
              </label>
              <input
                id="fee"
                name="fee"
                type="number"
                {...register('fee', { required: 'Fee per month is required' })}
                className={`appearance-none rounded-md relative block w-full px-3 py-2 border mb-4 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${errors.fee ? 'border-red-500' : ''}`}
                placeholder="Fee per Month"
              />
              {errors.fee && <p className="text-red-500 text-xs">{errors.fee.message}</p>}
            </div>
            ):null}

            {/* Password */}
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
                className={`appearance-none rounded-md relative block w-full px-3 py-2 border mb-4 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${errors.password ? 'border-red-500' : ''}`}
                placeholder="Password"
              />
              {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                {...register('confirmPassword', { 
                  required: 'Please confirm your password', 
                  validate: (value) => value === watch('password') || 'Passwords do not match' 
                })}
                className={`appearance-none rounded-md relative block w-full px-3 py-2 border mb-4 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${errors.confirmPassword ? 'border-red-500' : ''}`}
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          <div className="flex justify-center space-x-4">
           
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Signing up...' : 'Sign Up'}
            </button>
          </div>
        </form>

        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Login here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
