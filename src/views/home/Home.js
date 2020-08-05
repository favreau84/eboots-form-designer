import React from "react";

import SignInButton from "features/auth/SignInButton";
import UploadPhoto from "features/photos/UploadPhoto";

export default function Home() {
  return (
    <div>
      <SignInButton />
      <UploadPhoto />
    </div>
  );
}
