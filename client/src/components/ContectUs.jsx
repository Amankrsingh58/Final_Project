import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required.";
    if (!formData.email) tempErrors.email = "Email is required.";
    if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Invalid email format.";
    if (!formData.subject) tempErrors.subject = "Subject is required.";
    if (!formData.message) tempErrors.message = "Message cannot be empty.";
    return tempErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setSubmitted(true);
      console.log("Form submitted successfully:", formData);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }
  };

  return (
    <div
      className="w-full h-full mt-8 bg-cover bg-center bg-black"
      style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
      }}
    >
      <div className="max-w-lg mx-auto my-12 p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-center text-2xl font-bold text-gray-800 mb-6">
          Contact Us
        </h1>
        <p className="text-center text-gray-600 mb-4">
          If you have any questions, feel free to contact us!
        </p>
        {submitted && (
          <p className="text-center text-green-600 mb-6">Message sent successfully!</p>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="form-group">
            <label htmlFor="name" className="text-sm text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full px-4 py-2 mt-1 border rounded-lg text-sm border-gray-300"
            />
            {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email" className="text-sm text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-1 border rounded-lg text-sm border-gray-300"
            />
            {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="subject" className="text-sm text-gray-700">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter the subject"
              className="w-full px-4 py-2 mt-1 border rounded-lg text-sm border-gray-300"
            />
            {errors.subject && (
              <span className="text-red-500 text-xs">{errors.subject}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="message" className="text-sm text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              className="w-full px-4 py-2 mt-1 border rounded-lg text-sm border-gray-300 resize-none"
            ></textarea>
            {errors.message && (
              <span className="text-red-500 text-xs">{errors.message}</span>
            )}
          </div>

          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-800 rounded-lg"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;

