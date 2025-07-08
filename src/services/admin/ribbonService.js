import {
  getAllRibbonsApi,
  getRibbonByIdApi,
  createRibbonApi,
  updateRibbonApi,
  deleteRibbonApi,
} from "../../api/ribbonApi";

export async function fetchRibbons() {
  const res = await getAllRibbonsApi();
  if (!res.ok) throw new Error("Failed to fetch ribbons");
  const data = await res.json();
  return data.data || [];
}

export async function fetchRibbonById(id) {
  const res = await getRibbonByIdApi(id);
  if (!res.ok) throw new Error("Failed to fetch ribbon");
  const data = await res.json();
  return data.data;
}

export async function createRibbon(ribbon) {
  const res = await createRibbonApi(ribbon);
  if (!res.ok) throw new Error("Failed to create ribbon");
  return await res.json();
}

export async function updateRibbon(id, ribbon) {
  const res = await updateRibbonApi(id, ribbon);
  if (!res.ok) throw new Error("Failed to update ribbon");
  return await res.json();
}

export async function deleteRibbon(id) {
  const res = await deleteRibbonApi(id);
  if (!res.ok) throw new Error("Failed to delete ribbon");
  return await res.json();
}
