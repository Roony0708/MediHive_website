import { useState, type FormEvent } from 'react';

type FormValues = { name: string; email: string; phone: string; message: string };
type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = { name: '', email: '', phone: '', message: '' };

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const set = (field: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => {
        const { [field]: _removed, ...rest } = prev;
        return rest;
      });
    }
  };

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (!values.name.trim()) next.name = 'Please enter your name.';
    if (!values.email.trim()) next.email = 'Please enter your email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = 'Please enter a valid email address.';
    if (!values.message.trim()) next.message = 'Please enter a message.';
    return next;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div>
        <h2>Your message is not sent yet</h2>
        <p className="notice mt-lg">
          <strong>This form has no mailbox behind it.</strong> Nothing was delivered.
          To reach the care team now, call{' '}
          <a href="tel:+9118001234567">+91 1800 123 4567</a> or email{' '}
          <a href="mailto:care@medihive.com">care@medihive.com</a>.
        </p>
        <div className="form-actions">
          <button type="button" className="btn" onClick={() => { setValues(initialValues); setSubmitted(false); }}>
            Write another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2>Send us a message</h2>
      <p className="section-note">
        Questions about a service, a booking or your care. This form is a draft only;
        the phone and email beside it are the working channels.
      </p>
      <div className="form-grid form-grid--two mt-lg">
        <div className="field">
          <label className="label" htmlFor="cf-name">Name</label>
          <input
            id="cf-name"
            className="input"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={set('name')}
            maxLength={80}
            aria-required="true"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? 'cf-name-error' : undefined}
          />
          {errors.name && <p id="cf-name-error" className="error" role="alert">{errors.name}</p>}
        </div>
        <div className="field">
          <label className="label" htmlFor="cf-email">Email</label>
          <input
            id="cf-email"
            className="input"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={set('email')}
            maxLength={120}
            aria-required="true"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? 'cf-email-error' : undefined}
          />
          {errors.email && <p id="cf-email-error" className="error" role="alert">{errors.email}</p>}
        </div>
        <div className="field">
          <label className="label" htmlFor="cf-phone">Phone (optional)</label>
          <input
            id="cf-phone"
            className="input"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={set('phone')}
            maxLength={20}
          />
        </div>
      </div>
      <div className="field mt-lg">
        <label className="label" htmlFor="cf-message">Message</label>
        <textarea
          id="cf-message"
          className="textarea"
          value={values.message}
          onChange={set('message')}
          maxLength={1000}
          aria-required="true"
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? 'cf-message-error' : undefined}
        />
        {errors.message && <p id="cf-message-error" className="error" role="alert">{errors.message}</p>}
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn--primary">Prepare message</button>
        <a href="tel:+9118001234567" className="read-link">Or call +91 1800 123 4567</a>
      </div>
    </form>
  );
}
