import { useSetRecoilState } from "recoil";
import { people, bills, billPersonSelection } from "./atoms";

let personId: number = 0;

export const usePeopleMutations = () => {
  const setPeople = useSetRecoilState(people);

  const createPerson = (name: string) => {
    let id = personId;
    personId++;
    setPeople((oldPeople) => [
      ...oldPeople,
      {
        name,
        id,
      },
    ]);
  };

  const updatePerson = (id: number, name: string) => {
    setPeople((oldPeople) => {
      let newPeople = [...oldPeople];
      let index = newPeople.findIndex((x) => x.id === id);
      let newPerson = { ...newPeople[index], name };
      newPeople[index] = newPerson;
      return [...newPeople];
    });
  };

  return { createPerson, updatePerson };
};

const useBillMutations = () => {
  const setBills = useSetRecoilState(bills);

  const createBill = (personOwed: number, people: number[], total: number) => {
    setBills((oldBills) => [
      ...oldBills,
      {
        date: new Date(),
        people,
        total,
        personOwed,
      },
    ]);
  };

  return { createBill };
};

export const useBillPersonSelectionMutations = () => {
  const setBills = useSetRecoilState(billPersonSelection);

  const toggleSelection = (id: number) => {
    setBills((oldSelection) => {
      if (oldSelection.selected.includes(id)) {
        return {
          selected: oldSelection.selected.filter((x) => x !== id),
          owedTo: oldSelection.owedTo === id ? -1 : oldSelection.owedTo,
        };
      } else
        return {
          ...oldSelection,
          selected: [...oldSelection.selected, id],
        };
    });
  };

  const setOwedTo = (id: number) => {
    setBills((oldSelection) => {
      if (oldSelection.selected.includes(id)) {
        return {
          ...oldSelection,
          owedTo: id,
        };
      }
      return oldSelection;
    });
  };

  return { setOwedTo, toggleSelection };
};
