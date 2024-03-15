import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

import Button from "@/components/ui/button";
import Slider from "@/components/ui/slider";
import { cn } from "@/helpers/functions";

type Pod = {
  id: number;
};

type Service = {
  id: number;
  pods: Pod[];
};

type ServiceComponentProps = {
  service: Service;
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
  serviceIndex: number;
  services: Service[];
};

const ServiceComponent = ({
  service,
  setServices,
  serviceIndex,
  services,
}: ServiceComponentProps) => {
  const updatePodCount = (value: number) => {
    const newPods = Array.from({ length: value }, (_, i) => ({ id: i }));
    const updatedService = { ...service, pods: newPods };
    const newServices = services.map((s, idx) =>
      idx === serviceIndex ? updatedService : s,
    );
    setServices(newServices);
  };

  const killPod = () => {
    const newPods = service.pods.slice(1);
    if (newPods.length === 0) newPods.push({ id: 0 }); // Ensure at least one pod
    const updatedService = { ...service, pods: newPods };
    const newServices = services.map((s, idx) =>
      idx === serviceIndex ? updatedService : s,
    );
    setServices(newServices);
  };

  return (
    <div className="flex flex-col items-center gap-2 rounded-lg border-2 border-dashed bg-gray-800 bg-opacity-50 p-4 shadow-lg shadow-gray-700/50">
      <motion.div className="flex h-24 w-24 items-center justify-center rounded-full">
        <Image
          src="/icons/k8s/svc.svg"
          width={64}
          height={64}
          alt="K8s Service"
        />
      </motion.div>
      <Slider
        onChange={updatePodCount}
        label={`Replicas for Service ${service.id}`}
        defaultValue={service.pods.length}
        minValue={1}
        maxValue={5}
      />
      <Button variant="destructive" onPress={killPod}>
        Kill a Pod
      </Button>
      <div className="mt-4 flex gap-2">
        {service.pods.map((pod, index) => (
          <motion.div key={index} layout>
            <Image
              src="/icons/k8s/pod.svg"
              width={48}
              height={48}
              alt="K8s Pod"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default function KubernetesVisualizer() {
  const [services, setServices] = useState<Service[]>([
    { id: 1, pods: [{ id: 0 }] },
  ]);

  const addNewService = () => {
    const newService: Service = { id: services.length + 1, pods: [{ id: 0 }] };
    setServices([...services, newService]);
  };

  return (
    <>
      {/* Component I'm looking to add some depth*/}
      <div
        className={cn(
          "not-prose flex flex-col items-center gap-4 rounded-lg p-4 shadow-xl",
          "bg-blue-400 shadow-gray-400/50",
          "dark:bg-gray-800 dark:bg-opacity-75 dark:shadow-gray-700/50",
        )}
      >
        <span className="flex items-center justify-center gap-2 font-bold">
          <Image
            src="/icons/k8s/logo.svg"
            width={32}
            height={32}
            alt="Kubernetes Logo"
          />
          Kubernetes Visualizer
        </span>
        <Button onPress={addNewService}>Add a new service</Button>
        <div className="grid min-w-full grid-cols-1 justify-center gap-4 sm:grid-cols-2">
          {services.map((service, index) => (
            <ServiceComponent
              key={service.id}
              service={service}
              setServices={setServices}
              serviceIndex={index}
              services={services}
            />
          ))}
        </div>
      </div>
    </>
  );
}
