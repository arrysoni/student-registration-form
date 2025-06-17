import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [submittedData, setSubmittedData] = useState(null);

  const onSubmit = (data) => {
    setSubmittedData(data);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)} className="registration-form">
        <label>
          Full Name:
          <input {...register('fullName', { required: 'Full name is required' })} />
          {errors.fullName && <p className="error-message">{errors.fullName.message}</p>}
        </label>

        <label>
          Email:
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email format',
              },
            })}
          />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </label>

        <label>
          Age:
          <input
            type="number"
            {...register('age', {
              required: 'Age is required',
              min: { value: 16, message: 'Must be at least 16 years old' },
            })}
          />
          {errors.age && <p className="error-message">{errors.age.message}</p>}
        </label>

        <label>
          Gender:
          <div className="radio-group">
            <label>
              <input type="radio" value="Male" {...register('gender', { required: 'Gender is required' })} />
              Male
            </label>
            <label>
              <input type="radio" value="Female" {...register('gender')} />
              Female
            </label>
          </div>
          {errors.gender && <p className="error-message">{errors.gender.message}</p>}
        </label>

        <label>
          Course:
          <select {...register('course', { required: 'Please select a course' })}>
            <option value="">Select Course</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Business">Business</option>
            <option value="Psychology">Psychology</option>
          </select>
          {errors.course && <p className="error-message">{errors.course.message}</p>}
        </label>

        <label>Interests:</label>
        <div className="checkbox-group">
          <label>
            <input type="checkbox" value="Coding" {...register('interests')} />
            Coding
          </label>
          <label>
            <input type="checkbox" value="Sports" {...register('interests')} />
            Sports
          </label>
          <label>
            <input type="checkbox" value="Music" {...register('interests')} />
            Music
          </label>
        </div>

        <button type="submit">Submit</button>
        <button type="button" onClick={() => {
          reset();
          setSubmittedData(null);
        }}>Reset</button>
      </form>

      {submittedData && (
        <div className="submitted-section">
          <h2>Submitted Information:</h2>
          <p><strong>Name:</strong> {submittedData.fullName}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Age:</strong> {submittedData.age}</p>
          <p><strong>Gender:</strong> {submittedData.gender}</p>
          <p><strong>Course:</strong> {submittedData.course}</p>
          <p><strong>Interests:</strong> {submittedData.interests?.join(', ') || 'None'}</p>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
