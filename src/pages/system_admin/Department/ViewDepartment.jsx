import { Edit } from "@mui/icons-material";


export default function ViewingDepartment (){
    return(
        <div className="m-5">
           
     <div className="flex justify-between"> 
        
        <div>
        <p>
          <b>Department/Office: </b>
          Mechanical And Electrical Works Section
        </p>
        <p>
          <b>Head/Director: </b>
          Thomas Xxxxx
        </p>
       
        <p>
          <b>Location: </b>
          DRER Right side
        </p>
        <p>
          <b>Email: </b>
          mews@gmail.com
        </p>
        </div>
        
        <div className="flex">
          <b>Status: </b>
          <b className="h-6 bg-green-500 text-white rounded font-bold text-xs p-1 mr-8">Active</b>
          <button className="flex text-center text-xs  h-6">
            <Edit className=" "/>
        </button>
        </div>
       
       
    </div>
      
        <div className="absolute bottom-4 right-4 flex">
        </div>
            <div className="border "></div>

        </div>
    );
}
