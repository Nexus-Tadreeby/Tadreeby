import { useEffect, useState } from "react";
import { internshipAPI, opportunitiesAPI } from "../../../../services/api";
import { useAuth } from "../../../../context/AuthContext";
import { mapStudentInternship } from "./studentInternship.utils";

export function useStudentInternship() {
  const { user } = useAuth();
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState({ loading: true, data: null, error: "" });
  useEffect(() => {
    let current = true;
    async function load() {
      try {
        const response = await internshipAPI.getMyInternships();
        const list = response?.data ?? response;
        if (!Array.isArray(list)) throw new Error("Invalid internship list");
        if (!list.length) {
          if (current) setState({ loading: false, data: null, error: "" });
          return;
        }
        const active = list.find((item) => (item.internship?.status ?? item.status) === "ACTIVE") || list[0];
        const id = active.internship?.id ?? active.id;
        if (!id) throw new Error("Missing internship ID");
        const result = await opportunitiesAPI.getInternshipDetails(id);
        const details = result?.data ?? result;
        if (!details || typeof details !== "object" || Array.isArray(details)) throw new Error("Invalid internship details");
        if (current) setState({ loading: false, data: mapStudentInternship(result), error: "" });
      } catch {
        if (current) setState({ loading: false, data: null, error: "We couldn't load your internship. Please try again." });
      }
    }
    load();
    return () => { current = false; };
  }, [user?.id, attempt]);
  const retry = () => {
    setState({ loading: true, data: null, error: "" });
    setAttempt((value) => value + 1);
  };
  return { ...state, retry };
}
