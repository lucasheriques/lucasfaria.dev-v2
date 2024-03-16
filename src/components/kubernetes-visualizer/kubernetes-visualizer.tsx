import { intervalToDuration } from "date-fns";
import { motion } from "framer-motion";
import { Skull, Trash } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";

import ServiceIcon from "./icons/ServiceIcon.svg";

import PodIcon from "@/components/kubernetes-visualizer/icons/PodIcon";
import Button from "@/components/ui/button";
import Slider from "@/components/ui/slider";
import { cn, getNewService } from "@/helpers/functions";

type Pod = {
  id: number;
  createdAt: Date;
  status: "Running" | "Terminating" | "Pending" | "Failed" | "CrashLoopBackOff";
};

type Service = {
  id: number;
  name: string;
  pods: Pod[];
  createdAt: Date;
};

type ServiceComponentProps = {
  service: Service;
  updateServiceById: (id: number, newService: Service) => void;
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
  serviceIndex: number;
  services: Service[];
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

const ServiceComponent = ({
  service,
  setServices,
  updateServiceById,
  serviceIndex,
  services,
}: ServiceComponentProps) => {
  const [podCount, setPodCount] = useState(service.pods.length);
  const updatePodCount = (value: number) => {
    const podsDifference = value - service.pods.length;

    const getMaximumIdFromPods = () => {
      if (service.pods.length > 0) {
        return Math.max(...service.pods.map((pod) => pod.id));
      }

      return 1;
    };

    if (podsDifference === 0) {
      return;
    }

    if (podsDifference > 0) {
      const newPods = Array.from({ length: podsDifference }, (_, idx) => ({
        id: getMaximumIdFromPods() + idx,
        createdAt: new Date(),
        status: "Pending" as const,
      }));
      const updatedService = {
        ...service,
        pods: [...service.pods, ...newPods],
      };
      const newServices = services.map((s, idx) =>
        idx === serviceIndex ? updatedService : s,
      );
      return setServices(newServices);
    }

    killPod(Math.abs(podsDifference));
  };

  const debouncedUpdatePodCount = useDebounceCallback(updatePodCount, 1000);

  const handleSliderUpdate = (value: number) => {
    setPodCount(value);
    debouncedUpdatePodCount(value);
  };

  const killPodById = (id: number) => {
    const updatedPods = service.pods.map((pod) => ({
      ...pod,
      status: pod.id === id ? "Terminating" : pod.status,
    }));
    const updatedService = { ...service, pods: updatedPods };
    updateServiceById(service.id, updatedService);

    setTimeout(() => {
      const newPods = service.pods.filter((pod) => pod.id !== id);
      const updatedService = { ...service, pods: newPods };
      updateServiceById(service.id, updatedService);
    }, 2000);
  };

  const killPod = (numOfPodsToKill: number = 1) => {
    // get random pods to kill based on the number of pods to kill
    const randomPodsToKill = service.pods
      .map((pod) => pod.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, numOfPodsToKill);

    const updatedPods = service.pods.map((pod) => ({
      ...pod,
      status: randomPodsToKill.includes(pod.id) ? "Terminating" : pod.status,
    }));

    const updatedService = { ...service, pods: updatedPods };
    updateServiceById(service.id, updatedService);

    setTimeout(() => {
      const newPods = service.pods.filter(
        (pod) => !randomPodsToKill.includes(pod.id),
      );
      const updatedService = { ...service, pods: newPods };
      updateServiceById(service.id, updatedService);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center gap-8 rounded-lg border-2 border-dashed bg-gray-800 bg-opacity-50 px-2 py-4 shadow-lg shadow-gray-700/50">
      <motion.div className="flex items-center justify-center rounded-full">
        <h3 className="flex min-w-full  items-center gap-4 text-lg font-semibold">
          <ServiceIcon className="h-12 w-12" />
          {service.name}
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
            {service.pods.map((pod, index) => (
              <motion.tr key={index} layout>
                <td>pod-{pod.id}</td>
                <td className="min-16">{pod.status}</td>
                <td className="min-w-12">{formatAge(pod.createdAt)}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        <div className="flex gap-2">
          {service.pods.map((pod, index) => (
            <motion.div key={index} layout>
              <PodIcon title={`pod-${pod.id}`} className="h-12 w-12" />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Slider
          value={podCount}
          onChange={handleSliderUpdate}
          label="Num of replicas (pods)"
          defaultValue={service.pods.length}
          minValue={1}
          maxValue={5}
        />

        <Button size="small" variant="destructive" onPress={() => killPod()}>
          <Skull />
          Kill a random pod
        </Button>
      </div>
    </div>
  );
};

export default function KubernetesVisualizer() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [services, setServices] = useState<Service[]>(() => [
    {
      id: Math.random(),
      name: getNewService([]),
      pods: [{ id: 1, createdAt: new Date(), status: "Pending" }],
      createdAt: new Date(),
    },
  ]);

  const addNewService = () => {
    const newService: Service = {
      id: Math.random(),
      name: getNewService(services.map((svc) => svc.name)),
      pods: [{ id: 1, createdAt: new Date(), status: "Pending" }],
      createdAt: new Date(),
    };
    setServices([...services, newService]);
  };

  const updateServiceById = (id: number, newService: Service) => {
    const newServices = services.map((service) =>
      service.id === id ? newService : service,
    );
    setServices(newServices);
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);

    return () => clearInterval(timer);
  }, []);

  const deleteService = (id: number) => {
    const newServices = services.filter((service) => service.id !== id);
    setServices(newServices);
  };

  const isAddServiceDisabled = services.length >= 4;

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
                <td className="py-1">{service.pods.length}</td>
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
        {services.map((service, index) => (
          <ServiceComponent
            key={service.id}
            service={service}
            setServices={setServices}
            updateServiceById={updateServiceById}
            serviceIndex={index}
            services={services}
          />
        ))}
      </div>
    </div>
  );
}
