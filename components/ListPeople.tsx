import { useState, useMemo } from "react";
import { useRecoilValue } from "recoil";
import { people, Person } from "../store/atoms";
import { usePeopleMutations } from "../store/mutations";

interface ItemProps {
  person: Person;
}

const Item: React.FC<ItemProps> = (props) => {
  const { updatePerson } = usePeopleMutations();
  const [isEditing, setEditing] = useState(false);
  const [text, setText] = useState("");

  useMemo(() => setText(props.person.name), [props.person.name]);

  const update = () => {
    updatePerson(props.person.id, text);
    setEditing(false);
  };

  return isEditing ? (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        update();
      }}
    >
      <input
        autoFocus
        onBlur={() => update()}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Save</button>
    </form>
  ) : (
    <li style={{ cursor: "pointer" }} onClick={() => setEditing(true)}>
      {props.person.name}
    </li>
  );
};

export default function ListPeople() {
  const peopleList = useRecoilValue(people);

  return (
    <ul>
      {peopleList.map((person) => (
        <Item person={person} />
      ))}
    </ul>
  );
}
