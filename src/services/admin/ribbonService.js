import {
  getAllRibbonsApi,
  getRibbonByIdApi,
  createRibbonApi,
  updateRibbonApi,
  deleteRibbonApi,
} from "../../api/ribbonApi";


export async function fetchRibbons() {
  const response = await getAllRibbonsApi();
  return response.data.data || [];
}


export async function fetchRibbonById(id) {
  const response = await getRibbonByIdApi(id);
  return response.data.data;
}


export async function createRibbon(ribbon) {
  const response = await createRibbonApi(ribbon);
  return response.data;
}

export async function updateRibbon(id, ribbon) {
  const response = await updateRibbonApi(id, ribbon);
  return response.data;
}

export async function deleteRibbon(id) {
  const response = await deleteRibbonApi(id);
  return response.data;
}