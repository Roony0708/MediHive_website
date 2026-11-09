import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { SEO } from '../components/ui/SEO';

const Home = lazy(() => import('../pages/Home').then(m => ({ default: m.Home })));
const About = lazy(() => import('../pages/About').then(m => ({ default: m.About })));
const Doctors = lazy(() => import('../pages/Doctors').then(m => ({ default: m.Doctors })));
const Services = lazy(() => import('../pages/Services').then(m => ({ default: m.Services })));
const Specialties = lazy(() => import('../pages/Specialties').then(m => ({ default: m.Specialties })));
const Hospitals = lazy(() => import('../pages/Hospitals').then(m => ({ default: m.Hospitals })));
const HealthPackages = lazy(() => import('../pages/HealthPackages').then(m => ({ default: m.HealthPackages })));
const Blog = lazy(() => import('../pages/Blog').then(m => ({ default: m.Blog })));
const BlogPost = lazy(() => import('../pages/Blog/BlogPost').then(m => ({ default: m.BlogPost })));
const Contact = lazy(() => import('../pages/Contact').then(m => ({ default: m.Contact })));
const Booking = lazy(() => import('../pages/Booking').then(m => ({ default: m.Booking })));
const Privacy = lazy(() => import('../pages/Privacy').then(m => ({ default: m.Privacy })));
const Terms = lazy(() => import('../pages/Terms').then(m => ({ default: m.Terms })));
const FAQ = lazy(() => import('../pages/FAQ').then(m => ({ default: m.FAQ })));

const pages: Record<string, { title: string; description: string }> = {
  '/': { title: 'Healthcare that feels human', description: 'Find a doctor, compare fees and book a visit at one of six MediHive hospitals in India. Every doctor lists the hospital, the hours and the fee.' },
  '/about': { title: 'About Us', description: 'MediHive is a hospital group in India founded in 2010, with six hospitals and fourteen specialties. The fee and the doctor are visible before you book.' },
  '/doctors': { title: 'Find a Doctor', description: 'Browse the MediHive doctor directory by specialty and hospital. Each entry gives the fee, the languages spoken and the clinic hours.' },
  '/services': { title: 'Our Services', description: 'Fourteen services, from a general checkup to cancer care, each with the specialty behind it and the doctors who practise it.' },
  '/specialties': { title: 'Medical Specialties', description: 'Fourteen medical specialties, with the number of listed doctors in each and a link to their entries.' },
  '/hospitals': { title: 'Our Hospitals', description: 'Six hospitals in six cities, with addresses, phone numbers and whether the emergency department stays open around the clock.' },
  '/health-packages': { title: 'Health Checkup Packages', description: 'Nine screening packages with every test listed, the time each takes and the price per person.' },
  '/blog': { title: 'Health Notes', description: 'Articles written by the MediHive doctors on the conditions they treat and the questions they hear most.' },
  '/contact': { title: 'Contact Us', description: 'Call the MediHive helpline, write to the care team or find the nearest hospital with its phone number and visiting hours.' },
  '/book-appointment': { title: 'Book Appointment', description: 'Choose a doctor, a date and a time at a MediHive hospital. The request is prepared on this page and confirmed by phone.' },
  '/privacy': { title: 'Privacy Policy', description: 'How MediHive collects, uses, stores and shares personal and medical information.' },
  '/terms': { title: 'Terms of Service', description: 'The terms that govern the use of the MediHive website and services.' },
  '/faq': { title: 'Questions and Answers', description: 'Answers on appointments, reports, insurance and visiting hours in the words the hospitals use.' },
};

function NotFound() {
  return (
    <section className="page-head">
      <div className="container">
        <h1>Page not found</h1>
        <p className="lead">This address does not match a page on the site.</p>
        <p className="page-head__meta"><Link to="/" className="read-link">Back to the home page</Link></p>
      </div>
    </section>
  );
}

export function AppRouter() {
  const { pathname: route } = useLocation();
  const meta = route.startsWith('/blog/') ? pages['/blog'] : pages[route] || pages['/'];

  return (
    <>
      <SEO title={meta.title} description={meta.description} url={`https://medihive.com${route}`} />
      <Suspense fallback={<div className="router-fallback" role="status" aria-label="Loading page">Loading…</div>}>
        <Routes>
          <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="services" element={<Services />} />
          <Route path="specialties" element={<Specialties />} />
          <Route path="hospitals" element={<Hospitals />} />
          <Route path="health-packages" element={<HealthPackages />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="contact" element={<Contact />} />
          <Route path="book-appointment" element={<Booking />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        </Routes>
      </Suspense>
    </>
  );
}
