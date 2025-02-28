import React, { useEffect } from "react";
import PasswordChangeForm from "../../components/forms/PasswordChangeForm";

const ChangePasswordPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="outer-div min-h-screen">
      <div className="inner-div mt-8 flex items-center justify-center">
        <PasswordChangeForm />
      </div>
    </div>
  );
};

export default ChangePasswordPage;
