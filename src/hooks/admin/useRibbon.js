import { useState, useEffect } from "react";
import {
  fetchRibbons,
  fetchRibbonById,
  createRibbon,
  updateRibbon,
  deleteRibbon,
} from "../../services/admin/ribbonService";

export function useRibbon() {
  const [ribbons, setRibbons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadRibbons = async () => {
    try {
      const data = await fetchRibbons();
      setRibbons(data);
      setLoading(false);
    } catch (err) {
      setError(err.message || "Error loading ribbons");
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRibbons();
  }, []);

  const addRibbon = async (ribbon) => {
    await createRibbon(ribbon);
    await loadRibbons();
  };

  const editRibbon = async (id, ribbon) => {
    await updateRibbon(id, ribbon);
    await loadRibbons();
  };

  const removeRibbon = async (id) => {
    await deleteRibbon(id);
    await loadRibbons();
  };

  const getRibbonById = async (id) => {
    return await fetchRibbonById(id);
  };

  return {
    ribbons,
    loading,
    error,
    addRibbon,
    editRibbon,
    removeRibbon,
    getRibbonById,
  };
}
