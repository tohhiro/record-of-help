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
    const { formState: { errors }, handleSubmit, control } = useForm<Props>({
        mode: "onChange",
        resolver: zodResolver(validationSchema),    
    })

    const onSubmit: SubmitHandler<Props> = (data) => {
        setSubmitButton(true);
        console.log('data',data);
    }
    return (
        <div className={"w-100  h-200 m-10 text-center"}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-80 my-8 m-auto">
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
                    <p className="text-xs text-red-500">{errors.email?.message && errors.email?.message}</p>
                </div>
                <div className="w-80 my-8 m-auto">
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
                    <p className="text-xs text-red-500">{errors.password?.message && errors.password?.message}</p>
                </div>
                <div className="w-80 my-8 m-auto">
                    <Button label="ログイン" type="submit" style="primary" disabled={submitButton}/>
                </div>
            </form>
        </div>
    )
 }

export default Login;