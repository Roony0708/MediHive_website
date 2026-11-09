import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { doctors, specialties } from '../../utils/data';
import { formatCurrency } from '../../utils/helpers';

type FormData = {
  name: string;
  email: string;
  phone: string;
  age: string;
  gender: string;
  address: string;
  notes: string;
};

const emptyForm: FormData = {
  name: '',
  email: '',
  phone: '',
  age: '',
  gender: '',
  address: '',
  notes: '',
};

export function Booking() {
  const [params] = useSearchParams();
  const preSelected = params.get('doctor');
  const [step, setStep] = useState(preSelected && doctors.some((d) => d.id === preSelected) ? 2 : 1);
  const [selectedSpec, setSelectedSpec] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(
    preSelected && doctors.some((d) => d.id === preSelected) ? preSelected : null
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  const filtered = selectedSpec
    ? doctors.filter((d) => d.specializations.some((s) => s.toLowerCase().includes(selectedSpec.toLowerCase())))
    : doctors;
  const doctor = selectedDoctor ? doctors.find((d) => d.id === selectedDoctor) : null;

  const timeSlots: string[] = [];
  for (let h = 9; h <= 17; h++) {
    for (let m = 0; m < 60; m += 30) {
      if (h === 17 && m > 0) break;
      timeSlots.push(`${h > 12 ? h - 12 : h}:${m === 0 ? '00' : '30'} ${h >= 12 ? 'PM' : 'AM'}`);
    }
  }

  const nextStep = () => {
    if (step === 1 && selectedDoctor) setStep(2);
    else if (step === 2 && selectedDate && selectedTime) setStep(3);
  };
  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const monthName = new Date(year, month).toLocaleString('default', { month: 'long' });
  const today = new Date();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: Partial<Record<string, string>> = {};
    if (!form.name.trim()) nextErrors.name = 'Full name is required.';
    if (!form.email.trim()) nextErrors.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Enter a valid email address.';
    if (!form.phone.trim()) nextErrors.phone = 'Phone number is required.';
    else if (!/^[\d+\-\s()]{7,15}$/.test(form.phone.trim())) nextErrors.phone = 'Enter a valid phone number.';
    if (!form.age.trim()) nextErrors.age = 'Age is required.';
    else if (!/^\d{1,3}$/.test(form.age.trim()) || Number(form.age) > 130) nextErrors.age = 'Enter a valid age.';
    if (!form.gender) nextErrors.gender = 'Please select a gender.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) setSubmitted(true);
  };

  if (submitted && doctor && selectedDate) {
    return (
      <section className="section">
        <div className="container">
          <div className="confirmation">
            <h1>Your request is ready, but it has not been sent.</h1>
            <p className="notice">
              <strong>This demo has no booking backend.</strong> Nothing was sent to the
              hospital and no slot is held. Call{' '}
              <a href="tel:+9118001234567">+91 1800 123 4567</a> to confirm this
              appointment with the team.
            </p>
            <div className="summary">
              <h2>Appointment</h2>
              <p>{doctor.name} · {doctor.title}</p>
              <p>{doctor.hospital}</p>
              <p>
                {selectedDate.toLocaleDateString('en-IN', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
                {' at '}
                {selectedTime}
              </p>
              <span className="price">{formatCurrency(doctor.fee)} <small>consultation</small></span>
            </div>
            <div className="form-actions">
              <a href="tel:+9118001234567" className="btn btn--primary">Call to confirm</a>
              <Link to="/doctors" className="btn">Back to doctors</Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="page-head">
        <div className="container">
          <h1>Book an appointment</h1>
          <p className="lead">
            Choose a doctor, a date and a time. Nothing is sent until the clinic
            confirms by phone.
          </p>
        </div>
      </section>

      <section className="section--tight">
        <div className="container">
          <div className="booking-grid">
            <div>
              <div className="steps" aria-label="Booking progress">
                {['Doctor', 'Date and time', 'Your details'].map((label, i) => (
                  <div key={label} className={`step${step === i + 1 ? ' is-current' : ''}`}>
                    <b>{i + 1}</b>
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              <div className="booking-panel">
                {step === 1 && (
                  <>
                    <h2>Select a doctor</h2>
                    <div className="field">
                      <label className="label" htmlFor="booking-specialty">Specialty</label>
                      <select
                        id="booking-specialty"
                        className="select"
                        value={selectedSpec}
                        onChange={(e) => {
                          setSelectedSpec(e.target.value);
                          setSelectedDoctor(null);
                        }}
                      >
                        <option value="">All specialties</option>
                        {specialties.map((s) => (
                          <option key={s.id} value={s.name}>{s.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="pick-list">
                      {filtered.map((d) => (
                        <button
                          key={d.id}
                          type="button"
                          className="pick"
                          aria-pressed={selectedDoctor === d.id}
                          onClick={() => setSelectedDoctor(d.id)}
                        >
                          <strong>{d.name}</strong>
                          <span>{formatCurrency(d.fee)}</span>
                          <span>{d.title}</span>
                          <span>{d.hospital}</span>
                        </button>
                      ))}
                    </div>
                    {filtered.length === 0 && <p className="section-note">No doctors in this specialty.</p>}
                  </>
                )}

                {step === 2 && (
                  <>
                    <h2>Select a date and time</h2>
                    <p className="notice">
                      Times shown are a preview. No slot is held until the clinic
                      confirms by phone.
                    </p>
                    <div>
                      <div className="calendar-head">
                        <button
                          type="button"
                          className="btn btn--sm"
                          aria-label="Previous month"
                          onClick={() => {
                            if (month > 0) setMonth((m) => m - 1);
                            else { setMonth(11); setYear((y) => y - 1); }
                          }}
                        >
                          <ChevronLeft size={18} aria-hidden="true" />
                        </button>
                        <strong>{monthName} {year}</strong>
                        <button
                          type="button"
                          className="btn btn--sm"
                          aria-label="Next month"
                          onClick={() => {
                            if (month < 11) setMonth((m) => m + 1);
                            else { setMonth(0); setYear((y) => y + 1); }
                          }}
                        >
                          <ChevronRight size={18} aria-hidden="true" />
                        </button>
                      </div>
                      <div className="calendar">
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                          <div key={d} className="dow">{d}</div>
                        ))}
                        {Array.from({ length: firstDay }).map((_, i) => (
                          <div key={`empty-${i}`} aria-hidden="true" />
                        ))}
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                          const day = i + 1;
                          const date = new Date(year, month, day);
                          const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
                          const isSelected = selectedDate && date.getTime() === selectedDate.getTime();
                          return (
                            <button
                              key={day}
                              type="button"
                              disabled={isPast}
                              className={`day${isSelected ? ' is-selected' : ''}`}
                              onClick={() => setSelectedDate(date)}
                            >
                              {day}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    {selectedDate && (
                      <div>
                        <p className="label">
                          Available times on{' '}
                          {selectedDate.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </p>
                        <div className="time-grid">
                          {timeSlots.map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              aria-pressed={selectedTime === slot}
                              onClick={() => setSelectedTime(slot)}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}

                {step === 3 && doctor && (
                  <>
                    <h2>Your details</h2>
                    <div className="summary">
                      <h2>Appointment</h2>
                      <p>{doctor.name} · {doctor.title}</p>
                      <p>{doctor.hospital}</p>
                      <p>
                        {selectedDate?.toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' })} at {selectedTime}
                      </p>
                      <span className="price">{formatCurrency(doctor.fee)} <small>consultation</small></span>
                    </div>
                    <form onSubmit={handleSubmit} noValidate>
                      <div className="form-grid form-grid--two">
                        {([
                          ['name', 'Full name', 'text', 'name'],
                          ['email', 'Email', 'email', 'email'],
                          ['phone', 'Phone', 'tel', 'tel'],
                          ['age', 'Age', 'number', 'age'],
                        ] as const).map(([field, label, type, autoComplete]) => (
                          <div key={field} className="field">
                            <label className="label" htmlFor={`booking-${field}`}>{label}</label>
                            <input
                              id={`booking-${field}`}
                              type={type}
                              className="input"
                              value={form[field]}
                              autoComplete={autoComplete}
                              aria-invalid={errors[field] ? true : undefined}
                              aria-describedby={errors[field] ? `booking-${field}-error` : undefined}
                              onChange={(e) => {
                                setForm((f) => ({ ...f, [field]: e.target.value }));
                                if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
                              }}
                            />
                            {errors[field] && (
                              <p className="error" id={`booking-${field}-error`} role="alert">{errors[field]}</p>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="field mt-lg">
                        <span className="label">Gender</span>
                        <div className="filter-strip">
                          {['Female', 'Male', 'Other'].map((g) => (
                            <button
                              key={g}
                              type="button"
                              className="chip"
                              aria-pressed={form.gender === g}
                              onClick={() => {
                                setForm((f) => ({ ...f, gender: g }));
                                if (errors.gender) setErrors((prev) => ({ ...prev, gender: '' }));
                              }}
                            >
                              {g}
                            </button>
                          ))}
                        </div>
                        {errors.gender && <p className="error" role="alert">{errors.gender}</p>}
                      </div>
                      <div className="form-grid mt-lg">
                        <div className="field">
                          <label className="label" htmlFor="booking-address">Address</label>
                          <textarea
                            id="booking-address"
                            className="textarea"
                            value={form.address}
                            onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                          />
                        </div>
                        <div className="field">
                          <label className="label" htmlFor="booking-notes">Notes (optional)</label>
                          <textarea
                            id="booking-notes"
                            className="textarea"
                            placeholder="Any specific concern"
                            value={form.notes}
                            onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                          />
                        </div>
                      </div>
                      <p className="notice mt-lg">
                        Submitting prepares the request only. This site is not connected
                        to the hospital, so you will still need to call the helpline.
                      </p>
                      <div className="form-actions">
                        <button type="submit" className="btn btn--primary">Submit request</button>
                      </div>
                    </form>
                  </>
                )}
              </div>

              <div className="booking-nav">
                {step > 1 ? (
                  <button type="button" className="btn" onClick={prevStep}>
                    <ChevronLeft size={18} aria-hidden="true" /> Back
                  </button>
                ) : <span />}
                {step < 3 && (
                  <button
                    type="button"
                    className="btn btn--primary"
                    onClick={nextStep}
                    disabled={(step === 1 && !selectedDoctor) || (step === 2 && (!selectedDate || !selectedTime))}
                  >
                    Next <ChevronRight size={18} aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>

            <aside className="summary">
              <h2>Summary</h2>
              {doctor ? (
                <>
                  <p>{doctor.name} · {doctor.title}</p>
                  <p>{doctor.hospital}</p>
                  <p>{doctor.availability}</p>
                  <span className="price">{formatCurrency(doctor.fee)} <small>consultation</small></span>
                </>
              ) : (
                <p>No doctor selected yet.</p>
              )}
              {selectedDate && <p>{selectedDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>}
              {selectedTime && <p>{selectedTime}</p>}
              <p className="section-note">
                <a href="tel:+9118001234567">Call +91 1800 123 4567</a>
              </p>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
