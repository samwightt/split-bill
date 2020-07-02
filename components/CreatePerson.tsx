import { useState } from "react";
import { usePeopleMutations } from "../store/mutations";

export default function CreatePerson() {
  const [text, setText] = useState("");
  const { createPerson } = usePeopleMutations();

  return (
    <>
      <h2>Add a person</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPerson(text);
          setText("");
        }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter the person's name."
        />
        <button type="submit">Create Person</button>
      </form>
    </>
  );
}
