"use client";

import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef } from "react";

import ProjectCollapsible from "@/components/project-collapsible";
import { socials } from "@/helpers/constants";

export default function ProjectList() {
  const t = useTranslations("home");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const projects = [
    {
      id: "devnagringa",
      title: t("devNaGringa.title"),
      description: t("devNaGringa.description"),
      link: `${socials.brNewsletter}?utm_source=lucasfaria.dev`,
    },
    {
      id: "emojinx",
      title: t("emojinx.title"),
      description: t("emojinx.description"),
      expandedContent: t("emojinx.expandedContent"),
      link: "https://emojinx.lucasfaria.dev",
    },
    {
      id: "mockinvoice",
      title: t("mockinvoice.title"),
      description: t("mockinvoice.description"),
      expandedContent: `${t("mockinvoice.expandedContent1")} ${t("mockinvoice.expandedContent2")} ${t("mockinvoice.expandedContent3")}`,
      link: "https://tools.lucasfaria.dev/v1/invoices/fake",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      className="grid gap-6 sm:grid-cols-2"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {projects.map((project) => (
        <motion.div
          key={project.id}
          variants={itemVariants}
          transition={{ duration: 0.5 }}
        >
          <ProjectCollapsible
            project={project}
            visitProjectText={t("visitProject")}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
