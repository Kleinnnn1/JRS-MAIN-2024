import { useState } from 'react';
import RequestorJobRequestTable from './RequestorJobRequestTable'; // Keep only the table component

export default function JobRequestPage() {
  const [jobRequests] = useState([
    {
      id: 'JR001',
      requestor: 'John Doe',
      description: 'Fix electrical wiring in office',
      category: 'Electrical',
      persons: 2,
      department: 'Maintenance',
      processedBy: 'Jane Smith',
      photo: null,
      status: 'Pending',
      dateRequested: '2024-09-10',
      dateCompleted: null,
    },
    {
      id: 'JR002',
      requestor: 'Alice Johnson',
      description: 'Install new computers',
      category: 'IT Support',
      persons: 1,
      department: 'IT',
      processedBy: 'John Smith',
      photo: null,
      status: 'Completed',
      dateRequested: '2024-09-12',
      dateCompleted: '2024-09-15',
    },
    {
      id: 'JR003',
      requestor: 'Michael Brown',
      description: 'Clean office spaces',
      category: 'Cleaning',
      persons: 3,
      department: 'Janitorial',
      processedBy: 'Emily White',
      photo: null,
      status: 'Ongoing',
      dateRequested: '2024-09-16',
      dateCompleted: null,
    },
    {
      id: 'JR004',
      requestor: 'Lisa Turner',
      description: 'Repair air conditioning unit',
      category: 'HVAC',
      persons: 2,
      department: 'Facilities',
      processedBy: 'Robert Johnson',
      photo: null,
      status: 'Pending',
      dateRequested: '2024-09-18',
      dateCompleted: null,
    },
    {
      id: 'JR005',
      requestor: 'Henry Davis',
      description: 'Relocate office furniture',
      category: 'Logistics',
      persons: 4,
      department: 'Admin',
      processedBy: 'Sarah Miller',
      photo: null,
      status: 'Completed',
      dateRequested: '2024-09-05',
      dateCompleted: '2024-09-07',
    },

    
  ]);

  return (
    <div className="max-w-full mx-auto my-10 p-6">
      <RequestorJobRequestTable jobRequests={jobRequests} />
    </div>
  );
}
