import Head from "next/head";
import ListPeople from "../components/ListPeople";
import CreatePerson from "../components/CreatePerson";
import CreateBill from "../components/CreateBill";

export default function Home() {
  return (
    <>
      <ListPeople />
      <CreatePerson />
      <CreateBill />
    </>
  );
}
