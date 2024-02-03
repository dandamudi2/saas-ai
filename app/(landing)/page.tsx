import { Button } from "@/components/ui/button";
import Link from "next/link";

const landingPage = () => {
  return (
    <>
      <p>Landing Page (un protected Route)</p>
      <Link href="/sign-in">
        <Button variant="default">Login</Button>
      </Link>
      <Link href="/sign-up">
        <Button variant="default">Register</Button>
      </Link>
    </>
  );
};

export default landingPage;
