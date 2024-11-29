import 'remixicon/fonts/remixicon.css';
import { useNavigate, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';  // Make sure to import useState and useEffect
import SearchBar from '../../../components/SearchBar';
import supabase from "../../../service/supabase";

export default function UserType() {
    const navigate = useNavigate();
    
    // State to store the list of admins (department heads)
    const [admins, setAdmins] = useState([]);
    const [usersCount, setUsersCount] = useState(0);  // State to store the number of users (requestors)
    const [loading, setLoading] = useState(true);

    // Fetch department heads from the backend
    const fetchAdmins = async () => {
        try {
            const { data, error } = await supabase
                .from("Department")
                .select(
                    `deptName, User ( fullName, userRole, created_at )`
                );
            if (error) throw error;

            const formattedData = data.flatMap((department) =>
                department.User.filter(
                    (user) => user.userRole === "department head" || user.userRole === "office head"
                ).map((head) => ({
                    deptName: department.deptName,
                    fullName: head.fullName,
                    dateCreated: new Date(head.created_at).toLocaleDateString(),
                }))
            );
            setAdmins(formattedData);  // Update state with the admins list
            setLoading(false);  // Stop loading once data is fetched
        } catch (error) {
            console.error("Error fetching department heads:", error);
            setLoading(false);  // Stop loading even if there's an error
        }
    };

    // Fetch requestors (users) from the backend
    const fetchRequestors = async () => {
        try {
            const { data, error } = await supabase
                .from("User")  // Assuming the 'User' table has a userRole column for requestors
                .select("*")
                .eq("userRole", "requestor");  // Adjust this based on how requestors are defined

            if (error) throw error;

            // Set the number of requestors based on the fetched data
            setUsersCount(data.length);  // Count the number of users retrieved
        } catch (error) {
            console.error("Error fetching requestors:", error);
        }
    };

    // UseEffect to fetch initial data and setup realtime subscription
    useEffect(() => {
        // Fetch initial data for admins and requestors
        fetchAdmins();
        fetchRequestors();

        // Subscribe to realtime updates from the User table, not Department
        const channel = supabase
            .channel("public:User")  // Listen to the 'User' table for any changes
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "User" },
                async (payload) => {
                    console.log("Realtime event:", payload);
                    await fetchAdmins();  // Refresh data on any change
                    await fetchRequestors();  // Refresh the number of users on any change
                }
            )
            .subscribe();

        // Cleanup subscription on component unmount
        return () => {
            supabase.removeChannel(channel);
        };
    }, []);  // Empty dependency array means this effect runs only once after the first render

    // Get the number of admins
    const numOfAdmins = admins.length;

    return (
        <>
            <SearchBar title="Users" />
            <div className='m-5'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6'>
                    {/* Button 1: USER / REQUESTOR */}
                    <button
                        onClick={() => navigate("/system_admin/Users/reg_users")}
                        className='text-center bg-custom-color border shadow-md rounded-lg hover:scale-105 hover:shadow-lg hover:bg-custom-hover-color transition-all duration-300 font-bold p-10'
                    >
                        <div className='flex justify-center items-center'>
                            <i className='ri-user-star-line text-4xl mr-3'></i>
                            <p className='text-black text-xl font-bold font-sans m-3'>USER / REQUESTOR</p>
                        </div>
                        <p className='font-thin'>No of Users: </p>
                        <p className='text-center font-thin'>{loading ? "Loading..." : usersCount}</p>
                    </button>

                    {/* Button 2: DEPARTMENT HEAD */}
                    <button
                        onClick={() => navigate("/system_admin/Users/admin")}
                        className='text-center bg-custom-color border shadow-md rounded-lg hover:scale-105 hover:shadow-lg hover:bg-custom-hover-color transition-all duration-300 font-bold p-10'
                    >
                        <div className='flex justify-center items-center'>
                            <i className='ri-user-star-line text-4xl mr-3'></i>
                            <p className='text-black text-xl font-bold font-sans m-3'>DEPARTMENT HEAD</p>
                        </div>
                        <p className='font-thin'>No of Admin: </p>
                        <p className='text-center font-thin'>{loading ? "Loading..." : numOfAdmins}</p>
                    </button>

                    {/* Button 3: DEPARTMENT STAFF */}
                    <button
                        onClick={() => navigate("/system_admin/Users/staff")}
                        className='text-center bg-custom-color border shadow-md rounded-lg hover:scale-105 hover:shadow-lg hover:bg-custom-hover-color transition-all duration-300 font-bold p-10'
                    >
                        <div className='flex justify-center items-center'>
                            <i className='ri-user-star-line text-4xl mr-3'></i>
                            <p className='text-black text-xl font-bold font-sans m-3'>DEPARTMENT STAFF</p>
                        </div>
                        <p className='font-thin text-black'>No of Staff: </p>
                        <p className='text-center font-thin'>1000</p>
                    </button>

                    {/* Button 4: SPME */}
                    {/* <button
                        onClick={() => navigate("/system_admin/Users/spme")}
                        className='text-center bg-custom-color border shadow-md rounded-lg hover:scale-105 hover:shadow-lg hover:bg-custom-hover-color transition-all duration-300 font-bold p-10'
                    >
                        <div className='flex justify-center items-center'>
                             <i className='ri-user-star-line text-4xl mr-3'></i>
                            <p className='text-black text-xl font-bold font-sans m-3'>SPME</p>
                        </div>
                        <p className='font-thin'>No of spme users: </p>
                        <p className='text-center font-thin'>1000</p>
                    </button> */}
                </div>

                <Outlet />
            </div>
        </>
    );
}
