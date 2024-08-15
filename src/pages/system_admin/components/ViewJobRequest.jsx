import SysAdminHeader from '../components/sysadminHeader';
import SysAdminSidebar from '../components/SysAdminSidebar';

export default function ViewJobRequest() {
 

  return (
    <>

    <SysAdminHeader headerText="Dashboard"/>
    <SysAdminSidebar/>

    <div className='bg-custom-blue rounded m-2 p-4 text-white font-bold'>ALL DEPARTMENTS</div>
      
        <p>
          <b>Requestor Name:</b> Ricardo Dalisay
        </p>
        <p>
          <b>Job Description & Job Type: </b> Broken Door Knob : Carpenter
        </p>
        <p>
          <b>Location: </b> CITC Building 3rd Floor Room - 309
        </p>
        <p>
          <b>Image: </b>image.png
        </p>
        <p>
          <b>Date Requested: </b> 01/08/2024
        </p>
        <hr className="my-4" />
        <p>
          <b>Staff Name: </b>
          <select>
            <option>Christian</option>
            <option>Leo</option>
            <option>Denzel</option>
          </select>
        </p>
        <p>
          <b>Job Prioritization: </b>
          <select>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </p>
        <p>
          <b>Estimated Time of Completion: </b>
          <input type="input" placeholder="1-2 Hours" />
        </p>
       
        
      
    </>
  );
}
