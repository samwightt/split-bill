import { selector } from "recoil";
import { people, billPersonSelection } from "./atoms";

export const filteredPeople = selector({
  key: "filteredPeople",
  get: ({ get }) => {
    const peopleList = get(people);
    const { selected, owedTo } = get(billPersonSelection);

    return peopleList
      .filter((person) => selected.includes(person.id))
      .map((person) => ({
        ...person,
        isOwed: owedTo === person.id,
      }));
  },
});
