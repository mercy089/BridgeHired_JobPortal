import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CallToActionButtons = () => (
  <div className="w-full flex justify-center gap-5">
    <Link to="/jobs">
      <Button variant="blue" size="xl">
        Browse Jobs
      </Button>
    </Link>
    <Link to="/post-job">
      <Button variant="destructive" size="xl">
        Post  Job
      </Button>
    </Link>
  </div>
);

export default CallToActionButtons;
