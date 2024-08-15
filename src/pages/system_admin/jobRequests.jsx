
import 'remixicon/fonts/remixicon.css';
import ContentJobRequest from '../ContentJobRequests';
import ReusableSearchBar from './components/ReusableSearchBar';
import { Outlet, useOutlet } from "react-router-dom";

export default function Job_requests() {
     const otherContent = useOutlet(); // Get the current outlet
    return (
        <div className="text-gray-800 font-inter">
           
              <div className='bg-custom-blue rounded m-2 p-4 text-white font-bold'>ALL JOB REQUESTS</div>
              <ReusableSearchBar ButtonTitle='ADD NEW REQUEST'/>
              {otherContent ? (
        <Outlet /> // Render nested routes if present
      ) : (
        <ContentJobRequest />
      )}
            
        </div>
    );
}
