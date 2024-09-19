import { useState } from 'react';
import RequestorJobRequestForm from './RequestorJobRequestForm';
import RequestorJobRequestTable from './RequestorJobRequestTable';

export default function JobRequestPage() {
  const [jobRequests, setJobRequests] = useState([
    {
      id: 1,
      requestor: 'John Doe',
      description: 'The aircon does not work',
      persons: '-',
      department: 'CSWS',
      processedBy: 'CSWS',
      status: 'Pending',
      dateRequested: '26 - 05 - 2024',
      dateCompleted: '-',
    },
  ]);

  const handleFormSubmit = (newJobRequests) => {
    setJobRequests([...jobRequests, ...newJobRequests]);
  };

  return (
    <div className="job-request-page">
      <RequestorJobRequestForm onSubmit={handleFormSubmit} />
      <RequestorJobRequestTable jobRequests={jobRequests} />
    </div>
  );
}
