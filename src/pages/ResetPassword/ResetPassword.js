import { useState } from "react";
import { ForgetPassword, CheckEmail, NewPassword, ResetSuccessful } from "./components";

export default function ResetPassword() {
  const [emailID, setEmailID] = useState("");
  const [emailStatus, setEmailStatus] = useState(false);
  const [password, setPassword] = useState("");
  const [newPasswordStatus, setNewPasswordStatus] = useState(false);
  const [emailRequestData, setEmailRequestData] = useState({});
  const [resetSucessful, setResetSuccessful] = useState(false);

  return (
    <>
    {!emailStatus && <ForgetPassword setEmailID={setEmailID} setEmailStatus={setEmailStatus} setEmailRequestData={setEmailRequestData}/>}
    {emailStatus && !newPasswordStatus && <CheckEmail emailID={emailID} setNewPasswordStatus={setNewPasswordStatus} setEmailRequestData={setEmailRequestData}/>}
    {newPasswordStatus && !resetSucessful && <NewPassword emailRequestData={emailRequestData} setPassword={setPassword} setResetSuccessful={setResetSuccessful}/>}
    {resetSucessful && <ResetSuccessful password={password}/>}
    </>
  )
}