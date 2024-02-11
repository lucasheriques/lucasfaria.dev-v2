import * as React from "react";

import { random } from "./functions";

/**
 * A hoom that executes a callback inside a useInterval, where the interval
 * is a random number between the min and max values.
 */

type UseRandomIntervalArgs = {
  callback: () => void;
  minDelay?: number;
  maxDelay?: number;
};

const useRandomInterval = ({
  callback,
  minDelay,
  maxDelay,
}: UseRandomIntervalArgs) => {
  const timeoutId = React.useRef<number | null>(null);
  const savedCallback = React.useRef(callback);

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    if (!minDelay || !maxDelay) {
      return;
    }

    const handleTicket = () => {
      const nextTickAt = random(minDelay, maxDelay);

      timeoutId.current = window.setTimeout(() => {
        savedCallback.current();
        handleTicket();
      }, nextTickAt);
    };

    handleTicket();

    return () => {
      if (timeoutId.current) {
        window.clearTimeout(timeoutId.current);
      }
    };
  }, [maxDelay, minDelay]);

  const cancel = React.useCallback(() => {
    if (timeoutId.current) {
      window.clearTimeout(timeoutId.current);
    }
  }, []);

  return cancel;
};

export default useRandomInterval;
