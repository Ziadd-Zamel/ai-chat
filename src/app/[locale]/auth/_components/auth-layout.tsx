import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-dvh w-full py-10 bg-mainbg flex items-center justify-center">
      {/* Gradient border wrapper — 1px padding reveals the gradient bg */}
      <div
        className="w-full max-w-260 rounded-[18px] p-px"
        style={{
          background:
            "linear-gradient(115.3deg, #005F33 0.65%, rgba(0,129,69,0) 58.67%, #005F33 100.68%)",
        }}
      >
        {/* Inner card */}
        <div className="rounded-[16px] bg-mainbg grid grid-cols-1 md:grid-cols-2 overflow-hidden min-h-140">
          {/* Right: children */}
          <div className="flex flex-col justify-center p-8 md:p-12 dir-rtl">
            {children}
          </div>

          {/* Left: image panel */}
          <div className="relative hidden md:block">
            <Image
              src={"/assets/Images/auth-bg.png"}
              alt="auth visual"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
