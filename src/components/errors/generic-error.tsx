"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { GradientText, Title } from "@/components/typography";

const GenericError = () => {
  return (
    <div className="center flex min-w-full flex-1 flex-col items-center gap-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title as="h1">Internal Server Error</Title>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <Image
          width={350}
          height={350}
          src="/images/dragon-error.svg"
          alt="Dragon spitting fire in a town - server error"
        />
      </motion.div>
      <motion.div
        className="text-center text-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <p className="text-center text-lg">
          Sorry, a dragon has caused an internal server error! 🐉
        </p>
        <p className="text-center text-lg">
          {"We're"} gathering a party to fix this issue. Please check back
          later. 🧙🏼‍♂️
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.9 }}
      >
        <Link href="/">
          <GradientText className="text-3xl font-bold">
            Go back home
          </GradientText>
        </Link>
      </motion.div>
    </div>
  );
};

export default GenericError;
