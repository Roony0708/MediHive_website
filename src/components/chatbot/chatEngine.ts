import { doctors, hospitals, healthPackages, services, specialties, faqItems } from '../../utils/data';
import { formatCurrency } from '../../utils/helpers';

type Intent = 'doctor' | 'package' | 'hospital' | 'service' | 'specialty' | 'faq' | 'greeting' | 'help' | 'unknown';

const symptomMap: Record<string, string[]> = {
  heart: ['Cardiology', 'Heart Checkup', 'Cardiac Care'],
  cardio: ['Cardiology'],
  cardiologist: ['Cardiology'],
  chest: ['Cardiology', 'Pulmonology'],
  breath: ['Cardiology', 'Pulmonology'],
  brain: ['Neurology', 'Neurology Checkup'],
  neuro: ['Neurology', 'Neurology Checkup'],
  neurologist: ['Neurology'],
  nerve: ['Neurology'],
  headache: ['Neurology', 'General Checkup'],
  migraine: ['Neurology'],
  bone: ['Orthopedics', 'Orthopedic Checkup'],
  ortho: ['Orthopedics'],
  orthopedic: ['Orthopedics'],
  joint: ['Orthopedics'],
  knee: ['Orthopedics'],
  spine: ['Orthopedics', 'Neurology'],
  back: ['Orthopedics', 'Neurology'],
  child: ['Pediatrics', 'Child Health Checkup'],
  baby: ['Pediatrics'],
  pediatrician: ['Pediatrics'],
  skin: ['Dermatology', 'Skin Checkup'],
  dermatologist: ['Dermatology'],
  rash: ['Dermatology'],
  eye: ['Ophthalmology', 'Eye Checkup'],
  vision: ['Ophthalmology'],
  ophthalmologist: ['Ophthalmology'],
  cancer: ['Oncology', 'Cancer Screening'],
  tumor: ['Oncology'],
  oncologist: ['Oncology'],
  stomach: ['Gastroenterology', 'Digestive Health Checkup'],
  digestion: ['Gastroenterology'],
  gastroenterologist: ['Gastroenterology'],
  liver: ['Gastroenterology'],
  kidney: ['Nephrology', 'Kidney Checkup'],
  nephrologist: ['Nephrology'],
  urine: ['Nephrology'],
  diabetes: ['Endocrinology', 'Diabetes Checkup'],
  endocrinologist: ['Endocrinology'],
  sugar: ['Endocrinology'],
  thyroid: ['Endocrinology'],
  lung: ['Pulmonology', 'Respiratory Checkup'],
  breathing: ['Pulmonology'],
  pulmonologist: ['Pulmonology'],
  asthma: ['Pulmonology'],
  ent: ['ENT', 'ENT Checkup'],
  ear: ['ENT'],
  throat: ['ENT'],
  hearing: ['ENT'],
  emergency: ['Emergency Care'],
  accident: ['Emergency Care', 'Orthopedics'],
  trauma: ['Emergency Care', 'Orthopedics'],
  pregnancy: ['Gynecology', 'Women Health Checkup'],
  women: ['Gynecology'],
  gynecology: ['Gynecology'],
  gynecologist: ['Gynecology'],
};

const greetingPatterns = ['hi', 'hello', 'hey', 'namaste', 'good morning', 'good evening', 'good afternoon'];
const helpPatterns = ['help', 'what can you', 'how can you', 'capabilities', 'what do you'];

const specialistSuffixes = ['ist', 'ian', 'logist'];

function tokenize(input: string): string[] {
  return input.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
}

function matchSpecialtyName(token: string): string[] {
  const matched: string[] = [];
  for (const s of specialties) {
    const name = s.name.toLowerCase();
    if (name.includes(token) || token.includes(name)) {
      matched.push(s.name);
    }
  }
  return matched;
}

function expandSpecialistToken(token: string): string[] {
  const results: string[] = [];
  for (const suffix of specialistSuffixes) {
    if (token.endsWith(suffix)) {
      const root = token.slice(0, -suffix.length);
      for (const s of specialties) {
        const name = s.name.toLowerCase();
        if (name.includes(root) || root.includes(name)) {
          results.push(s.name);
        }
      }
    }
  }
  return results;
}

