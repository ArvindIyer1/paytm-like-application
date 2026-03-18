import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Heading } from "../components/Heading";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Singup = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  
  return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Signup"}></Heading>
        <SubHeading label={"Enter Your Information to Create Your Account"}></SubHeading>
        <InputBox onChange={(e) => {
          setFirstName(e.target.value)
        }} placeholder="Arvind" label={"First Name"}></InputBox>
        <InputBox onChange={(e) => { setLastName(e.target.value)}} placeholder={"Iyer"} label={"Last Name"}></InputBox>
        <InputBox onChange={(e) => { setUsername(e.target.value)}} placeholder={"arvind.cooliyer@gmail.com"} label={"E-mail"}></InputBox>
        <InputBox onChange={(e) => {setPassword(e.target.value)}} placeholder={"ibstgwz123@1#4"} label={"Password"}></InputBox>
        <div className="pt-4">
          <Button onClick={async() => {
            const response = await axios.post("http://localhost:3000/api/v1/user/signup" , {
              username,
              firstName,
              lastName,
              password
            });
            localStorage.setItem("token",response.data.token)
            navigate("/dashboard")
          }} label={"Sign-Up"}></Button>
        </div>
        <BottomWarning label={"Already Have an Account ?"} buttonText={"Sign in"} to={"/signin"}></BottomWarning>
      </div>
    </div>
  </div>
}