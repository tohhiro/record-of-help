"use client";
import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button } from "../../components/Button";
import { Checkbox } from "../../components/Checkbox";
import { Radio } from "../../components/Radio";
import { Textarea } from "../../components/Textarea";
import { convertHelps } from "./convertHelps";

export type FormProps = {
  person: string;
  helps: string[];
  comments: string;
};

export type Helps = {
  id: string;
  label: string;
};

const helps: Helps[] = [
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
];


export const Form = () => {

    const onSubmit: SubmitHandler<FormProps> = (data) => {
      const result = convertHelps(helps, data);
      console.log(result); // テスト用
    }

  const { register, handleSubmit, control } = useForm<FormProps>({
    mode: "onChange",
  });

  return (
    <div className="w-100  h-200 m-10 text-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="person"
          control={control}
          render={({ field }) => (
            <div className="w-80 my-8 m-auto">
              <Radio id="eito" label="eito" {...field} value="eito" />
              <Radio id="mei" label="mei" {...field} value="mei" />
            </div>
          )}
        />

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

        <Button label="Submit" type="submit" style="primary" />
      </form>
    </div>
  );
};
