import { SignIn } from "@clerk/nextjs";
 
export default function Page() {
  return <SignIn 
  appearance={{
    elements : {
        formButtonPrimary : " bg-slate-500",
        footer : "p-4",
        internalhegiim : " bg-hidden"
    }
  }}
  />;
}