"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";

const SubmitButton = ({ children }: { children: ReactNode }) => {
  const { pending } = useFormStatus();

  if (pending) {
    return (
      <Button disabled className="w-fit">
        <Loader2 className="mr-2 w-4 h-4 animate-spin" />
        Plase Wait
      </Button>
    );
  }

  return <Button className="w-fit">{children}</Button>;
};

export default SubmitButton;
