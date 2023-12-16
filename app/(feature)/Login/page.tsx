"use client";
import React, {useState} from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import  { zodResolver } from "@hookform/resolvers/zod";
import { validationSchema } from "./validationSchema";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

export type Props = {
    email: string;
    password: string;
};


const Login = () => {
    const [submitButton, setSubmitButton] = useState<boolean>(false);
    const { register, formState: { errors }, handleSubmit, control } = useForm<Props>({
        mode: "onChange",
        resolver: zodResolver(validationSchema),    
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
                <p>{errors.email?.message && errors.email?.message}</p>
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
                <p>{errors.password?.message && errors.password?.message}</p>
                <Button label="ログイン" type="submit" style="primary" disabled={submitButton}/>
            </form>
        </div>
    )
 }

export default Login;