import { Link } from 'react-router-dom';

const sections = [
  { id: 'acceptance', title: '1. Acceptance of Terms' },
  { id: 'services', title: '2. Services Description' },
  { id: 'responsibilities', title: '3. User Responsibilities' },
  { id: 'appointments', title: '4. Appointments and Cancellations' },
  { id: 'telemedicine', title: '5. Telemedicine Terms' },
  { id: 'payment', title: '6. Payment Terms' },
  { id: 'intellectual', title: '7. Intellectual Property' },
  { id: 'liability', title: '8. Limitation of Liability' },
  { id: 'termination', title: '9. Termination' },
  { id: 'governing', title: '10. Governing Law' },
  { id: 'contact-terms', title: '11. Contact Information' },
];

export function Terms() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <h1>Terms of service</h1>
          <p className="lead mt-lg">Last updated: January 1, 2026</p>
        </div>
      </section>

      <section className="section--tight">
        <div className="container legal-layout">
          <aside className="legal-toc">
            <h2>Contents</h2>
            <nav aria-label="Table of contents">
              <ol>
                {sections.map((s) => (
                  <li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="prose">
      <section id="acceptance">
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing or using the MediHive Healthcare website, mobile application, or any of our services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not access or use our services.</p>
          <p>These terms constitute a legally binding agreement between you (&ldquo;User,&rdquo; &ldquo;Patient,&rdquo; or &ldquo;you&rdquo;) and MediHive Healthcare Pvt. Ltd. (&ldquo;MediHive,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). Please read these terms carefully before using our platform.</p>
          <p>We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of our services following any changes constitutes acceptance of the modified terms.</p>
      </section>

      <section id="services">
          <h2>2. Services Description</h2>
          <p>MediHive Healthcare provides a comprehensive healthcare platform that includes:</p>
          <ul>
            <li>Online appointment booking and management</li>
            <li>In-person consultations with healthcare providers</li>
            <li>Telemedicine and video consultations</li>
            <li>Diagnostic test booking and report delivery</li>
            <li>Health checkup packages</li>
            <li>Pharmacy services and medicine delivery</li>
            <li>Health information and educational content</li>
            <li>Electronic health record management</li>
          </ul>
          <p>Our services are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. While we strive to ensure uninterrupted access, we do not guarantee that our services will be available at all times without interruption or error.</p>
      </section>

      <section id="responsibilities">
          <h2>3. What you agree to</h2>
          <p>As a user of our platform, you agree to:</p>
          <ul>
            <li>Provide accurate, complete, and up-to-date personal and medical information</li>
            <li>Maintain the confidentiality of your account credentials</li>
            <li>Notify us immediately of any unauthorized use of your account</li>
            <li>Use our services only for lawful purposes and in accordance with these terms</li>
            <li>Not attempt to disrupt, damage, or impair our platform or its security</li>
            <li>Not misuse our services for fraudulent activities or misrepresentation</li>
            <li>Respect the privacy and confidentiality of other patients</li>
            <li>Follow the instructions and advice provided by our healthcare professionals</li>
          </ul>
          <p>You are solely responsible for the accuracy of information you provide. MediHive is not liable for any issues arising from inaccurate or incomplete information provided by you.</p>
      </section>

      <section id="appointments">
          <h2>4. Appointments and Cancellations</h2>
          <p>Our appointment and cancellation policies are as follows:</p>
          <ul>
            <li><strong>Booking:</strong> Appointments can be booked online, by phone, or in person. You will receive a confirmation with appointment details.</li>
            <li><strong>Cancellation:</strong> Appointments may be cancelled up to 4 hours before the scheduled time without charge. Late cancellations or no-shows may be subject to a cancellation fee.</li>
            <li><strong>Rescheduling:</strong> You may reschedule an appointment up to 24 hours in advance subject to doctor availability.</li>
            <li><strong>Late Arrival:</strong> If you arrive more than 15 minutes late, we reserve the right to reschedule your appointment.</li>
            <li><strong>Doctor Availability:</strong> While we strive to ensure doctor availability, we reserve the right to reschedule appointments in case of emergencies or unforeseen circumstances.</li>
          </ul>
      </section>

      <section id="telemedicine">
          <h2>5. Telemedicine Terms</h2>
          <p>By using our telemedicine services, you acknowledge and agree to the following:</p>
          <ul>
            <li>Telemedicine consultations are not a substitute for in-person medical examinations in all cases.</li>
            <li>In emergencies, you should call emergency services (e.g., 108 or 102) immediately rather than using telemedicine.</li>
            <li>You must be physically located in India at the time of the consultation.</li>
            <li>You are responsible for ensuring a stable internet connection and appropriate environment for the consultation.</li>
            <li>Video consultations may be recorded for quality assurance and medical record purposes, subject to your consent.</li>
            <li>The prescribing of medications via telemedicine is at the doctor&rsquo;s discretion and subject to applicable regulations.</li>
            <li>Certain conditions may require in-person evaluation, and the doctor may recommend an in-person visit.</li>
          </ul>
      </section>

      <section id="payment">
          <h2>6. Payment Terms</h2>
          <p>Our payment policies include:</p>
          <ul>
            <li>Consultation fees are as displayed at the time of booking.</li>
            <li>Payments can be made via credit/debit cards, UPI, net banking, or cash at the hospital.</li>
            <li>Insurance claims are processed in accordance with your insurance policy terms.</li>
            <li>All prices are in Indian Rupees (INR) and include applicable taxes unless stated otherwise.</li>
            <li>Refunds, if applicable, will be processed within 7-10 business days to the original payment method.</li>
            <li>We reserve the right to modify fees with prior notice. Booked appointments are honored at the original fee.</li>
          </ul>
      </section>

      <section id="intellectual">
          <h2>7. Intellectual Property</h2>
          <p>All content on our platform, including but not limited to text, graphics, logos, images, software, and trademarks, is the property of MediHive Healthcare or its licensors and is protected by applicable intellectual property laws.</p>
          <p>You may not reproduce, distribute, modify, create derivative works from, or exploit any content from our platform without our prior written consent. You are granted a limited, non-exclusive, non-transferable license to access and use our platform for personal, non-commercial purposes.</p>
      </section>

      <section id="liability">
          <h2>8. Limitation of Liability</h2>
          <p>To the maximum extent permitted by applicable law, MediHive Healthcare, its affiliates, officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of our services.</p>
          <p>This includes, but is not limited to, damages for loss of profits, data, goodwill, or other intangible losses, even if we have been advised of the possibility of such damages. Our total liability for any claim arising from these terms shall not exceed the amount paid by you for the specific service giving rise to the claim.</p>
          <p>Medical advice and treatment decisions are the sole responsibility of the licensed healthcare provider. MediHive acts as a facilitator and does not practice medicine or provide medical diagnoses.</p>
      </section>

      <section id="termination">
          <h2>9. Termination</h2>
          <p>We reserve the right to suspend or terminate your access to our services at any time, without prior notice, for conduct that we believe violates these terms or is harmful to other users, third parties, or our business interests.</p>
          <p>Upon termination, your right to use our services will immediately cease. Sections 7 (Intellectual Property), 8 (Limitation of Liability), 10 (Governing Law), and 11 (Contact Information) shall survive termination.</p>
      </section>

      <section id="governing">
          <h2>10. Governing Law</h2>
          <p>These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.</p>
          <p>In the event of any dispute, we encourage you to first contact us to seek a resolution. If the dispute cannot be resolved informally, it shall be referred to arbitration in accordance with the Arbitration and Conciliation Act, 1996.</p>
      </section>

      <section id="contact-terms">
          <h2>11. Contact Information</h2>
          <p>If you have any questions, concerns, or inquiries regarding these Terms of Service, please contact us:</p>
          <p><strong>MediHive Healthcare Pvt. Ltd.</strong><br />
          Email: legal@medihive.com<br />
          Phone: +91 22 6789 1000<br />
          Address: Andheri East, Mumbai - 400069, Maharashtra, India</p>
          <p>For legal notices, please send correspondence to our registered office address marked &ldquo;Attention: Legal Department.&rdquo;</p>
      </section>

          </div>
        </div>
      </section>

      <section className="section band">
        <div className="container">
          <div className="head">
            <h2>Questions about these terms?</h2>
            <p className="lead">Write to the legal department at the registered office.</p>
          </div>
          <div className="form-actions">
            <Link to="/contact" className="btn btn--primary">Contact us</Link>
            <Link to="/privacy" className="btn">Privacy policy</Link>
          </div>
        </div>
      </section>
    </>
  );
}