function matchSpecializations(tokens: string[]): string[] {
  const matched = new Set<string>();
  for (const token of tokens) {
    if (symptomMap[token]) {
      symptomMap[token].forEach(s => matched.add(s));
    }
    const expanded = expandSpecialistToken(token);
    expanded.forEach(s => matched.add(s));
    const direct = matchSpecialtyName(token);
    direct.forEach(s => matched.add(s));
  }
  return Array.from(matched);
}

function findIntent(tokens: string[]): Intent {
  const text = tokens.join(' ');
  if (greetingPatterns.some(p => text.includes(p))) return 'greeting';
  if (helpPatterns.some(p => text.includes(p))) return 'help';

  const doctorKeywords = ['doctor', 'specialist', 'physician', 'consult', 'appointment', 'recommend', 'suggest', 'who', 'which doctor', 'best doctor'];
  const packageKeywords = ['package', 'plan', 'checkup', 'test', 'screening', 'health pack', 'which plan', 'which pack', 'full body'];
  const hospitalKeywords = ['hospital', 'clinic', 'centre', 'center', 'emergency', 'near', 'admit', 'location'];
  const serviceKeywords = ['service', 'treatment', 'procedure', 'therapy', 'facility'];
  const specialtyKeywords = ['specialty', 'specialization', 'department', 'field'];
  const findPatterns = ['find', 'show', 'search', 'looking for', 'need', 'want'];

  if (doctorKeywords.some(k => text.includes(k))) return 'doctor';
  if (packageKeywords.some(k => text.includes(k))) return 'package';
  if (hospitalKeywords.some(k => text.includes(k))) return 'hospital';
  if (serviceKeywords.some(k => text.includes(k))) return 'service';
  if (specialtyKeywords.some(k => text.includes(k))) return 'specialty';

  if (text.includes('i have') || text.includes('i am') || text.includes('i feel') || text.includes('suffer') || text.includes('suffering') || text.includes('problem') || text.includes('issue') || text.includes('pain')) {
    return 'doctor';
  }

  if (findPatterns.some(p => text.includes(p))) {
    const specs = matchSpecializations(tokens);
    if (specs.length > 0) return 'doctor';
  }

  if (tokens.some(t => symptomMap[t])) return 'doctor';

  const specs = matchSpecializations(tokens);
  if (specs.length > 0) return 'doctor';

  if (faqItems.some(f => tokens.some(t => t.length > 2 && f.question.toLowerCase().includes(t)))) return 'faq';

  return 'unknown';
}

function formatDoctorResponse(d: typeof doctors[0]): string {
  return `**Dr. ${d.name}** — ${d.title}
⭐ ${d.rating} (${d.reviewCount} reviews) | ${d.experience} years exp
📍 ${d.hospital}
💵 Fee: ${formatCurrency(d.fee)}
🕐 ${d.availability}
🎓 ${d.education}
🌐 Languages: ${d.languages.join(', ')}`;
}

function formatPackageResponse(p: typeof healthPackages[0]): string {
  const tests = p.tests.slice(0, 8).join(', ');
  const more = p.tests.length > 8 ? ` +${p.tests.length - 8} more` : '';
  return `**${p.name}** ${p.popular ? '⭐ Popular' : ''}
💵 ${formatCurrency(p.price)} (was ${formatCurrency(p.originalPrice)})
📋 Includes: ${tests}${more}
⏱ Duration: ${p.duration}
${p.description}`;
}

function formatHospitalResponse(h: typeof hospitals[0]): string {
  return `**${h.name}** ${h.emergency ? '🚨 24/7 Emergency' : ''}
⭐ ${h.rating} (${h.reviewCount} reviews)
📍 ${h.address}
📞 ${h.phone}
🏥 Specialties: ${h.specializations.slice(0, 5).join(', ')}${h.specializations.length > 5 ? ` +${h.specializations.length - 5} more` : ''}
${h.description}`;
}

