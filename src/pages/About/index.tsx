import { Link } from 'react-router-dom';
import { doctors, hospitals } from '../../utils/data';

const values = [
  {
    title: 'Compassion',
    desc: 'We treat every patient with empathy, dignity and respect, at every step of the journey.',
  },
  {
    title: 'Innovation',
    desc: 'We adopt new medical technology and revise our practice when the evidence asks us to.',
  },
  {
    title: 'Excellence',
    desc: 'We hold our care to measurable standards and review outcomes rather than assume them.',
  },
  {
    title: 'Integrity',
    desc: 'We publish the fee, name the doctor and state what a package includes.',
  },
];

const leadership = [doctors[0], doctors[1], doctors[2], doctors[5]];

export function About() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <h1>About MediHive</h1>
          <p className="lead">
            A small hospital group in India with a simple rule: the doctor, the
            hospital and the fee are visible before you book.
          </p>
          <div className="page-head__meta">
            <span>{doctors.length} doctors</span>
            <span>{hospitals.length} hospitals</span>
            <span>Founded in Mumbai, 2010</span>
          </div>
        </div>
      </section>

      <section className="section--tight">
        <div className="container">
          <div className="grid grid--2">
            <div>
              <h2>Our mission</h2>
              <p className="mt-lg">
                To provide compassionate, high-quality healthcare that is accessible
                to every individual, regardless of their background. We work to close
                the gap between advanced medical technology and patient-centred care,
                so the best outcome is also the clearest one to reach.
              </p>
            </div>
            <div>
              <h2>Our vision</h2>
              <p className="mt-lg">
                To be India&rsquo;s most trusted healthcare partner, setting the
                standard for medical excellence, innovation and patient satisfaction.
                We believe quality healthcare is not a luxury but a right.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="container">
          <div className="split">
            <div className="split__text">
              <h2>Our story</h2>
              <p className="mt-lg">
                MediHive was born in 2010 from an idea that everyone deserves access
                to good healthcare regardless of where they live or what they can
                afford. A group of doctors and healthcare professionals started with a
                clinic in Mumbai.
              </p>
              <p className="mt-lg">
                Over the years that clinic grew into six hospitals with specialised
                centres and a digital platform that lists every doctor on this site.
                The work is still clinical excellence, continuous improvement and the
                belief that care should be compassionate above all else.
              </p>
              <p className="mt-lg">
                <Link to="/hospitals" className="read-link">See the six hospitals</Link>
              </p>
            </div>
            <figure className="split__media">
              <div className="photo photo--tall">
                <img
                  src="/photos/stethoscope-hands.jpg"
                  alt="A clinician holding a stethoscope"
                  width={1920}
                  height={1280}
                />
              </div>
              <figcaption className="caption">
                Photograph by Alex Proimos, CC BY 2.0, via Wikimedia Commons.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="head">
            <h2>Our values</h2>
            <p className="lead">The principles that guide everything we do at MediHive.</p>
          </div>
          <div className="grid grid--2">
            {values.map((value) => (
              <article key={value.title} className="service">
                <h3>{value.title}</h3>
                <p>{value.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="container">
          <div className="head">
            <h2>Meet the leadership</h2>
            <p className="lead">
              Four of the doctors on the panel. Each entry shows the hospital and the
              hours they hold clinic.
            </p>
          </div>
          <div className="rows">
            {leadership.map((doctor) => (
              <article key={doctor.id} className="row">
                <div className="row__main">
                  <h3><Link to="/doctors">{doctor.name}</Link></h3>
                  <p>{doctor.title}</p>
                </div>
                <div className="row__aside">
                  <p>{doctor.hospital}</p>
                  <p className="meta">{doctor.availability}</p>
                </div>
                <div className="row__end">
                  <Link to={`/book-appointment?doctor=${doctor.id}`} className="btn btn--sm">Book</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="head">
            <h2>Work with us</h2>
            <p className="lead">
              We are always looking for doctors who want to practise with the fee and
              the hours in plain sight.
            </p>
          </div>
          <div className="form-actions">
            <Link to="/contact" className="btn btn--primary">Contact the team</Link>
            <Link to="/doctors" className="btn">Meet the doctors</Link>
          </div>
        </div>
      </section>
    </>
  );
}
