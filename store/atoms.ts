import { atom } from "recoil";

export interface Person {
  name: string;
  id: number;
}

export const people = atom({
  key: "people",
  default: [] as Person[],
});

export interface Bill {
  total: number;
  people: number[];
  personOwed: number;
  date: Date;
}

export const bills = atom({
  key: "bills",
  default: [] as Bill[],
});

export const billPersonSelection = atom({
  key: "billPersonSelection",
  default: {
    selected: [] as number[],
    owedTo: -1,
  },
});
