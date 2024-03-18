import { intervalToDuration } from "date-fns";
import { motion } from "framer-motion";
import { produce } from "immer";
import { Skull, Trash } from "lucide-react";
import Image from "next/image";
import { useEffect, useReducer, useState } from "react";

import ServiceIcon from "./icons/ServiceIcon.svg";

import PodIcon from "@/components/kubernetes-visualizer/icons/PodIcon";
import Button from "@/components/ui/button";
import Slider from "@/components/ui/slider";
import { cn, getNewService, randomNumberBetween } from "@/helpers/functions";

type Pod = {
  id: string;
  createdAt: Date;
  status: "Running" | "Terminating" | "Pending" | "Failed" | "CrashLoopBackOff";
};

type Service = {
  id: number;
  name: string;
  pods: { [podId: string]: Pod };
  createdAt: Date;
};

type DeploymentComponentProps = {
  serviceName: string;
};

type Deployment = {
  [podId: string]: Pod;
};

type ActionType =
  | { type: "ADD_POD"; payload: Pod }
  | { type: "UPDATE_POD"; payload: { id: string; status: Pod["status"] } }
  | { type: "COMMIT_POD"; payload: Pod }
  | { type: "REMOVE_POD"; payload: { id: string } };

const podReducer = (state: Deployment, action: ActionType) => {
  switch (action.type) {
    case "ADD_POD":
      return produce(state, (draft) => {
        draft[action.payload.id] = action.payload;
      });
    case "UPDATE_POD":
      return produce(state, (draft) => {
        if (draft[action.payload.id]) {
          draft[action.payload.id].status = action.payload.status;
        }
      });
    case "COMMIT_POD":
      return produce(state, (draft) => {
        draft[action.payload.id] = action.payload;
      });
    case "REMOVE_POD":
      return produce(state, (draft) => {
        delete draft[action.payload.id];
      });
    default:
      throw new Error(`Unhandled action type`);
  }
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

const getRandomIdFromDeployment = (
  deployment: Deployment,
  numOfIds: number = 1,
) => {
  const podIds = Object.keys(deployment);
  const randomIds = new Set<string>();

  while (randomIds.size < numOfIds) {
    randomIds.add(podIds[randomNumberBetween({ min: 0, max: podIds.length })]);
  }

  return Array.from(randomIds);
};

function formatAge(createdAt: Date): string {
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

const addPodsToService = (service: Service, pods: Pod[]) => {
  const updatedService = produce(service, (draft) => {
    pods.forEach((pod) => {
      draft.pods[pod.id] = pod;
    });
  });

  return updatedService;
};

const updatePodsToStatus = (
  service: Service,
  podIds: string[],
  status: Pod["status"],
) => {
  console.log({ service, podIds, status });
  const updatedService = produce(service, (draft) => {
    podIds.forEach((podId) => {
      draft.pods[podId].status = status;
    });
  });
  return updatedService;
};

const removePodsFromService = (service: Service, podIds: string[]) => {
  const updatedService = produce(service, (draft) => {
    podIds.forEach((podId) => {
      delete draft.pods[podId];
    });
  });
  return updatedService;
};

const DeploymentComponent = ({ serviceName }: DeploymentComponentProps) => {
  const [state, dispatch] = useReducer(podReducer, {
    "pod-1": {
      id: "pod-1",
      createdAt: new Date(),
      status: "Running",
    },
  });

  const addPods = (numOfPodsToAdd: number = 1) => {
    const newPods: Pod[] = Array.from({ length: numOfPodsToAdd }, () => ({
      id: getAvailableIdForPod(state),
      createdAt: new Date(),
      status: "Pending",
    }));

    newPods.forEach((pod) => {
      dispatch({ type: "ADD_POD", payload: pod });
    });
  };

  const killPods = (numOfPodsToKill: number = 1) => {
    const podIds = getRandomIdFromDeployment(state, numOfPodsToKill);

    podIds.forEach((podId) => {
      dispatch({ type: "REMOVE_POD", payload: { id: podId } });
    });
  };

  const updatePodCount = (newCount: number) => {
    const podsDifference = newCount - Object.keys(state).length;

    if (podsDifference === 0) {
      return;
    }

    if (podsDifference < 0) {
      return killPods(Math.abs(podsDifference));
    }

    addPods(podsDifference);
  };

  return (
    <div className="flex flex-col items-center gap-8 rounded-lg border-2 border-dashed bg-gray-800 bg-opacity-50 px-2 py-4 shadow-lg shadow-gray-700/50">
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
            {Object.values(state).map((pod, index) => (
              <motion.tr key={index} layout>
                <td>{pod.id}</td>
                <td className="min-16">{pod.status}</td>
                <td className="min-w-12">{formatAge(pod.createdAt)}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        <div className="flex gap-2">
          {Object.values(state).map((pod, index) => (
            <motion.div key={index} layout>
              <PodIcon
                title={pod.id.match(/\d+/g)?.join("") || ""}
                className="h-12 w-12"
              />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Slider
          onChangeEnd={updatePodCount}
          label="Num of replicas (pods)"
          defaultValue={Object.keys(state).length}
          minValue={1}
          maxValue={5}
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
  const [_, setCurrentTime] = useState(new Date());
  const [services, setServices] = useState<Omit<Service, "pods">[]>(() => [
    {
      id: Math.random(),
      name: "blacksmith-forge",
      createdAt: new Date(),
    },
  ]);

  const addNewService = () => {
    setServices([
      ...services,
      {
        id: Math.random(),
        name: getNewService(services.map((svc) => svc.name)),
        createdAt: new Date(),
      },
    ]);
  };

  const deleteService = (id: number) => {
    const newServices = services.filter((service) => service.id !== id);
    setServices(newServices);
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
        "bg-blue-400 shadow-gray-400/50",
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
        {services.map((service) => (
          <DeploymentComponent key={service.id} serviceName={service.name} />
        ))}
      </div>
    </div>
  );
}
