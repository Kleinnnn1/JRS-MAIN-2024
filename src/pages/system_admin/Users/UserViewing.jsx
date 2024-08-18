

export default function ViewUser() {
    return (
        <>
       
      <div className="m-10">
       <p className="font-bold mb-5">USER INFORMATION</p>
          <p>
            <b>Full Name: </b>
            Cardo Dalisay
          </p>
          <p>
            <b>Job: </b>
            Faculty
          </p>
          <p>
            <b>Age: </b>
            30
          </p>
          <p>
            <b>Phone Number: </b>
            1234567890
          </p>
          <p>
            <b>Email: </b>
            cardo@gmail.com
            cardo@gmail.com
            cardo@gmail.com
          </p>
          <div className="absolute right-4 m-3 flex">
           <button className="bg-green-500 mr-2 p-2 text-white rounded">Edit</button>
           <button className="bg-blue-500  p-2 text-white rounded ">Back</button>

          </div>
       
      </div>
      </>
    );
  }