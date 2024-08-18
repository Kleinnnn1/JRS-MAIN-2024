import { Edit } from "@mui/icons-material";
import ReportTab from "./ReportTable";


export default function ViewingDepartment (){
    return(
    <div className="m-5"> 
     <div className="flex justify-between m-10"> 
        
        <div >
        <div className="bg-custom-blue text-yellow-500 font-sans text-md rounded p-4">
          Mechanical And Electrical Works Section
        </div>
        <p className="p-2">
          <b >Head/Director: </b>
          Thomas Xxxxx
        </p>
       
        <p className="p-2">
          <b>Location: </b>
          DRER Right side
        </p>
        <p className="p-2">
          <b>Email: </b>
          mews@gmail.com
        </p>
        </div>
        
        <div className="flex">
          <b >Status: </b>
          <b className="h-6 bg-green-500 text-white rounded font-bold text-xs p-1 ml-2 mr-8">Active</b>
          <button className="flex text-center text-xs  h-6">
            <Edit/>
        </button>
        </div>
       
       
    </div>
      
        <div className="absolute bottom-4 right-4 flex">
        </div>
    <div className="border "></div>
    <ReportTab/>
    </div>
        
    );
}
