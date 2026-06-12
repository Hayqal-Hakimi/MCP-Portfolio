import React, { useState } from 'react';
import { useToast } from './Toast';

export default function ContactForm() {
  const addToast = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'consulting',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) {
      tempErrors.name = 'Identifier (Name) is required';
    }
    
    if (!formData.email.trim()) {
      tempErrors.email = 'Return Address (Email) is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        tempErrors.email = 'Valid return address is required';
      }
    }

    if (!formData.message.trim()) {
      tempErrors.message = 'Payload (Message) is required';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear error for field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      addToast('Validation failure: Check incident report.', 'error');
      return;
    }

    setIsSubmitting(true);
    const apiUrl = import.meta.env.VITE_API_URL || '';

    try {
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        addToast('Transmission sent successfully. Connection established.', 'success');
        setFormData({
          name: '',
          email: '',
          topic: 'consulting',
          message: ''
        });
      } else {
        throw new Error('API server returned error code');
      }
    } catch (err) {
      console.error(err);
      addToast('Connection failed. API Gateway timed out.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Alias */}
        <div className="form-group">
          <label className="form-label" htmlFor="name">Alias (Name)</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Jane Doe"
            className="form-control"
            style={{ borderColor: errors.name ? 'var(--error)' : 'var(--whisper-border)' }}
          />
          {errors.name && <span className="form-error">{errors.name}</span>}
        </div>

        {/* Email */}
        <div className="form-group">
          <label className="form-label" htmlFor="email">Comm Link (Email)</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="jane@company.com"
            className="form-control"
            style={{ borderColor: errors.email ? 'var(--error)' : 'var(--whisper-border)' }}
          />
          {errors.email && <span className="form-error">{errors.email}</span>}
        </div>
      </div>

      {/* Incident Type */}
      <div className="form-group">
        <label className="form-label" htmlFor="topic">Incident Type (Topic)</label>
        <select
          id="topic"
          name="topic"
          value={formData.topic}
          onChange={handleChange}
          className="form-control"
          style={{ cursor: 'pointer' }}
        >
          <option value="consulting">Architecture Consulting</option>
          <option value="freelance">Freelance Implementation</option>
          <option value="audit">Infrastructure Audit</option>
          <option value="other">Other Inquiry</option>
        </select>
      </div>

      {/* Message */}
      <div className="form-group">
        <label className="form-label" htmlFor="message">Payload (Message)</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          placeholder="Describe your infrastructure needs..."
          className="form-control"
          style={{ borderColor: errors.message ? 'var(--error)' : 'var(--whisper-border)' }}
        ></textarea>
        {errors.message && <span className="form-error">{errors.message}</span>}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
          style={{ opacity: isSubmitting ? 0.7 : 1 }}
        >
          {isSubmitting ? 'Transmitting...' : 'Execute Request'}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    </form>
  );
}
