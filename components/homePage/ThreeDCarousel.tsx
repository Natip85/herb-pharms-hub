"use client";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  PanInfo,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import Image from "next/image";
const IMGS = [
  "https://utfs.io/f/dfbba2b6-2d6a-45be-b8fb-7f18ed4ae3ba-ua7928.png",
  "https://utfs.io/f/0c522843-9aa0-4b1f-ac2a-198b95016419-ua78ja.png",
  "https://utfs.io/f/f20e25d2-541d-40f2-b2a3-9c0284bf62b9-ua78if.png",
  "https://utfs.io/f/7a1dbb95-f7cb-464e-8a15-cd141b5225f4-ua78hk.png",
  "https://images.unsplash.com/photo-1717844519137-62f09a0cbcc6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1718034363286-999f294f8523?q=80&w=1889&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1718046254440-77bb25734514?q=80&w=1752&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1717844519137-62f09a0cbcc6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1718034363286-999f294f8523?q=80&w=1889&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1718046254440-77bb25734514?q=80&w=1752&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];
export default function ThreeDCarousel() {
  const isScreenSizeSm = useMediaQuery("(max-width: 640px)");
  const cylinderWidth = isScreenSizeSm ? 1100 : 1800;
  const faceCount = IMGS.length;
  const faceWidth = cylinderWidth / faceCount;
  const dragFactor = 0.05;
  const radius = cylinderWidth / (2 * Math.PI);

  const rotation = useMotionValue(0);
  const controls = useAnimation();

  const handleDrag = (_: any, info: PanInfo) => {
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    controls.start({
      rotateY: rotation.get() + info.velocity.x * dragFactor,
      transition: { type: "spring", stiffness: 100, damping: 30, mass: 0.1 },
    });
  };

  const transform = useTransform(rotation, (value) => {
    return `rotate3d(0, 1, 0, ${value}deg)`;
  });
  return (
    <>
      <div className="relative mb-5 w-full">
        <div className="mx-auto size-0.5 min-w-96 bg-black dark:bg-white" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform bg-background p-1">
          <Image src={"/logo.png"} alt="logo" width={30} height={30} />
        </div>
      </div>
      <h1 className="text-center text-2xl font-bold md:text-4xl">
        Some of our top brands
      </h1>

      <div className="relative h-[200px] w-full overflow-hidden md:h-[300px]">
        <div
          className="bg-mauve-dark-2 flex h-full items-center justify-center"
          style={{
            perspective: "1000px",
            transformStyle: "preserve-3d",
            transform: "rotateX(0deg)",
          }}
        >
          <motion.div
            drag="x"
            className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
            style={{
              transform: transform,
              rotateY: rotation,
              width: cylinderWidth,
              transformStyle: "preserve-3d",
            }}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            animate={controls}
          >
            {IMGS.map((url, i) => {
              return (
                <div
                  key={i}
                  className="absolute flex h-full origin-center items-center justify-center p-2"
                  style={{
                    width: `${faceWidth}px`,
                    transform: `rotateY(${
                      i * (360 / faceCount)
                    }deg) translateZ(${radius}px)`,
                  }}
                >
                  <img
                    src={url}
                    alt="img"
                    className="pointer-events-none h-12 w-full rounded-xl bg-secondary object-cover md:h-32"
                  />
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </>
  );
}
