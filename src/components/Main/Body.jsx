import React, { useState } from 'react';
import './Body.css';

const Body = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    queryType: '',
    message: '',
    consent: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false); // To handle form submission success

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName) {
      newErrors.firstName = 'This field is required';
    }

    if (!formData.lastName) {
      newErrors.lastName = 'This field is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Please enter a valid email address';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.queryType) {
      newErrors.queryType = 'Please select a Query type';
    }

    if (!formData.message) {
      newErrors.message = 'This field is required';
    }

    if (!formData.consent) {
      newErrors.consent = 'To submit this, please consent to being contacted';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Show success message
      setIsSubmitted(true);

      // Clear form data
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        queryType: '',
        message: '',
        consent: false,
      });

      // Hide success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <section>
      <div className='login-box'>
        {isSubmitted && (
          <div className='success-message'>
            {/* Success Icon (SVG or FontAwesome) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              width="24px"
              height="24px"
              className='success-icon'
            >
              <path d="M12 0C5.372 0 0 5.372 0 12c0 6.627 5.372 12 12 12 6.627 0 12-5.373 12-12C24 5.372 18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10zm-2-6.586L7.707 12.293l-1.414 1.414L10 17.414l7.707-7.707-1.414-1.414L10 15.414z" />
            </svg>
            <p>Message sent!</p>
            <p>Thanks for completing the form. We'll be in touch soon.</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className='many1'>
          <div className='many'>
            <h2 className='text'>Contact Us</h2>

            {/* First Name */}
            <div className='input-box'>
              <div className='all'>
                <h1>First Name <span className='text-green-600'>*</span></h1>
                <div className='name'>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  {errors.firstName && <p className='error-text'>{errors.firstName}</p>}
                </div>
              </div>

              {/* Last Name */}
              <div className='all'>
                <h1>Last Name <span className='text-green-600'>*</span></h1>
                <div className='name'>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                  {errors.lastName && <p className='error-text'>{errors.lastName}</p>}
                </div>
              </div>
            </div>

            {/* Email */}
            <div className='input-Email'>
              <div className='all'>
                <h1>Email Address <span className='text-green-600'>*</span></h1>
                <div className='nam'>
                  <input
                    className='na'
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <p className='error-text'>{errors.email}</p>}
                </div>
              </div>
            </div>

            {/* Query Type */}
            <div className='Query-box'>
              <div className='all'>
                <h1>Query Type <span className='text-green-600'>*</span></h1>
                <div className='all1'>
                  <div className='all2'>
                    <input
                      type="radio"
                      name="queryType"
                      value="General Enquiry"
                      checked={formData.queryType === 'General Enquiry'}
                      onChange={handleChange}
                    />
                    <h1>General Enquiry</h1>
                  </div>
                  <div className='all2'>
                    <input
                      type="radio"
                      name="queryType"
                      value="Specific Enquiry"
                      checked={formData.queryType === 'Specific Enquiry'}
                      onChange={handleChange}
                    />
                    <h1>Specific Enquiry</h1>
                  </div>
                </div>
                {errors.queryType && <p className='error-text'>{errors.queryType}</p>}
              </div>
            </div>

            {/* Message */}
            <div className='all'>
              <h1>Message <span className='text-green-600'>*</span></h1>
              <div>
                <textarea
                  className='larger'
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                />
                {errors.message && <p className='error-text'>{errors.message}</p>}
              </div>
            </div>

            {/* Consent */}
            <div>
              <div className='both'>
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                />
                <p className='hover:text-green-200'>I consent to being contacted by the team <span className='text-green-600'>*</span></p>
              </div>
              {errors.consent && <p className='error-text'>{errors.consent}</p>}
            </div>

            {/* Submit Button */}
            <div>
              <button className='btn' type="submit">Submit</button>
            </div>
          </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Body;
