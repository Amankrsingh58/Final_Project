import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, User, Mail, Phone, BookOpen, FileText, MapPin, Building2, Lock, GraduationCap, School } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSignupMutation } from '../features/auth/userApi';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/auth/authSlice';
import toast from 'react-hot-toast';

const FormField = ({ error, children }) => (
  <div className="mb-4">
    {children}
    {error && (
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-1 text-sm text-red-600"
      >
        {error}
      </motion.p>
    )}
  </div>
);

const Signup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState('Tutor');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [Signup] = useSignupMutation();

  const onSubmit = async (data) => {
    setError(null);
    setIsLoading(true);

    const toastId = toast.loading("Register in...");

    try {
      const result = await Signup({
        ...data,
        role,
      }).unwrap();
      toast.success("User Register successful!", { id: toastId });

      const user = result.user;
      const token = result.user.refreshToken;
      console.log(user, token);

      localStorage.setItem('authToken', result.user.refreshToken);
      localStorage.setItem('user', JSON.stringify(result.user));

      dispatch(setUser({ user, token }));
      navigate('/');
    } catch (err) {
      toast.error(err.message || "An unexpected error occurred.", { id: toastId });

      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setTimeout(() => toast.dismiss(toastId), 2000);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="bg-white rounded-xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="px-6 py-8 sm:px-12">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Create Your Account
              </h2>
              <p className="text-gray-600">Join our community of learners and educators</p>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-md"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="flex items-center text-red-700">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    <span>{error}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-center space-x-4 mb-8">
              <button
                type="button"
                onClick={() => setRole('Tutor')}
                className={`flex items-center justify-center px-6 py-3 rounded-lg transition-all ${
                  role === 'Tutor'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <GraduationCap className="w-5 h-5 mr-2" />
                Tutor
              </button>
              <button
                type="button"
                onClick={() => setRole('Student')}
                className={`flex items-center justify-center px-6 py-3 rounded-lg transition-all ${
                  role === 'Student'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <School className="w-5 h-5 mr-2" />
                Student
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField error={errors.userName?.message}>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      {...register('userName', { required: 'Username is required' })}
                      className="pl-10 w-full h-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Enter your username"
                    />
                  </div>
                </FormField>

                <FormField error={errors.email?.message}>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' }
                      })}
                      className="pl-10 w-full h-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                </FormField>

                <FormField error={errors.phoneNo?.message}>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      {...register('phoneNo', { required: 'Phone number is required' })}
                      className="pl-10 w-full h-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </FormField>

                {role === 'Tutor' ? (
                  <FormField error={errors.experience?.message}>
                    <div className="relative">
                      <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="number"
                        {...register('experience', { required: 'Experience is required' })}
                        className="pl-10 w-full h-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Years of experience"
                      />
                    </div>
                  </FormField>
                ) : (
                  <FormField error={errors.grade?.message}>
                    <div className="relative">
                      <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="number"
                        {...register('grade', { required: 'Grade is required' })}
                        className="pl-10 w-full h-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Grade"
                      />
                    </div>
                  </FormField>
                )}

                {/* <div className="md:col-span-2">
                  <FormField error={errors.bio?.message}>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                      <textarea
                        {...register('bio', { required: 'Bio is required' })}
                        rows="4"
                        className="pl-10 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Tell us about yourself"
                      />
                    </div>
                  </FormField>
                </div> */}

                {role === 'Tutor' && (
                  <FormField error={errors.fee?.message}>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">₹</span>
                      <input
                        type="number"
                        {...register('fee', { required: 'Fee is required' })}
                        className="pl-8 w-full h-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Monthly fee"
                      />
                    </div>
                  </FormField>
                )}

                <FormField error={errors.state?.message}>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      {...register('state', { required: 'State is required' })}
                      className="pl-10 w-full h-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Your state"
                    />
                  </div>
                </FormField>

                <FormField error={errors.city?.message}>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      {...register('city', { required: 'City is required' })}
                      className="pl-10 w-full h-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Your city"
                    />
                  </div>
                </FormField>

                {role === 'Tutor' ? (
                  <FormField error={errors.subjects?.message}>
                    <div className="relative">
                      <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        {...register('subjects', { required: 'Subject is required' })}
                        className="pl-10 w-full h-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Enter subjects"
                      />
                    </div>
                  </FormField>
                ) : (
                  <FormField error={errors.subjectInterested?.message}>
                    <div className="relative">
                      <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        {...register('subjectInterested', { required: 'Subject is required' })}
                        className="pl-10 w-full h-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Enter subjects"
                      />
                    </div>
                  </FormField>
                )}

                <FormField error={errors.password?.message}>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="password"
                      {...register('password', {
                        required: 'Password is required',
                        minLength: { value: 6, message: 'Password must be at least 6 characters' }
                      })}
                      className="pl-10 w-full h-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Create a password"
                    />
                  </div>
                </FormField>

                <FormField error={errors.confirmPassword?.message}>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="password"
                      {...register('confirmPassword', {
                        required: 'Please confirm your password',
                        validate: (value) => value === watch('password') || 'Passwords do not match'
                      })}
                      className="pl-10 w-full h-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Confirm your password"
                    />
                  </div>
                </FormField>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0"></path>
                      </svg>
                      Registering...
                    </>
                  ) : (
                    'Register'
                  )}
                </button>
              </div>
              <p className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
                  Sign in instead
                </Link>
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
