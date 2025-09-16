import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, { useState } from "react"
import type { CreateUserRequest } from "@/types/auth"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import PasswordConfirm from "./PasswordConfirm"
import useNotification from "@/hooks/useNotification"
import Notification from "./Notification"
import useAuth from "@/hooks/useAuth"
import LoadingSpinner from "./LoadingSpinner"
import { useNavigate } from "react-router-dom"

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const [signUpData, setSignUpData] = useState<CreateUserRequest>({
    userName: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const isFormValid = signUpData.userName && signUpData.email && signUpData.password;

  const handleChange = (e: React.ChangeEvent <HTMLInputElement>) => {
    const {name, value} = e.target;
    setSignUpData((prev) => ({
      ...prev,
      [name]: value
    }));
  };


  const passwordConfirmed = signUpData.password && confirmPassword === signUpData.password && confirmPassword;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {notification, showNotification, hideNotification} = useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const {signup} = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(signUpData.email)) {
      showNotification("Please input a valid email address", "warning");
      return;
    }

    if (!isFormValid) {
      showNotification("Please check required field", "warning");
      return;
    }

    setIsLoading(true);
    try {
      await signup(signUpData);
      console.log("User successfully sign up");
      showNotification("Successfully create an account!", "success");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error: any) {
      showNotification("Failed to sign up for user", "error");
      return;
    } finally {
      setIsLoading(false);
    }

  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
              </div>
              <div className="grid gap-6">

                <div className="grid gap-3">
                  <Label htmlFor="email">Username</Label>
                  <Input
                    id="userName"
                    name="userName"
                    value={signUpData.userName}
                    type="text"
                    placeholder="juanitoaldebaran"
                    required
                    onChange={handleChange}
                  />
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    value={signUpData.email}
                    type="email"
                    placeholder="aldebaran@example.com"
                    required
                    onChange={handleChange}
                  />
                </div>
                
                <div className="grid gap-3">
                  
                  <Label htmlFor="password">Password</Label>
                  <div className="flex relative">
                    <Input 
                    id="password" 
                    name="password"
                    value={signUpData.password}
                    type={`${showPassword ? "text" : "password"}`} 
                    required 
                    onChange={handleChange}
                    />

                    <button onClick={() => setShowPassword(!showPassword)} className="absolute top-2 right-2">
                      {showPassword ? <FontAwesomeIcon icon={faEye}></FontAwesomeIcon> : <FontAwesomeIcon icon={faEyeSlash}></FontAwesomeIcon>}
                    </button>

                  </div>
                  
                </div>

                <div className="grid gap-3">

                  <Label htmlFor="password">Confirm Password</Label>
                  {confirmPassword && (
                      <PasswordConfirm status={`${passwordConfirmed ? "success": "error"}`} message={`${passwordConfirmed ? "Password match" : "Password do not match"}`}/>
                    )}

                  <div className="flex relative">
                    <Input 
                    id="confirmPassword" 
                    name="confirmPassword"
                    value={confirmPassword}
                    type={`${showConfirmPassword ? "text" : "password"}`} 
                    required 
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <button onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute top-2 right-2">
                      {showPassword ? <FontAwesomeIcon icon={faEye}></FontAwesomeIcon> : <FontAwesomeIcon icon={faEyeSlash}></FontAwesomeIcon>}
                    </button>
                  </div>

                </div>
                
                <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600" disabled={!isFormValid}>
                  {isLoading ? <LoadingSpinner></LoadingSpinner> : "Sign Up"}
                </Button>

              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <a href="/login" className="underline underline-offset-4">
                  Login
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>

      <Notification
            message={notification.message}
            type={notification.type}
            isVisible={notification.isVisible}
            onClose={hideNotification}
            duration={1000}
            position="top-center"
        >
        </Notification>
    </div>
  )
}
