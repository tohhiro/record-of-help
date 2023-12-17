"use client";
import React, {useState} from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button } from "../../components/Button";
import { Checkbox } from "../../components/Checkbox";
import { Radio } from "../../components/Radio";
import { Textarea } from "../../components/Textarea";
import { convertHelps } from "./convertHelps";

export type Props = {
  person: string;
  helps: string[];
  comments: string;
};

export type Helps = {
  id: string;
  label: string;
};

export const helps: Helps[] = [
  {
    id: "dish",
    label: "皿洗い",
  },
  {
    id: "curtain",
    label: "カーテン",
  },
  {
    id: "prepareEat",
    label: "食事準備",
  },
  {
    id: "landry",
    label: "洗濯物片付け",
  },
  {
    id: "towel",
    label: "芽生のタオルを取る",
  }
];

// export const metadata = {
//   title: "Record of Help | Record",
//   description: "This App is recording help by your children",
// };

export default function Page() {

  const [submitButton, setSubmitButton] = useState<boolean>(false);

    const onSubmit: SubmitHandler<Props> = (data) => {
      const helpsData = convertHelps(helps, data);
      const sendingData = {
        ...helpsData,
        person: data.person,
        comments: data.comments,
      };
      setSubmitButton(true);
      console.log(sendingData); // テスト用
    }

  const { register, formState: { errors }, handleSubmit, control } = useForm<Props>({
    mode: "onChange",
  });

  console.log(errors); // テスト用

  return (
    <div className="w-100  h-200 m-10 text-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="person"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <div className="w-80 my-8 m-auto">
              <Radio id="eito" label="eito" {...field} value="eito" />
              <Radio id="mei" label="mei" {...field} value="mei" />
            </div>
          )}
        />
        <div className="my-2 m-auto text-center">
        {errors.person && <p className="text-xs text-red-500">必須項目です</p>}
        </div>
        <div className="w-80 my-8 m-auto">
          {helps.map((help) => (
            <Checkbox
              key={help.id}
              id={help.id}
              label={help.label}
              value={help.id}
              {...register("helps")}
            />
          ))}
        </div>

        <Controller
          name="comments"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div className="w-80 my-8 m-auto">
              <Textarea
                id="textarea"
                label="備考"
                placeholder="備考があれば入力"
                {...field}
              />
            </div>
          )}
        />

        <Button label="Submit" type="submit" style="primary" disabled={submitButton}/>
      </form>
    </div>
  );
};