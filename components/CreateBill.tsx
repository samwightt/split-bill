import { useState } from "react";
import { bills, people, billPersonSelection } from "../store/atoms";
import { useBillPersonSelectionMutations } from "../store/mutations";
import { filteredPeople } from "../store/selectors";
import { useRecoilValue } from "recoil";

const PeopleSelector = (props) => {
  const { setOwedTo, toggleSelection } = useBillPersonSelectionMutations();
  const { owedTo, selected } = useRecoilValue(billPersonSelection);
  const peopleList = useRecoilValue(people);

  return (
    <ul>
      {peopleList.map((person) => (
        <li>
          {person.name}{" "}
          <button onClick={() => toggleSelection(person.id)}>
            {selected.includes(person.id) ? "Remove" : "Add"}
          </button>
          {selected.includes(person.id) &&
            selected.length > 1 &&
            (person.id !== owedTo ? (
              <button
                onClick={() => person.id !== owedTo && setOwedTo(person.id)}
              >
                This person paid
              </button>
            ) : (
              "This person paid"
            ))}
        </li>
      ))}
    </ul>
  );
};

export default function CreateBill() {
  const peopleList = useRecoilValue(filteredPeople);
  const [total, setTotal] = useState("0");

  const intTotal = parseInt(total);

  return (
    <>
      <h1>Add a bill</h1>
      <h2>Select a person</h2>
      <PeopleSelector onSelectUpdate={(value) => console.log(value)} />
      <h2>Enter total amount.</h2>
      <input
        value={total}
        type="number"
        step=".01"
        onChange={(e) => setTotal(e.target.value)}
      />
      <h2>Preview:</h2>
      {peopleList.length <= 1 ? (
        <p>Select more than one person.</p>
      ) : intTotal < 0.02 ? (
        <p>Enter a total greater than zero.</p>
      ) : (
        <ul>
          {peopleList.map((person) => (
            <li>
              {person.name} {person.isOwed && "Is owed."}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
