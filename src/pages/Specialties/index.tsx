import { useState } from 'react';
import { Link } from 'react-router-dom';
import { doctors, specialties } from '../../utils/data';

export function Specialties() {
  const [search, setSearch] = useState('');

  const filtered = specialties.filter((sp) =>
    sp.name.toLowerCase().includes(search.toLowerCase())
  );

  const countFor = (name: string) =>
    doctors.filter((d) => d.specializations.some((s) => s.toLowerCase().includes(name.toLowerCase()))).length;

  return (
    <>
      <section className="page-head">
        <div className="container">
          <h1>Medical specialties</h1>
          <p className="lead">
            Fourteen specialties, each with its own doctors and hospital. The count
            beside each name is the number of doctors listed on this site today.
          </p>
        </div>
      </section>

      <section className="section--tight">
        <div className="container">
          <div className="filters">
            <div className="field">
              <label className="label" htmlFor="specialty-search">Search specialties</label>
              <input
                id="specialty-search"
                className="input"
                type="search"
                placeholder="e.g. cardiology"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <p className="result-count" role="status">
            {filtered.length} {filtered.length === 1 ? 'specialty' : 'specialties'}
          </p>

          <div className="rows">
            {filtered.map((sp) => {
              const count = countFor(sp.name);
              return (
                <article key={sp.id} id={sp.slug} className="row">
                  <div className="row__main">
                    <h3>{sp.name}</h3>
                    <p>{sp.description}</p>
                  </div>
                  <div className="row__aside">
                    <p className="meta">
                      {count === 0 ? 'No doctors listed yet' : `${count} ${count === 1 ? 'doctor' : 'doctors'} listed`}
                    </p>
                  </div>
                  <div className="row__end">
                    <Link to={`/doctors?specialty=${encodeURIComponent(sp.name)}`} className="btn btn--sm">
                      See doctors
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="empty-state">
              <p>No specialty matches &ldquo;{search}&rdquo;.</p>
              <button type="button" className="btn" onClick={() => setSearch('')}>Clear search</button>
            </div>
          )}
        </div>
      </section>

      <section className="section band">
        <div className="container">
          <div className="head">
            <h2>Not sure where to start?</h2>
            <p className="lead">
              A general checkup is the usual first step when the symptom does not
              clearly belong to one specialty.
            </p>
          </div>
          <div className="form-actions">
            <Link to="/book-appointment" className="btn btn--primary">Book a general checkup</Link>
            <a href="tel:+9118001234567" className="btn">Call the helpline</a>
          </div>
        </div>
      </section>
    </>
  );
}
