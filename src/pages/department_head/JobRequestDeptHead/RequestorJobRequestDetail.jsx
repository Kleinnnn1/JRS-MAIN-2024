import { useNavigate } from "react-router-dom";

export default function RequestFormDetail() {
    const { requestId } = useParams();
    const navigate = useNavigate();

    const [request, setRequests] = useState({
        requestId:  "",
        description:  "",
        jobCategory:  "",
        deptName:  "",
        image:  "",
        status:  "",
        requestDate:  "",
        priority:  "",
      });
const [loading, setLoading] = useState(true);
const [editing, setEditing] = useState(false); // Flag to track if in editing mode
useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        const { data, error } = await supabase
          .from("Request")
          .select(`
        requestId,
        description,
        jobCategory,
        deptName,
        image,
        status,
        requestDate,
        priority
`)
          .eq("requestId", requestId)
          .single();


          if (error) throw error;

          setRequests({
            requestId:  data.requestId || "N/A",
            description:  data.description || "N/A",
            jobCategory: data.jobCategory || "N/A",
            deptName: data.deptName || "N/A",
            image:  data.image || "N/A",
            status:  data.status || "N/A",
            priority: data.priority || "N/A",
            requestDate: data.requestDate || "N/A",
            dateCreated: new Date(data.created_at).toLocaleDateString(),
          });

        } catch (err) {
            console.error("Error fetching request data:", err);
            
          } finally {
            setLoading(false);
          }
        };
    
        
    fetchRequestDetails();
}, [requestId]); // Runs once when component mounts
// Handle input changes
const handleInputChange = (e) => {
    const { name, value } = e.target;
    setrequest((prevRequest) => ({
      ...prevRequest,
      [name]: value,
    }));
  };

 // Handle form save action
 const handleSave = async () => {
    try {
      // Ensure that required fields are not empty
      if (!request.requestId || !request.description || !request.priority) {
        alert("requestId, description, and priority are required.");
        return;
      }

        // Perform the update query
        const { error } = await supabase
        .from("User")
        .update({
            requestId: request.requestId,
            description: request.description,
            jobCategory: request.jobCategory,
            deptName: request.contactNumber,
            image: request.image,
            status: request.status,
            requestDate: request.requestDate,
            priority: request,priority
        })
        .eq("requestId", requestId); // Update only the record with the matching ID

        if (error) throw error; // Handle any error returned from Supabase
            // Inform the user about successful update
            alert("request updated successfully!");

            // Redirect back to the table after successful update
            navigate("/department_head/job_requets/view"); 

return (
<div>

</div>


);

}
export default RequestFormDetail;
