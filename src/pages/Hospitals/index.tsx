import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { hospitals } from '../../utils/data';

export function Hospitals() {
  const [emergencyOnly, setEmergencyOnly] = useState(false);

  const filtered = useMemo(() => {
    const list = emergencyOnly ? hospitals.filter((h) => h.emergency) : [...hospitals];
    return list.sort((a, b) => a.name.localeCompare(b.name));
  }, [emergencyOnly]);

  return (
    <>
      <section className="page-head">
        <div className="container">
          <h1>Our hospitals</h1>
          <p className="lead">
            Six hospitals in six cities. Each entry gives the address, the phone
            number and whether the emergency department is open around the clock.
          </p>
          <div className="page-head__meta">
            <span>{hospitals.length} hospitals</span>
            <span>{hospitals.filter((h) => h.emergency).length} with 24-hour emergency</span>
          </div>
        </div>
      </section>

      <section className="section--tight">
        <div className="container">
          <div className="filters">
            <button
              type="button"
              className="chip"
              aria-pressed={emergencyOnly}
              onClick={() => setEmergencyOnly((v) => !v)}
            >
              Emergency only
            </button>
          </div>

          <p className="result-count" role="status">
            {filtered.length} {filtered.length === 1 ? 'hospital' : 'hospitals'}
          </p>

          <div className="rows">
            {filtered.map((hospital) => (
              <article key={hospital.id} className="row">
                <div className="row__main">
                  <h3>{hospital.name}</h3>
                  <p>{hospital.description}</p>
                  <address className="meta">{hospital.address}</address>
                  <div className="place__meta mt-sm">
                    <a href={`tel:${hospital.phone.replace(/\s/g, '')}`}>{hospital.phone}</a>
                    <span>{hospital.emergency ? '24-hour emergency' : 'No emergency department'}</span>
                  </div>
                </div>
                <div className="row__aside">
                  <p className="meta">{hospital.specializations.join(' · ')}</p>
                </div>
                <div className="row__end">
                  <Link to="/book-appointment" className="btn btn--sm">Book</Link>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="empty-state">
              <p>No hospital matches that filter.</p>
              <button type="button" className="btn" onClick={() => setEmergencyOnly(false)}>Show all hospitals</button>
            </div>
          )}
        </div>
      </section>

      <section className="section band">
        <div className="container">
          <div className="head">
            <h2>Emergency care</h2>
            <p className="lead">
              The helpline routes an emergency call to the nearest hospital with an
              open emergency department.
            </p>
          </div>
          <div className="form-actions">
            <a href="tel:+9118001234567" className="btn btn--primary">Call +91 1800 123 4567</a>
            <Link to="/contact" className="btn">Hospital phone numbers</Link>
          </div>
        </div>
      </section>
    </>
  );
}
