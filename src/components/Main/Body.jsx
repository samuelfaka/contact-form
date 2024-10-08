import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './Body.css';

const Body = () => {
  const form = useRef();
  const [messageStatus, setMessageStatus] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    const formData = new FormData(form.current);
    if (!formData.get("firstName")) {
      errors.firstName = "First name is required";
    }
    if (!formData.get("lastName")) {
      errors.lastName = "Last name is required";
    }
    if (!formData.get("email")) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.get("email"))) {
      errors.email = "Email is not valid";
    }
    if (!formData.get("message")) {
      errors.message = "Message is required";
    }
    if (!formData.get("consent")) {
      errors.consent = "You must give consent";
    }
    return errors;
  };

  const sendEmail = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    emailjs
      .sendForm('service_mmjyark', 'template_qon7ot9', form.current, 'Njpz7WE9HK6AEhhyO')
      .then(
        (result) => {
          console.log(result.text);
          setMessageStatus('success');
        },
        (error) => {
          console.log(error.text);
          setMessageStatus('error');
        }
      );
    form.current.reset();
    setFormErrors({});
  };

  return (
    <section>
      <div className='login-box'>
        <form ref={form} onSubmit={sendEmail}>
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
                    />
                    {formErrors.firstName && <p className="error-message">{formErrors.firstName}</p>}
                  </div>
                </div>

                {/* Last Name */}
                <div className='all'>
                  <h1>Last Name <span className='text-green-600'>*</span></h1>
                  <div className='name'>
                    <input
                      type="text"
                      name="lastName"
                    />
                    {formErrors.lastName && <p className="error-message">{formErrors.lastName}</p>}
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
                      type="email"
                      name="email"
                    />
                    {formErrors.email && <p className="error-message">{formErrors.email}</p>}
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
                      />
                      <h1>General Enquiry</h1>
                    </div>
                    <div className='all2'>
                      <input
                        type="radio"
                        name="queryType"
                        value="Specific Enquiry"
                      />
                      <h1>Specific Enquiry</h1>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className='all'>
                <h1>Message <span className='text-green-600'>*</span></h1>
                <div>
                  <textarea
                    className='larger'
                    name="message"
                  />
                  {formErrors.message && <p className="error-message">{formErrors.message}</p>}
                </div>
              </div>

              {/* Consent */}
              <div>
                <div className='both'>
                  <input
                    type="checkbox"
                    name="consent"
                  />
                  <p className='hover:text-green-200'>
                    I consent to being contacted by the team <span className='text-green-600'>*</span>
                  </p>
                  {formErrors.consent && <p className="error-message">{formErrors.consent}</p>}
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button className='btn' type="submit">Submit</button>
              </div>

              {/* Notification Messages */}
              {messageStatus === 'success' && (
                <div className="success-notification">
                  <p>Your message has been sent successfully!</p>
                </div>
              )}
              {messageStatus === 'error' && (
                <div className="error-notification">
                  <p>There was an error sending your message. Please try again later.</p>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Body;
