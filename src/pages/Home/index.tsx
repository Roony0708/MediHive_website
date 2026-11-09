import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { doctors, hospitals, healthPackages, services, specialties } from '../../utils/data';
import { formatCurrency } from '../../utils/helpers';

const featured = doctors.slice(0, 4);
const popularPackages = healthPackages.filter((p) => p.popular).slice(0, 3);

export function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [specialty, setSpecialty] = useState('');

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    if (specialty) params.set('specialty', specialty);
    const search = params.toString();
    navigate(search ? `/doctors?${search}` : '/doctors');
  };

  return (
    <>
      <section className="hero-index" aria-labelledby="hero-title">
        <div className="container">
          <div className="hero-index__head">
            <h1 id="hero-title">Healthcare that feels human.</h1>
            <div>
              <p className="lead">
                See the doctor, the hospital and the fee before you book. Fourteen
                specialists across six hospitals in India.
              </p>
              <div className="hero-index__actions">
                <Link to="/book-appointment" className="btn btn--primary">Book an appointment</Link>
                <a href="tel:+9118001234567" className="btn">Call +91 1800 123 4567</a>
              </div>
            </div>
          </div>

          <form className="filters" role="search" onSubmit={onSearch}>
            <div className="field">
              <label className="label" htmlFor="hero-q">Doctor, hospital or specialty</label>
              <input
                id="hero-q"
                className="input"
                type="search"
                placeholder="e.g. cardiologist, Mumbai"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="field">
              <label className="label" htmlFor="hero-specialty">Specialty</label>
              <select
                id="hero-specialty"
                className="select"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
              >
                <option value="">Any specialty</option>
                {specialties.map((s) => (
                  <option key={s.id} value={s.name}>{s.name}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn--primary">Find a doctor</button>
          </form>

          <div className="directory directory--hero">
            {featured.map((doctor) => (
              <article key={doctor.id} className="doctor">
                <div className="doctor__id">
                  <h3><Link to="/doctors">{doctor.name}</Link></h3>
                  <p className="meta">{doctor.title}</p>
                </div>
                <div className="doctor__facts">
                  <p>{doctor.hospital}</p>
                  <p>{doctor.availability}</p>
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

          <p className="section-note">
            <Link to="/doctors">All {doctors.length} doctors</Link>
            {' · '}
            <Link to="/specialties">Browse by specialty</Link>
            {' · '}
            <Link to="/hospitals">See the hospitals</Link>
          </p>
        </div>
      </section>

      <section className="section--tight" aria-label="MediHive at a glance">
        <div className="container">
          <div className="figures figures--3">
            <div className="figure">
              <b>{doctors.length}</b>
              <span>Specialist doctors, with fee and availability listed</span>
            </div>
            <div className="figure">
              <b>{hospitals.length}</b>
              <span>Hospitals in Mumbai, Delhi, Bangalore, Hyderabad, Pune and Chennai</span>
            </div>
            <div className="figure">
              <b>{healthPackages.length}</b>
              <span>Health checkup packages, tests and prices shown</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="place-title">
        <div className="container">
          <div className="split">
            <div className="split__text">
              <h2 id="place-title">Six hospitals, one place to start.</h2>
              <p className="lead lead--tight">
                Each hospital has its own team, address and outpatient hours. Pick the
                one nearest to you, or ask the helpline which doctor is available.
              </p>
              <p className="mt-lg">
                <Link to="/hospitals" className="read-link">Hospital addresses and phone numbers</Link>
              </p>
            </div>
            <figure className="split__media">
              <div className="photo photo--wide">
                <img
                  src="/photos/hospital-corridor.jpg"
                  alt="A hospital corridor with daylight from a row of windows"
                  width={1920}
                  height={1613}
                />
              </div>
              <figcaption className="caption">
                Photograph by Friedrich Haag, CC BY-SA 4.0, via Wikimedia Commons.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section band" aria-labelledby="services-title">
        <div className="container">
          <div className="head">
            <h2 id="services-title">What we treat</h2>
            <p className="lead">
              Fourteen services, from a general checkup to cancer care. Every service
              page names the specialties and the doctors behind it.
            </p>
          </div>
          <ul className="link-index">
            {services.map((service) => (
              <li key={service.id}>
                <Link to={`/services#${service.slug}`}>{service.title}</Link>
              </li>
            ))}
          </ul>
          <p className="section-note">
            <Link to="/services">All services</Link>
            {' · '}
            <Link to="/specialties">All {specialties.length} specialties</Link>
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="packages-title">
        <div className="container">
          <div className="head">
            <h2 id="packages-title">Health packages, priced up front</h2>
            <p className="lead">
              Screening packages with the tests listed and the duration stated, so you
              know what the day costs before you arrive.
            </p>
          </div>
          <table className="table">
            <caption>Popular packages. Prices are per person.</caption>
            <thead>
              <tr>
                <th scope="col">Package</th>
                <th scope="col">Tests</th>
                <th scope="col">Duration</th>
                <th scope="col" className="num">Price</th>
              </tr>
            </thead>
            <tbody>
              {popularPackages.map((pack) => (
                <tr key={pack.id}>
                  <th scope="row">{pack.name}</th>
                  <td data-label="Tests">{pack.tests.length} tests</td>
                  <td data-label="Duration">{pack.duration}</td>
                  <td className="num" data-label="Price">
                    <span className="price">{formatCurrency(pack.price)}</span>{' '}
                    <span className="strike">{formatCurrency(pack.originalPrice)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="section-note">
            <Link to="/health-packages">All {healthPackages.length} packages</Link>
          </p>
        </div>
      </section>

      <section className="section band" aria-labelledby="hospitals-title">
        <div className="container">
          <div className="head">
            <h2 id="hospitals-title">Where we are</h2>
            <p className="lead">
              Addresses and phone numbers for every hospital, plus whether the
              emergency department is open around the clock.
            </p>
          </div>
          <div>
            {hospitals.map((hospital) => (
              <article key={hospital.id} className="place">
                <h3><Link to="/hospitals">{hospital.name}</Link></h3>
                <address>{hospital.address}</address>
                <div className="place__meta">
                  <a href={`tel:${hospital.phone.replace(/\s/g, '')}`}>{hospital.phone}</a>
                  <span>{hospital.emergency ? '24-hour emergency' : 'No emergency department'}</span>
                </div>
              </article>
            ))}
          </div>
          <p className="section-note">
            <Link to="/hospitals">Hospital details and specialties</Link>
          </p>
        </div>
      </section>

      <section className="section band--ink" aria-labelledby="close-title">
        <div className="container">
          <div className="grid grid--3 align-start">
            <div>
              <h2 id="close-title">Book an appointment</h2>
              <p className="lead lead--tight">
                Choose a doctor, a date and a time. The fee is shown before you
                confirm, and you can call if you would rather speak to someone.
              </p>
              <div className="hero-index__actions">
                <Link to="/book-appointment" className="btn btn--primary">Start a booking</Link>
                <a href="tel:+9118001234567" className="btn">Call the helpline</a>
              </div>
            </div>
            <div>
              <h3>Address</h3>
              <p className="mt-sm">
                MediHive Health City
                <br />
                Mumbai, India
              </p>
            </div>
            <div>
              <h3>Hours</h3>
              <p className="mt-sm">
                Visiting: 10am to 12pm, and 4pm to 7pm
                <br />
                Emergency: 24 hours, every day
                <br />
                Appointments: see each doctor&rsquo;s availability
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
