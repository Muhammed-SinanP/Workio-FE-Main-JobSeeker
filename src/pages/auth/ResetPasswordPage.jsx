import React from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import PasswordResetForm from "../../components/forms/PasswordResetForm";

const ResetPasswordPage = () => {
 
  const params = useParams();
  const resetToken = params.resetToken;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="outer-div min-h-screen">
      <div className="inner-div mt-8 flex w-full items-center justify-center">
        <div>
          <PasswordResetForm resetToken={resetToken}/>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
