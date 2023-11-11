import { Button } from "../../components/Button";
import { Checkbox } from "../../components/Checkbox";

export default function Form() {
  return (
    <div className="w-100  h-200 m-10 text-center">
      <span className="text-4xl">Form！！</span>
      <div className="w-80 mt-8 mb-8 m-auto">
        <Checkbox id="radio1" label="Radio1" />
        <Checkbox id="radio2" label="Radio2" />
        <Checkbox id="radio3" label="Radio3" />
      </div>
      <Button label="Button" type="button" style="primary" />
    </div>
  );
}
