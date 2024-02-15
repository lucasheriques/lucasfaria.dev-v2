"use client";

import clsx from "clsx";
import { Coffee, Heart } from "lucide-react";
import React from "react";

import CloudIcon from "./cloud-icon";
import styles from "./espresso-machine.module.css";

function EspressoMachine() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isCoffeeReady, setIsCoffeeReady] = React.useState(false);

  const handleCoffeeClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsCoffeeReady(true);
    }, 3500);
    setTimeout(() => {
      setIsLoading(false);
      setIsCoffeeReady(false);
    }, 6000);
  };

  return (
    <div className={styles.espressoMachine}>
      <div
        className={`${styles.machineBody} flex flex-col items-center bg-stone-300`}
      >
        <div className="mt-1 flex w-full flex-col items-center justify-center gap-3">
          <div className="flex w-full items-center justify-center border-b border-dashed border-b-rose-600 p-1 text-rose-700">
            <Heart />
            <Heart />
            <Heart />
          </div>
          <button
            onClick={handleCoffeeClick}
            className="text--500 rounded border-2 border-dashed border-rose-700 p-1 text-xs text-rose-700"
          >
            {!isLoading && <Coffee />}
            {isLoading && !isCoffeeReady && "Preparing..."}
            {isCoffeeReady && "Enjoy!"}
          </button>
        </div>
        <div className={`${styles.spout} bg-stone-700`}></div>
      </div>
      <div className={`${styles.backgroundConnector} bg-[#4d609d]`}></div>
      <div className={`${styles.tray} bg-stone-600`}></div>
      <div className={styles.base}></div>
      <div
        className={clsx(
          styles.coffee,
          isLoading ? "animate-pour-coffee" : "animate-none",
        )}
      ></div>
      <div className={styles.cup}>
        <div
          className={clsx(
            styles.coffeeInside,
            isLoading ? "animate-fill-cup" : "animate-none",
          )}
        ></div>
        <div
          className={`${styles.smoke} bottom-[30px] flex flex-col items-center justify-center`}
        >
          <CloudIcon
            className={clsx(
              styles.smokeLine,
              isLoading ? "animate-show-smoke" : "animate-none",
              "h-4 w-8 fill-amber-300",
            )}
          />
          <CloudIcon
            className={clsx(
              styles.smokeLine,
              isLoading ? "animate-show-smoke" : "animate-none",
              "h-4 w-4 fill-amber-400",
            )}
          />
          <CloudIcon
            className={clsx(
              styles.smokeLine,
              isLoading ? "animate-show-smoke" : "animate-none",
              "h-2 w-3 fill-amber-400",
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default EspressoMachine;
