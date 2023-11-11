import { Button } from "../../components/Button";
import { Checkbox } from "../../components/Checkbox";

export default function Form() {
  return (
    <div className="w-100  h-200 m-10 text-center">
      <span className="text-4xl">Form！！</span>
      <Checkbox label="Radio" />
      <Checkbox label="Radio2" />
      <Checkbox label="Radio3" />
      <Button label="Button" type="button" style="primary" />
    </div>
  );
}
