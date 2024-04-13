import { intervalToDuration } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { Skull, Trash } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import ServiceIcon from "./icons/ServiceIcon.svg";

import PodIcon from "@/components/kubernetes-visualizer/icons/PodIcon";
import ControllerManagerIcon from "@/components/kubernetes-visualizer/icons/controller-manager-icon";
import {
  Pod,
  addPod,
  addService,
  removePod,
  removeService,
  updatePod,
} from "@/components/kubernetes-visualizer/kubernetes-slice";
import Button from "@/components/ui/button";
import Slider from "@/components/ui/slider";
import { cn, getNewService, randomNumberBetween } from "@/helpers/functions";
import { useAppSelector } from "@/helpers/store-hooks";

type Deployment = {
  [podId: string]: Pod;
};

const getAvailableIdForPod = (deployment: Deployment) => {
  if (Object.values(deployment).length > 0) {
    let tentativeId = `pod-${randomNumberBetween({ min: 1, max: 9999 })}`;

    while (deployment[tentativeId]) {
      tentativeId = `pod-${randomNumberBetween({ min: 1, max: 9999 })}`;
    }

    return tentativeId;
  }

  return `pod-1`;
};

const getIdsForNewPods = (deployment: Deployment, numOfPods: number = 1) => {
  const ids = new Set<string>();

  while (ids.size < numOfPods) {
    ids.add(`pod-${randomNumberBetween({ min: 1, max: 9999 })}`);
  }

  return Array.from(ids);
};

const getRandomIdFromDeployment = (
  deployment: Deployment,
  numOfIds: number = 1,
) => {
  const podIds = Object.values(deployment)
    .filter((pod) => pod.status === "Running")
    .map((pod) => pod.id);
  const randomIds = new Set<string>();

  while (randomIds.size < numOfIds) {
    randomIds.add(podIds[randomNumberBetween({ min: 0, max: podIds.length })]);
  }

  return Array.from(randomIds);
};

function formatAge(createdAt: string): string {
  const now = new Date();
  const duration = intervalToDuration({ start: createdAt, end: now });

  let formattedAge = "";

  // Add hours to the formatted string only if it's more than 0
  if (duration?.hours ?? 0 > 0) {
    formattedAge += `${duration?.hours}h`;
  }

  // Add minutes to the formatted string only if it's more than 0 or if there are hours
  if ((duration?.hours ?? 0) > 0 || (duration?.minutes ?? 0) > 0) {
    formattedAge += `${duration.minutes ?? 0}m`;
  }

  // Seconds are always added to the formatted string
  formattedAge += `${duration.seconds ?? 0}s`;

  return formattedAge;
}

const statusToColor = {
  Running: "var(--k8s-blue)",
  Terminating: "var(--red-500)",
  Pending: "var(--amber-600)",
  Failed: "var(--rose-500)",
  CrashLoopBackOff: "var(--rose-500)",
};

const podVariants = {
  initial: { scale: 1, opacity: 1 },
  animate: { scale: 1, opacity: 1 },
  exit: {
    scale: [1, 1.5, 0],
    opacity: [1, 0.5, 0],
    transition: { duration: 0.5 },
    rotate: [0, 10, -10, 0],
    x: [0, 20, -20, 0],
    y: [0, 30],
  },
};

type DeploymentComponentProps = {
  serviceId: number;
};