function findRelevantFaq(tokens: string[]): string[] {
  const text = tokens.join(' ');
  return faqItems
    .filter(f => {
      const q = f.question.toLowerCase();
      const a = f.answer.toLowerCase();
      return tokens.some(t => t.length > 2 && (q.includes(t) || a.includes(t))) ||
        text.split(' ').some((w: string) => w.length > 3 && q.includes(w));
    })
    .map(f => `**Q:** ${f.question}\n**A:** ${f.answer}`);
}

export function processQuery(input: string): { response: string; suggestions?: string[] } {
  const tokens = tokenize(input);
  const text = tokens.join(' ');
  const intent = findIntent(tokens);

  switch (intent) {
    case 'greeting':
      return {
        response: `👋 Hello! I'm MediHive assistant. I can help you find the right doctor, health package, hospital, or answer any questions. Just tell me what you're looking for!`,
        suggestions: ['Find a cardiologist', 'Best health package', 'Hospitals with emergency', 'What services do you offer?'],
      };

    case 'help':
      return {
        response: `Here's what I can help you with:
🔍 **Find a Doctor** — "Which doctor for heart problems?"
📋 **Health Packages** — "What checkup package do you recommend?"
🏥 **Hospitals** — "Show hospitals with emergency care"
💡 **Services & Specialties** — "What treatments do you offer?"
❓ **FAQs** — "What are your visiting hours?"`,
        suggestions: ['Recommend a doctor for migraine', 'Full body checkup package', 'Emergency hospital near me'],
      };

    case 'doctor': {
      const matchedSpecs = matchSpecializations(tokens);
      let result: typeof doctors = [];

      if (matchedSpecs.length > 0) {
        result = doctors.filter(d =>
          d.specializations.some(s => matchedSpecs.some(m => s.toLowerCase().includes(m.toLowerCase())))
        );
      }

      if (result.length === 0) {
        result = doctors.filter(d =>
          tokens.some(t =>
            t.length > 2 &&
            (d.name.toLowerCase().includes(t) ||
             d.title.toLowerCase().includes(t) ||
             d.specializations.some(s => s.toLowerCase().includes(t)) ||
             d.hospital.toLowerCase().includes(t))
          )
        );
      }

      if (result.length === 0) {
        return {
          response: `I couldn't find doctors matching "${input}". Could you try describing your symptoms or the specialist you need?`,
          suggestions: ['Cardiologist', 'Neurologist', 'Pediatrician', 'Full body checkup'],
        };
      }

      const top = result.slice(0, 5);
      const header = matchedSpecs.length > 0
        ? `Here are the top doctors for **${matchedSpecs.slice(0, 3).join(', ')}**:\n\n`
        : `Here are doctors matching your query:\n\n`;

      return {
        response: header + top.map(formatDoctorResponse).join('\n\n'),
        suggestions: result.length > 5 ? [`Show all ${result.length} doctors`] : undefined,
      };
    }

    case 'package': {
      let result = [...healthPackages];

      const matchedSpecs = matchSpecializations(tokens);
      if (matchedSpecs.length > 0) {
        result = result.filter(p =>
          matchedSpecs.some(m =>
            p.name.toLowerCase().includes(m.toLowerCase()) ||
            p.description.toLowerCase().includes(m.toLowerCase()) ||
            p.tests.some(t => t.toLowerCase().includes(m.toLowerCase()))
          )
        );
      }

      if (result.length === 0) {
        result = healthPackages.filter(p =>
          tokens.some(t =>
            t.length > 2 &&
            (p.name.toLowerCase().includes(t) ||
             p.description.toLowerCase().includes(t) ||
             p.tests.some(test => test.toLowerCase().includes(t)))
          )
        );
      }

      if (result.length === 0) {
        const symptomBased = Object.keys(symptomMap).find(s => tokens.includes(s));
        if (symptomBased) {
          return {
            response: `For ${symptomBased}-related concerns, I'd recommend a consultation first. Here are our available health checkup packages:\n\n` +
              healthPackages.slice(0, 3).map(formatPackageResponse).join('\n\n'),
            suggestions: ['Tell me more about these packages', 'Find a doctor instead'],
          };
        }
        return {
          response: `Here are all our health checkup packages:\n\n${healthPackages.slice(0, 3).map(formatPackageResponse).join('\n\n')}`,
          suggestions: ['Show more packages', 'Compare packages'],
        };
      }

      return {
        response: `Here are the health packages I found:\n\n${result.slice(0, 3).map(formatPackageResponse).join('\n\n')}`,
        suggestions: result.length > 3 ? [`Show all ${result.length} packages`] : undefined,
      };
    }

    case 'hospital': {
      const hasEmergency = tokens.includes('emergency') || text.includes('24/7') || text.includes('urgent');
      let result = hasEmergency ? hospitals.filter(h => h.emergency) : [...hospitals];

      const matchedSpecs = matchSpecializations(tokens);
      if (matchedSpecs.length > 0) {
        result = result.filter(h =>
          h.specializations.some(s => matchedSpecs.some(m => s.toLowerCase().includes(m.toLowerCase())))
        );
      }

      result = result.filter(h =>
        tokens.some(t => t.length > 2 && (h.name.toLowerCase().includes(t) || h.address.toLowerCase().includes(t)))
      );

      if (result.length === 0) {
        result = hasEmergency ? hospitals.filter(h => h.emergency) : hospitals.slice(0, 3);
      }

      const header = hasEmergency
        ? 'Here are our hospitals with **24/7 Emergency** services:\n\n'
        : 'Here are our hospitals:\n\n';

      return {
        response: header + result.slice(0, 3).map(formatHospitalResponse).join('\n\n'),
        suggestions: result.length > 3 ? [`Show all ${result.length} hospitals`] : undefined,
      };
    }

    case 'service': {
      const matched = services.filter(s =>
        tokens.some(t => t.length > 2 &&
          (s.title.toLowerCase().includes(t) || s.description.toLowerCase().includes(t)))
      );
      if (matched.length === 0) {
        return {
          response: `We offer a wide range of services. Here are some of them:\n\n${services.slice(0, 6).map(s =>
            `**${s.title}** — ${s.description}`
          ).join('\n\n')}`,
          suggestions: ['Tell me about Cardiology', 'Find a doctor', 'Health checkup packages'],
        };
      }
      return {
        response: matched.slice(0, 5).map(s => `**${s.title}** — ${s.description}`).join('\n\n'),
        suggestions: ['Book an appointment', 'Find a specialist'],
      };
    }

    case 'specialty': {
      const matched = specialties.filter(s =>
        tokens.some(t => t.length > 2 && (s.name.toLowerCase().includes(t) || s.description.toLowerCase().includes(t)))
      );
      if (matched.length === 0) {
        return {
          response: `We have ${specialties.length} specialty departments. Here are some:\n\n${specialties.slice(0, 8).map(s =>
            `**${s.name}** — ${s.description} (${s.doctorCount} doctors)`
          ).join('\n\n')}`,
          suggestions: ['Neurology department', 'Cardiology department', 'Find a doctor'],
        };
      }
      return {
        response: matched.map(s => `**${s.name}** — ${s.description} (${s.doctorCount} doctors)`).join('\n\n'),
        suggestions: [`Show doctors in ${matched[0].name}`],
      };
    }

    default: {
      const faq = findRelevantFaq(tokens);
      if (faq.length > 0) {
        return { response: faq.slice(0, 3).join('\n\n') };
      }

      const specDetect = matchSpecializations(tokens);
      if (specDetect.length > 0) {
        const relevant = doctors.filter(d =>
          d.specializations.some(s => specDetect.some(m => s.toLowerCase().includes(m.toLowerCase())))
        );
        if (relevant.length > 0) {
          return {
            response: `Based on your query, I found these relevant specialists:\n\n${relevant.slice(0, 3).map(formatDoctorResponse).join('\n\n')}`,
            suggestions: ['Book an appointment', 'Related health packages'],
          };
        }
      }

      return {
        response: `I'm not sure I understood your query. Could you rephrase it? Here are some examples of what I can help with:
• "Find a cardiologist"
• "Best health checkup package"
• "Hospitals with emergency care"
• "What services do you offer for children?"`,
        suggestions: ['Find a doctor', 'Health packages', 'Emergency hospitals', 'View all services'],
      };
    }
  }
}
