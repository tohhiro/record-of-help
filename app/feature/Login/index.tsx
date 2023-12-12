"use client";
import React, {useState} from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

export type Props = {
    email: string;
    password: string;
};


export const Login = () => {
    const [submitButton, setSubmitButton] = useState<boolean>(false);
    const { register, formState: { errors }, handleSubmit, control } = useForm<Props>({
        mode: "onChange",
    })

    const onSubmit: SubmitHandler<Props> = (data) => {
        setSubmitButton(true);
        console.log('data',data);
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: true,
                      }}
                    render={({ field }) => (
                        <Input id="email" label="メールアドレス" type="text"  {...field}/>
                    )}
                />
                <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: true,
                      }}
                    render={({ field }) => (
                        <Input id="password" label="パスワード" type="password"  {...field}/>
                    )}
                />
                <Button label="ログイン" type="submit" style="primary" disabled={submitButton}/>
            </form>
        </div>
    )
 }