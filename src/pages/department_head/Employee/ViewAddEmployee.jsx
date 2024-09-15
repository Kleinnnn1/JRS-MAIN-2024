import ReusableBackButton from "../../../components/ReusableBackButton";
import ReusableContent from "../../../components/ReusableContent";
import SearchBar from "../../../components/SearchBar";
import ButtonAddEmployee from "./ButtonAddEmployee";

export default function ViewAddEmployee() {
  return (
    <>
      <SearchBar title="Add Employee" />
      <ReusableContent>
        <span>
          <b>Full Name:</b> Juan Dela Cruz
        </span>
        <br />
        <span>
          <b>Job: </b> Carpenter
        </span>
        <br />
        <span>
          <b>Age: </b> 30
        </span>
        <br />
        <span>
          <b>Phone Number: </b>123-123
        </span>
        <br />
        <span>
          <b>Email: </b>Cardo@email.com
        </span>

        <div className="absolute bottom-4 right-4 flex">
          <ReusableBackButton marginRight={`mr-4`} />
          <ButtonAddEmployee />
        </div>
      </ReusableContent>
    </>
  );
}
