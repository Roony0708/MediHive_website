import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { doctors, hospitals, specialties } from '../../utils/data';
import { formatCurrency } from '../../utils/helpers';

export function Doctors() {
  const [params] = useSearchParams();
  const [search, setSearch] = useState(params.get('q') ?? '');
  const [specialization, setSpecialization] = useState(params.get('specialty') ?? '');
  const [hospitalId, setHospitalId] = useState('');
  const [sortBy, setSortBy] = useState<'fee' | 'experience'>('experience');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return doctors
      .filter((d) => {
        const matchesQuery =
          q === '' ||
          d.name.toLowerCase().includes(q) ||
          d.title.toLowerCase().includes(q) ||
          d.hospital.toLowerCase().includes(q) ||
          d.specializations.some((s) => s.toLowerCase().includes(q));
        const matchesSpecialty =
          specialization === '' ||
          d.specializations.some((s) => s.toLowerCase().includes(specialization.toLowerCase()));
        const matchesHospital = hospitalId === '' || d.hospitalId === hospitalId;
        return matchesQuery && matchesSpecialty && matchesHospital;
      })
      .sort((a, b) => (sortBy === 'fee' ? a.fee - b.fee : b.experience - a.experience));
  }, [search, specialization, hospitalId, sortBy]);

  return (
    <>
      <section className="page-head">
        <div className="container">
          <h1>Find a doctor</h1>
          <p className="lead">
            {doctors.length} specialists across {hospitals.length} hospitals. Each listing
            shows the hospital, the hours and the consultation fee.
          </p>
          <div className="page-head__meta">
            <span>{doctors.length} doctors</span>
            <span>{specialties.length} specialties</span>
            <a href="tel:+9118001234567" className="read-link">Helpline +91 1800 123 4567</a>
          </div>
        </div>
      </section>

      <section className="section--tight">
        <div className="container">
          <form className="filters" role="search" onSubmit={(e) => e.preventDefault()}>
            <div className="field">
              <label className="label" htmlFor="doctor-search">Search</label>
              <input
                id="doctor-search"
                className="input"
                type="search"
                placeholder="Name, specialty or hospital"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="field">
              <label className="label" htmlFor="doctor-specialty">Specialty</label>
              <select
                id="doctor-specialty"
                className="select"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
              >
                <option value="">Any specialty</option>
                {specialties.map((s) => (
                  <option key={s.id} value={s.name}>{s.name}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label className="label" htmlFor="doctor-hospital">Hospital</label>
              <select
                id="doctor-hospital"
                className="select"
                value={hospitalId}
                onChange={(e) => setHospitalId(e.target.value)}
              >
                <option value="">Any hospital</option>
                {hospitals.map((h) => (
                  <option key={h.id} value={h.id}>{h.name}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label className="label" htmlFor="doctor-sort">Sort</label>
              <select
                id="doctor-sort"
                className="select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'fee' | 'experience')}
              >
                <option value="experience">Most experience</option>
                <option value="fee">Lowest fee</option>
              </select>
            </div>
          </form>

          <p className="result-count" role="status">
            {filtered.length} {filtered.length === 1 ? 'doctor' : 'doctors'}
          </p>

          <div className="directory">
            {filtered.map((doctor) => (
              <article key={doctor.id} className="doctor">
                <div className="doctor__id">
                  <h3><Link to="/doctors">{doctor.name}</Link></h3>
                  <p className="meta">{doctor.title}</p>
                  <p className="meta">{doctor.experience} years in practice</p>
                </div>
                <div className="doctor__facts">
                  <p>{doctor.hospital}</p>
                  <p>{doctor.availability}</p>
                  <p className="meta">{doctor.languages.join(', ')}</p>
                </div>
                <div className="doctor__fee">
                  <span className="price">{formatCurrency(doctor.fee)}</span>
                  <small>consultation</small>
                </div>
                <div className="doctor__act">
                  <Link to={`/book-appointment?doctor=${doctor.id}`} className="btn btn--sm">Book</Link>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="empty-state">
              <p>No doctors match these filters.</p>
              <button
                type="button"
                className="btn"
                onClick={() => { setSearch(''); setSpecialization(''); setHospitalId(''); }}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
