"use client";
import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button } from "../../components/Button";
import { Checkbox } from "../../components/Checkbox";
import { Radio } from "../../components/Radio";
import { Textarea } from "../../components/Textarea";

type FormProps = {
  person: string;
  helps?: boolean;
  comments: string;
};

export const Form = () => {
  const onSubmit: SubmitHandler<FormProps> = (data) => {
    console.log(data); // テスト用
  };

  const { register, handleSubmit, control, watch } = useForm<FormProps>();
  console.log(watch("comments"));

  return (
    <div className="w-100  h-200 m-10 text-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="person"
          control={control}
          render={() => (
            <div className="w-80 my-8 m-auto">
              <Radio id="eito" label="eito" value="eito" name="person" />
              <Radio id="mei" label="mei" value="mei" name="person" />
            </div>
          )}
        />

        <Controller
          name="helps"
          control={control}
          render={() => (
            <div className="w-80 my-8 m-auto">
              <Checkbox id="dish" label="皿洗い" />
              <Checkbox id="curtain" label="カーテン" />
              <Checkbox id="prepareEat" label="食事準備" />
            </div>
          )}
        />

        <Controller
          name="comments"
          control={control}
          render={() => (
            <div className="w-80 my-8 m-auto">
              <Textarea
                id="textarea"
                label="備考"
                placeholder="備考があれば入力"
              />
            </div>
          )}
        />

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
