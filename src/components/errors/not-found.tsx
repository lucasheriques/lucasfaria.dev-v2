"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { Title } from "@/components/ui/typography";
import { GradientText } from "@/components/ui/typography/gradient-text";

interface Props {
  type: "ideas" | "bytes";
}

const NotFound = () => {
  return (
    <div className="center flex min-w-full flex-1 flex-col items-center gap-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title as="h1">Not Found</Title>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <Image
          width={450}
          height={400}
          src="/images/404.svg"
          alt="Cat throwing a plant - 404 error"
        />
      </motion.div>
      <motion.p
        className="text-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        Sorry, nothing to see here. 🙈
      </motion.p>
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

export default NotFound;
