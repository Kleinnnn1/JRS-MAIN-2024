import 'remixicon/fonts/remixicon.css';
import ContentJobRequest from './ContentJobRequests';
import { Outlet, useOutlet } from "react-router-dom";
import SearchBar from '../../../components/SearchBar';

export default function SysAdminJob_requests() {
    const otherContent = useOutlet(); // Get the current outlet
    return (
        <div className="text-gray-800 font-inter">
               <SearchBar title="Job Requests" />
            
            {otherContent ? (
                <Outlet /> // Render nested routes if present
            ) : (
                <ContentJobRequest />
            )}
        </div>
    );
}
