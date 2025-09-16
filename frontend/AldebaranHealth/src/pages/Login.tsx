import { LoginForm } from "@/components/LoginForm";
import type React from "react";

const Login: React.FC = () => {
    return (
       <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 bg-gradient-to-b from-slate-50 to-blue-50">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <a href="/" className="flex items-center gap-2 self-center font-medium text-blue-500 text-[18px]">
                    AldebaranHealth 👨🏻‍⚕️
                </a>
                <LoginForm />
            </div>
        </div>
    )
}

export default Login;