export interface BookingDetails {
  meetingType: string;
  durationMinutes: number;
  dateStr: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "14:00"
  recruiterName: string;
  companyName: string;
  recruiterEmail: string;
  notes?: string;
}

/**
 * Formats a Date object to RFC 5545 iCalendar UTC string format: YYYYMMDDTHHMMSSZ
 */
function formatDateToIcs(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

/**
 * Generates an RFC 5545 standard .ics file content
 */
export function generateIcsContent(booking: BookingDetails): string {
  const [hours, minutes] = (booking.timeSlot || '14:00').split(':').map(Number);
  
  // Construct Start Date
  const startDate = new Date(booking.dateStr + 'T00:00:00');
  if (isNaN(startDate.getTime())) {
    const fallback = new Date();
    fallback.setDate(fallback.getDate() + 1);
    startDate.setTime(fallback.getTime());
  }
  startDate.setHours(hours || 14, minutes || 0, 0, 0);

  // Construct End Date based on duration
  const endDate = new Date(startDate.getTime() + (booking.durationMinutes || 30) * 60 * 1000);

  const now = new Date();
  const uid = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}@farhanmallik.dev`;
  const summary = `Interview / Sync: Farhan Mallik & ${booking.recruiterName || 'Recruiter'} (${booking.companyName || 'Team'})`;
  const description = [
    `Meeting Agenda: ${booking.meetingType}`,
    `Recruiter/Partner: ${booking.recruiterName} (${booking.recruiterEmail})`,
    `Company: ${booking.companyName}`,
    booking.notes ? `Agenda Notes: ${booking.notes}` : '',
    '',
    'Candidate: Farhan Mallik',
    'Role: AI & Full-Stack Systems Engineer (B.Tech CSE \'28, KCC ITM)',
    'Portfolio: https://farhanmallik05.github.io/retro-developer-workstation/',
    'GitHub: https://github.com/farhanmallik05',
    'Email: farhanmallik05@gmail.com',
    'Location: Google Meet / Virtual Video Bridge'
  ].filter(Boolean).join('\\n');

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Farhan Mallik//Developer Portfolio Workstation v4.2//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${formatDateToIcs(now)}`,
    `DTSTART:${formatDateToIcs(startDate)}`,
    `DTEND:${formatDateToIcs(endDate)}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    'LOCATION:Google Meet / Zoom (Link provided in confirmation)',
    'ORGANIZER;CN="Farhan Mallik":mailto:farhanmallik05@gmail.com',
    booking.recruiterEmail ? `ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;CN=${booking.recruiterName}:mailto:${booking.recruiterEmail}` : '',
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'BEGIN:VALARM',
    'TRIGGER:-PT15M',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: Farhan Mallik Interview Call in 15 minutes',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].filter(Boolean).join('\r\n');
}

/**
 * Downloads the .ics file to user device
 */
export function downloadIcsFile(booking: BookingDetails, filename = 'Interview_With_Farhan_Mallik.ics'): void {
  const icsData = generateIcsContent(booking);
  const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Prepares pre-composed mailto string with calendar reservation details
 */
export function generateMailtoLink(booking: BookingDetails): string {
  const subject = encodeURIComponent(`[Interview Schedule] ${booking.meetingType} - ${booking.companyName} (${booking.recruiterName})`);
  const body = encodeURIComponent(
    `Hi Farhan,\n\n` +
    `I would like to schedule a ${booking.durationMinutes}-minute ${booking.meetingType} session with you.\n\n` +
    `Proposed Date: ${booking.dateStr}\n` +
    `Proposed Time: ${booking.timeSlot} (IST / Local)\n` +
    `Company / Team: ${booking.companyName}\n` +
    `Contact Email: ${booking.recruiterEmail}\n` +
    (booking.notes ? `Notes / Job Description: ${booking.notes}\n\n` : '\n') +
    `Looking forward to speaking with you!\n\n` +
    `Best regards,\n` +
    `${booking.recruiterName}`
  );
  return `mailto:farhanmallik05@gmail.com?subject=${subject}&body=${body}`;
}
