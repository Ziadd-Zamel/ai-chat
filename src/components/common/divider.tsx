import Image from "next/image";

export function Divider() {
  return (
    <Image
      src={"/assets/Icons/line.svg"}
      alt="Line"
      width={10}
      height={0}
      className="w-full"
    />
  );
}
