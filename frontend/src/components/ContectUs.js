import React, { useState } from "react";
import "./ContectUs.css";

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
      // Clear form
      setFormData({ name: "", email: "", subject: "", message: "" });
    }
  };

  return (
    <div className="sunny">
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>If you have any questions, feel free to contact us!</p>
      {submitted && <p className="success-message">Message sent successfully!</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Enter the subject"
          />
          {errors.subject && <span className="error">{errors.subject}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message here..."
          ></textarea>
          {errors.message && <span className="error">{errors.message}</span>}
        </div>

        <button type="submit">Send Message</button>
      </form>
    </div>
    </div>
  );
};

export default ContactUs;
