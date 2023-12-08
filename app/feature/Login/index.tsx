"use client";
import React, {useState} from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

export type Props = {
    email: string;
    password: string;
};


export const Login = () => {
    const [submitButton, setSubmitButton] = useState<boolean>(false);
    const { register, formState: { errors }, handleSubmit, control } = useForm<Props>()
    const onSubmit: SubmitHandler<Props> = (data) => {
        console.log(data);
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input id="email" label="メールアドレス" type="text" {...register}/>
                <Input id="password" label="パスワード" type="password"  {...register}/>
                <Button label="ログイン" type="submit" style="primary" />
            </form>
        </div>
    )
 }