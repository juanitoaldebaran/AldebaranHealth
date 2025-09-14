import { SignUpForm } from "@/components/SignUpForm";
import type React from "react";

const SignUp: React.FC = () => {
    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <a href="/" className="flex items-center gap-2 self-center font-medium text-blue-500 text-[18px]">
                    AldebaranHealth
                </a>
                <SignUpForm />
            </div>
        </div>
    )
}

export default SignUp;