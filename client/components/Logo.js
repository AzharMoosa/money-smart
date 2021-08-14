import Image from "next/image";

export default function Logo() {
  return (
    <div className="logo">
      <Image
        src={"/images/logo_img.png"}
        width={103}
        height={66}
        alt={"Logo"}
      />
      <h2>Money Smart</h2>
    </div>
  );
}
