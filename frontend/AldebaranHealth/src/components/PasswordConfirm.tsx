import type React from "react";

interface PasswordConfirmProps {
    status: "success" | "error";
    message: string;
}

const PasswordConfirm: React.FC<PasswordConfirmProps> = ({status, message}) => {
    const baseClass = "mt-1 text-[14px]";
    const typeClass = 
        {
            success: "text-green-500",
            error: "text-red-500",
        };

    return (
        <div className={`${baseClass} ${typeClass[status]}`}>
            {message}
        </div>
    )
}

export default PasswordConfirm;