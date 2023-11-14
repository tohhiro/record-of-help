import { Dashbord } from "./feature/Dashbord";
import { Form } from "./feature/Form";
import { Header } from "./feature/Header";

export default function Home() {
  return (
    <main>
      <Header />
      <Dashbord />
      <Form />
    </main>
  );
}
