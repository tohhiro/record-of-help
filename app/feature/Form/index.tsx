import { Button } from "../../components/Button";
import { Checkbox } from "../../components/Checkbox";
import { Radio } from "../../components/Radio";

export default function Form() {
  return (
    <div className="w-100  h-200 m-10 text-center">
      <span className="text-4xl">Form！！</span>
      <div className="w-80 my-8 m-auto">
        <Checkbox id="checkbox1" label="checkbox1" />
        <Checkbox id="checkbox2" label="checkbox2" />
        <Checkbox id="checkbox3" label="checkbox3" />
        <Radio id="radio1" label="Radio1" name="radio1" />
        <Radio id="radio2" label="Radio2" name="radio1" />
      </div>
      <Button label="Button" type="button" style="primary" />
    </div>
  );
}
