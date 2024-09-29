import { Fugaz_One } from "@next/font/google";
import React from "react";
import Button from "./Button";
import Calendar from "./Calendar";
import Link from "next/link";
import CallToAction from "./CallToAction";

const fugaz = Fugaz_One({
  weight: "400",
  variable: "--font-fugaz-one",
  subsets: ["latin"],
});

export default function Hero() {
  return (
    <div className="py-4 md:py-10 flex flex-col gap-8 sm:gap-10">
      <h1
        className={
          "text-5xl sm:text-text-6xl md:text-7xl text-center " + fugaz.className
        }
      >
        <span className="textGradient">Moodle</span> helps you track your 
        <span className="textGradient"> daily</span> mood!
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl text-center w-full mx-auto max-w-[600px]">
        Record your mood and see how you feel on
        <span className="font-semibold"> every day of every year</span>
      </p>
      <CallToAction />
      <Calendar demo/>
    </div>
  );
}
