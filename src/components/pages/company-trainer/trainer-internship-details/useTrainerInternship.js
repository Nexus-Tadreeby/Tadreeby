import { useEffect, useState } from "react";
import { trainerAPI } from "../../../../services/api";

const initialState = { loading: true, data: null, error: "" };

export function useTrainerInternship(internshipId = 1) {
  const [state, setState] = useState(initialState);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    trainerAPI
      .getInternship(internshipId, controller.signal)
      .then((data) => {
        if (!data?.header || !data?.stats || !data?.overview || !data?.about) {
          throw new Error("The internship response is incomplete.");
        }
        if (!controller.signal.aborted) {
          setState({ loading: false, data, error: "" });
        }
      })
      .catch((error) => {
        if (!controller.signal.aborted) {
          setState({
            loading: false,
            data: null,
            error: error.message || "Unable to load internship details.",
          });
        }
      });

    return () => controller.abort();
  }, [attempt, internshipId]);

  const retry = () => {
    setState(initialState);
    setAttempt((value) => value + 1);
  };

  return { ...state, retry };
}
