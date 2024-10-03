import axiosClient from "./apiClient";

export const appAPI = {
  getAPI: () => {
    const url = `/api/web`;
    return axiosClient.get(url);
  },
};
