import React from 'react';

const WorkProcess = () => {
  return (
    <div className="bg-[#221F3C] py-12 px-4 lg:px-16">
      <h2 className="text-center text-sm font-semibold text-white uppercase mb-2">
        Work Process
      </h2>
      <h1 className="text-center text-white text-3xl lg:text-4xl font-bold mb-10">
        We Work Best When We Work Together
      </h1>

      <div className="h-auto flex flex-col lg:flex-row lg:justify-between gap-6">
        <div className="bg-[#262051] transition-all duration-300 group hover:bg-white hover:shadow-lg lg:hover:scale-105 hover:rounded-lg shadow-md rounded-lg p-6 xs:mb-4 lg:mb-0 w-full lg:w-[45%]">
          <h3 className="text-xl font-bold text-white mb-6 text-center lg:text-left group-hover:text-[#262051]">
            For Student
          </h3>
          <div className="space-y-6">
            <div className="flex items-start space-x-4 group-hover:text-[#262051]">
              <div>
                <i className="fas fa-envelope text-2xl text-white group-hover:text-[#262051]"></i>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white group-hover:text-[#262051]">Free Enquiry</h4>
                <p className="text-white group-hover:text-[#262051]">
                  Not sure where to start? Get in touch with us for a free enquiry.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4 group-hover:text-[#262051]">
              <div>
                <i className="fas fa-user-graduate text-2xl text-white group-hover:text-[#262051]"></i>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white group-hover:text-[#262051]">Help To Find Your Tutor</h4>
                <p className="text-white group-hover:text-[#262051]">
                  Finding the right tutor is crucial for your academic success.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4 group-hover:text-[#262051]">
              <div>
                <i className="fas fa-calendar-alt text-2xl text-white group-hover:text-[#262051]"></i>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white group-hover:text-[#262051]">Schedule A Lesson</h4>
                <p className="text-white group-hover:text-[#262051]">
                  Ready to begin your learning journey? Schedule a lesson with one
                  of our qualified tutors.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#262051] transition-all duration-300 group hover:bg-white hover:shadow-lg lg:hover:scale-105 hover:rounded-lg shadow-md rounded-lg p-6 xs:mb-4 lg:mb-0 w-full lg:w-[45%]">
          <h3 className="text-xl font-bold text-white mb-6 text-center lg:text-left group-hover:text-[#262051]">
            For Tutor
          </h3>
          <div className="space-y-6">
            <div className="flex items-start space-x-4 group-hover:text-[#262051]">
              <div>
                <i className="fas fa-user-plus text-2xl text-white group-hover:text-[#262051]"></i>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white group-hover:text-[#262051]">Join Us</h4>
                <p className="text-white group-hover:text-[#262051]">
                  Are you a passionate educator looking to make a difference?
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4 group-hover:text-[#262051]">
              <div>
                <i className="fas fa-id-badge text-2xl text-white group-hover:text-[#262051]"></i>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white group-hover:text-[#262051]">Create Tutor Profile</h4>
                <p className="text-white group-hover:text-[#262051]">
                  Set up your profile to showcase your qualifications, experience,
                  and teaching style.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4 group-hover:text-[#262051]">
              <div>
                <i className="fas fa-calendar-alt text-2xl text-white group-hover:text-[#262051]"></i>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white group-hover:text-[#262051]">Schedule A Lesson</h4>
                <p className="text-white group-hover:text-[#262051]">
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
