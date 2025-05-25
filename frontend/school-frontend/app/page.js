// app/page.js (Home Dashboard)
'use client';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';


const sections = [
  { name: 'Students', path: '/students' },
  { name: 'Teachers', path: '/teachers' },
  { name: 'Attendance', path: '/attendance' },
  { name: 'Assessments', path: '/assessments' },
  { name: 'Schedules', path: '/schedules' },
  { name: 'Non-Academic Records', path: '/nonacademic' },
  { name: 'Meetings', path: '/meetings' },
];

export default function Dashboard() {
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {sections.map((section) => (
        <Link key={section.path} href={section.path}>
          <Card className="hover:shadow-xl cursor-pointer transition duration-200">
            <CardContent className="p-6 text-center">
              <h2 className="text-xl font-semibold">{section.name}</h2>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
