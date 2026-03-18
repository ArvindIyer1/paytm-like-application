import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"

export const Signin = () => {
  return <div className="bg-slate-300 h-screen flex justify-center">
    
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label="Sign-In" />
        <SubHeading label="Enter Your Credentials to access your account"></SubHeading>
        <InputBox placeholder={"arvind.cooliyer@gmail.com"} label={"E-mail"}></InputBox>
        <InputBox placeholder={"asdhgs1290@1neW"} label={"Password"}></InputBox>
        <div className="pt-4">
          <Button label={"Sign-In"} />
        </div>
        <BottomWarning label={"Dont Have an Account ?"} buttonText={"Sign up"} to={"/signup"}></BottomWarning>
      </div>
    </div>
  </div>
}