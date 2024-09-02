import Link from "next/link";

const TermsAndPolicy = () => {
  return (
    <div className='text-center p-4 text-xs text-muted-foreground transition-color text-gray-400'>
      <p className='md:text-sm text-xs py-2'>
        By signing in/up, you agree to our{" "}
        <Link href="/terms-of-service" className="text-sm sm:text-xs underline">
          Terms of Use
        </Link>{" "}
        and{" "}
        <Link href="/privacy-policy" className="text-sm sm:text-xs underline">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
};

export default TermsAndPolicy;
