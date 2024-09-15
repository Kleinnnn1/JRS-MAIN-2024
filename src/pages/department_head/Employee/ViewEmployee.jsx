import ReusableBackButton from "../../../components/ReusableBackButton";
import ReusableContent from "../../../components/ReusableContent";
import ReusableUpdateButton from "../../../components/ReusableUpdateButton";
import SearchBar from "../../../components/SearchBar";

export default function ViewEmployee() {
  return (
    <>
      <SearchBar title="Employee Information" />
      <ReusableContent>
        <p>
          <b>Full Name: </b>
          Juan Dela Cruz
        </p>
        <p>
          <b>Job: </b>
          Carpenter
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
        </p>
        <div className="absolute bottom-4 right-4 flex">
          <ReusableBackButton marginRight="mr-4" />
          <ReusableUpdateButton />
        </div>
      </ReusableContent>
    </>
  );
}
