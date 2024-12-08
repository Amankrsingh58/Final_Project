import React from 'react';

const WorkProcess = () => {
  return (
    <div className="bg-blue-300  py-12 px-4 lg:px-16">
      <h2 className="text-center text-sm font-semibold text uppercase mb-2">
        Work Process
      </h2>
      <h1 className="text-center text-3xl lg:text-4xl font-bold text-gray-800 mb-10">
        We Work Best When We Work Together
      </h1>

    <div className=' h-auto flex lg:justify-between xs:flex-col lg:flex-row'>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8 lg:mb-12 w-[45%] xs:w-full lg:w-[45%]">
        <h3 className="text-xl font-bold text-gray-800 mb-6 text-center lg:text-left">
          For Student
        </h3>
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="text-blue-600">
              <i className="fas fa-envelope text-2xl"></i>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800">
                Free Enquiry
              </h4>
              <p className="text-gray-600">
                Not sure where to start? Get in touch with us for a free enquiry.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="text-blue-600">
              <i className="fas fa-user-graduate text-2xl"></i>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800">
                Help To Find Your Tutor
              </h4>
              <p className="text-gray-600">
                Finding the right tutor is crucial for your academic success.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="text-blue-600">
              <i className="fas fa-calendar-alt text-2xl"></i>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800">
                Schedule A Lesson
              </h4>
              <p className="text-gray-600">
                Ready to begin your learning journey? Schedule a lesson with one
                of our qualified tutors.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8 lg:mb-12 w-[45%] xs:w-full lg:w-[45%]">
        <h3 className="text-xl font-bold text-gray-800 mb-6 text-center lg:text-left">
          For Tutor
        </h3>
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="text-blue-600">
              <i className="fas fa-user-plus text-2xl"></i>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800">Join Us</h4>
              <p className="text-gray-600">
                Are you a passionate educator looking to make a difference?
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="text-blue-600">
              <i className="fas fa-id-badge text-2xl"></i>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800">
                Create Tutor Profile
              </h4>
              <p className="text-gray-600">
                Set up your profile to showcase your qualifications, experience,
                and teaching style.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="text-blue-600">
              <i className="fas fa-calendar-alt text-2xl"></i>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800">
                Schedule A Lesson
              </h4>
              <p className="text-gray-600">
                Once your profile is set, you can start scheduling lessons.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default WorkProcess;
