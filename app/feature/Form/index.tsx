"use client";
import React from "react";
import { Button } from "../../components/Button";
import { Checkbox } from "../../components/Checkbox";
import { Radio } from "../../components/Radio";

export const Form = () => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e); // テスト用
  };

  return (
    <div className="w-100  h-200 m-10 text-center">
      <form onSubmit={onSubmit}>
        <div className="w-80 my-8 m-auto">
          <Radio id="radio1" label="eito" name="radio1" />
          <Radio id="radio2" label="mei" name="radio1" />
        </div>
        <div className="w-80 my-8 m-auto">
          <Checkbox id="checkbox1" label="皿洗い" />
          <Checkbox id="checkbox2" label="カーテン" />
          <Checkbox id="checkbox3" label="食事準備" />
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
