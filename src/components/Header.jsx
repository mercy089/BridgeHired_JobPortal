import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import DarkMode from "./DarkMode/DarkMode";
import {
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { Briefcase, Heart, Newspaper, PenBox } from "lucide-react";

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [isLogin, setIsLogin] = useSearchParams(false);
  const { user } = useUser();
  useEffect(() => {
    if (isLogin.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [isLogin]);

  const handleOverLayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setIsLogin({});
    }
  };

  return (
    <header className=" py-4">
      <nav className="px-5 lg:px-10 mx-auto flex justify-between items-center">
        <Link to="/">
          <img src="https://github.com/mercy089/textanimation/blob/main/logo.png?raw=true" alt="BridgeHire logo" className="h-14" />
        </Link>
        <div className="flex items-center space-x-1">
          {/* Dark Mode Toggle */}
          <DarkMode />

          <div className="flex  items-center space-x-1">
            {/* Signed Out View */}
            <SignedOut>
              <Link to="/blogs">
                <Button variant="blue" className="h-[40px] rounded-full">
                  <Newspaper size={20} className="mr-2" />
                  Blogs
                </Button>
              </Link>
              <Button
                variant="outline"
                className="h-[40px] rounded-full"
                onClick={() => setShowSignIn(true)}
              >
                Login
              </Button>
            </SignedOut>
            {/* Signed In View */}
            <SignedIn>
              <Link to="/blogs">
                <Button variant="blue" className="h-[40px] rounded-full">
                  <Newspaper size={20} className="mr-2" />
                  Blogs
                </Button>
              </Link>
              {user?.unsafeMetadata?.role === "recruiter" && (
                <Link to="/post-job">
                  <Button
                    variant="destructive"
                    className="h-[40px] rounded-full"
                  >
                    <PenBox size={20} className="mr-2" />
                    Post Job
                  </Button>
                </Link>
              )}
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-[40px] h-[40px]",
                  },
                }}
              >
                <UserButton.MenuItems>
                  <UserButton.Link
                    label="My Jobs"
                    labelIcon={<Briefcase size={15} />}
                    href="/my-jobs"
                  />
                  <UserButton.Link
                    label="Saved Jobs"
                    labelIcon={<Heart size={15} />}
                    href="/job-saved"
                  />
                </UserButton.MenuItems>
              </UserButton>
            </SignedIn>
          </div>
        </div>

        {/* Conditional Sign-In Modal */}
        {showSignIn && (
          <div
            className="z-50 fixed inset-0 flex items-center justify-center bg-white dark:bg-black dark:bg-opacity-50 bg-opacity-50"
            onClick={handleOverLayClick}
          >
            <SignIn
              signUpForceRedirectUrl="/onboarding"
              fallbackRedirectUrl="/onboarding"
              afterSignIn={() => setShowSignIn(false)} // Close modal after sign-in
            />
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