const DeploymentComponent = ({ serviceId }: DeploymentComponentProps) => {
  const serviceState = useAppSelector(
    (state) => state.kubernetes.services[serviceId],
  );
  const dispatch = useDispatch();

  const serviceName = serviceState.name;
  const pods = serviceState.pods;

  const isThereAPodWithPendingOrTerminatingStatus = Object.values(pods).some(
    (pod) => pod.status === "Pending" || pod.status === "Terminating",
  );

  const addPods = (numOfPodsToAdd: number = 1) => {
    const ids = getIdsForNewPods(pods, numOfPodsToAdd);
    const newPods: Pod[] = ids.map((id) => ({
      id,
      createdAt: new Date().toISOString(),
      status: "Pending",
    }));

    newPods.forEach((pod) => {
      dispatch(addPod({ serviceId, podId: pod.id }));
    });

    setTimeout(() => {
      newPods.forEach((pod) => {
        dispatch(updatePod({ serviceId, podId: pod.id, status: "Running" }));
      });
    }, 1500);
  };

  const killPods = (numOfPodsToKill: number = 1) => {
    const podIds = getRandomIdFromDeployment(pods, numOfPodsToKill);

    podIds.forEach((podId) => {
      dispatch(updatePod({ serviceId, podId, status: "Terminating" }));
    });

    setTimeout(() => {
      podIds.forEach((podId) => {
        dispatch(removePod({ serviceId, podId }));
      });
    }, 2000);
  };

  const updatePodCount = (newCount: number) => {
    const podsDifference = newCount - Object.keys(pods).length;

    if (podsDifference === 0) {
      return;
    }

    if (podsDifference < 0) {
      return killPods(Math.abs(podsDifference));
    }

    addPods(podsDifference);
  };

  return (
    <div className="flex flex-col items-center gap-8 rounded-lg bg-gray-800 px-2 py-4 text-gray-200 shadow-lg shadow-gray-700/50 dark:bg-gray-900">
      <motion.div className="flex items-center justify-center rounded-full">
        <h3 className="flex min-w-full  items-center gap-4 text-lg font-semibold">
          <ServiceIcon className="h-12 w-12" />
          {serviceName}
        </h3>
      </motion.div>
      <div className="flex min-h-48 min-w-full flex-col items-center justify-between">
        <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
          <thead>
            <tr>
              <td>name</td>
              <td>status</td>
              <td>age</td>
            </tr>
          </thead>
          <tbody>
            {Object.values(pods).map((pod, index) => (
              <motion.tr key={index} layout>
                <td>{pod.id}</td>
                <td className="min-16">{pod.status}</td>
                <td className="min-w-12">{formatAge(pod.createdAt)}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        <div className="flex gap-2">
          <AnimatePresence>
            {Object.values(pods).map((pod, index) => (
              <motion.div
                key={pod.id}
                layout
                initial="initial"
                animate="animate"
                exit="exit"
                variants={podVariants}
              >
                <PodIcon
                  title={pod.id.match(/\d+/g)?.join("") || ""}
                  className="h-12 w-12"
                  fillColor={statusToColor[pod.status]}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Slider<number>
          onChangeEnd={updatePodCount}
          label="Num of replicas (pods)"
          defaultValue={Object.keys(pods).length}
          minValue={1}
          maxValue={5}
          isDisabled={isThereAPodWithPendingOrTerminatingStatus}
        />

        <Button size="small" variant="destructive" onPress={() => killPods()}>
          <Skull />
          Kill a random pod
        </Button>
      </div>
    </div>
  );
};

export default function KubernetesVisualizer() {
  const servicesMap = useAppSelector((state) => state.kubernetes.services);
  const dispatch = useDispatch();

  const [_, setCurrentTime] = useState(new Date());

  const services = Object.values(servicesMap);

  const addNewService = () => {
    dispatch(addService(getNewService(services.map((svc) => svc.name))));
  };

  const deleteService = (id: number) => {
    dispatch(removeService(id));
  };

  const isAddServiceDisabled = services.length >= 4;

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={cn(
        "not-prose flex flex-col items-center gap-4 rounded-lg p-4 font-sans shadow-xl",
        "bg-blue-300 shadow-gray-400/50",
        "dark:bg-gray-800 dark:bg-opacity-75 dark:shadow-gray-700/50",
      )}
    >
      <h2 className="flex items-center gap-2 font-bold">
        <Image
          src="/icons/k8s/logo.svg"
          width={32}
          height={32}
          alt="Kubernetes Logo"
        />
        Kubernetes Visualizer
      </h2>
      <Button onPress={addNewService} isDisabled={isAddServiceDisabled}>
        {isAddServiceDisabled ? "Max Services Reached" : "Add Service"}
      </Button>

      <div className="min-w-full">
        <table className="min-w-full divide-y divide-gray-200 text-left text-base">
          <thead className="">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Type</th>
              <th scope="col">Age</th>
              <th scope="col" className="text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td className="py-1">{`${service.name}`}</td>
                <td className="py-1">0</td>
                <td className="min-w-16 py-1">
                  {formatAge(service.createdAt)}
                </td>{" "}
                {/* Example value */}
                <td className="py-1 text-right">
                  <Button
                    variant="destructive"
                    onPress={() => deleteService(service.id)}
                    aria-label="Delete Service"
                    size="icon"
                  >
                    <Trash size={16} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid min-w-full grid-cols-1 justify-center gap-4 sm:grid-cols-2">
        {services.slice(0, 2).map((service) => (
          <DeploymentComponent key={service.id} serviceId={service.id} />
        ))}
      </div>

      <div className="grid min-w-full grid-cols-1 items-center justify-center gap-4 text-center sm:grid-cols-[1fr_64px_1fr]">
        <div>Everything is fine!</div>
        <div>
          <ControllerManagerIcon />
        </div>
        <div>Everything is fine!</div>
      </div>

      <div className="grid min-w-full grid-cols-1 justify-center gap-4 sm:grid-cols-2">
        {services.slice(2).map((service) => (
          <DeploymentComponent key={service.id} serviceId={service.id} />
        ))}
      </div>
    </div>
  );
}
