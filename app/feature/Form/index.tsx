"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "../../components/Button";
import { Checkbox } from "../../components/Checkbox";
import { Radio } from "../../components/Radio";
import { Textarea } from "../../components/Textarea";

interface IForm {
  person: string;
  helps?: boolean;
  comments: string;
}

export const Form = () => {
  const onSubmit: SubmitHandler<IForm> = (data) => {
    console.log(data); // テスト用
  };

  const { register, handleSubmit } = useForm<IForm>();

  return (
    <div className="w-100  h-200 m-10 text-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-80 my-8 m-auto">
          <Radio
            id="eito"
            label="eito"
            value="eito"
            {...register("person", { required: true })}
          />
          <Radio
            id="mei"
            label="mei"
            value="mei"
            {...register("person", { required: true })}
          />
        </div>
        <div className="w-80 my-8 m-auto">
          <Checkbox id="dish" label="皿洗い" {...register("helps")} />
          <Checkbox id="curtain" label="カーテン" {...register("helps")} />
          <Checkbox id="prepareEat" label="食事準備" {...register("helps")} />
        </div>
        <div className="w-80 my-8 m-auto">
          <Textarea
            id="textarea"
            label="備考"
            placeholder="備考があれば入力"
            {...register("comments")}
          />
        </div>
        <Button
          label="Submit"
          type="submit"
          style="primary"
          onClick={() => {}} // 一旦空関数を渡す
        />
      </form>
    </div>
  );
};
