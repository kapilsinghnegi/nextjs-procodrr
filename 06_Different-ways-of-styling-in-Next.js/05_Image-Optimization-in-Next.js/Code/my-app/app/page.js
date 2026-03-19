"use client";
import Image from "next/image";

const Home = () => {
  return (
    <div>
      {/* <img
        src="/ocean-mountain.jpg"
        alt="Ocean Mountain"
        className="w-[400px]"
      /> */}
      <Image
        src="/ocean-mountain.jpg"
        alt="Ocean Mountain"
        width={400}
        height={300}
        // quality={100}
        // unoptimized
        // loader={({ src, width, quality }) => {
        //   return src;
        // }}
      />
      <Image
        src="https://images.unsplash.com/photo-1526779259212-939e64788e3c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D"
        alt="Ocean Mountain"
        width={600}
        height={399}
      />
    </div>
  );
};

export default Home;

