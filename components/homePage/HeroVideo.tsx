"use client";
import NextVideo from "next-video";
import MyVideo from "https://utfs.io/f/4a6076f8-2cba-41e8-8e90-3be0ecab2260-9tebct.mp4";

export default function HeroVideo() {
  return (
    <NextVideo
      src={MyVideo}
      loop={true}
      autoPlay={true}
      muted={true}
      controls={false}
    />
  );
}
