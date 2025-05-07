import {
  Location,
  NavigateFunction,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { create } from "zustand";

interface PaginationParams {
  page: number;
  limit: number;
}

interface GetAllGroupsParamsStore {
  pagination: PaginationParams;
  search: string;
  sort: string;
  status: string;
  type: string;
  handlePagination: (page: number) => void;
  handleChangeLimit: (limit: number) => void;
  handleSearch: (search: string) => void;
  handleSort: (sort: string) => void;
  handleStatus: (status: string) => void;
  handleType: (type: string) => void;
}

const useGroupsSearchParams = (
  location: Location,
  navigate: NavigateFunction,
) => {
  const params = new URLSearchParams(location.search);
  return create<GetAllGroupsParamsStore>((_) => ({
    pagination: {
      page: parseInt(params.get("page") || "1", 10),
      limit: parseInt(params.get("limit") || "5", 10),
    },
    search: params.get("search") || "",
    sort: params.get("sort") || "",
    status: params.get("status") || "",
    type: params.get("type") || "",

    handleType: (type: string) => {
      if (type) {
        params.set("page", "1");
        params.set("type", type);
        navigate({
          pathname: location.pathname,
          search: params.toString(),
        });
      } else {
        params.delete("type");
        navigate({
          pathname: location.pathname,
          search: params.toString(),
        });
      }
    },

    handleSearch: (search: string) => {
      if (search) {
        params.set("page", "1");
        params.set("search", search);
        navigate({
          pathname: location.pathname,
          search: params.toString(),
        });
      } else {
        params.delete("search");
        navigate({
          pathname: location.pathname,
          search: params.toString(),
        });
      }
    },

    handleStatus: (status: string) => {
      if (status) {
        params.set("page", "1");
        params.set("status", status);
        navigate({
          pathname: location.pathname,
          search: params.toString(),
        });
      } else {
        params.delete("status");
        navigate({
          pathname: location.pathname,
          search: params.toString(),
        });
      }
    },

    handleSort: (sortKey: string) => {
      const currentSort = params.get("sort");
      const newSort =
        currentSort === sortKey
          ? `-${sortKey}`
          : currentSort === `-${sortKey}`
            ? sortKey
            : `-${sortKey}`;

      params.set("page", "1");
      params.set("sort", newSort);
      navigate({
        pathname: location.pathname,
        search: params.toString(),
      });
    },

    handlePagination: (page: number) => {
      params.set("page", `${page}`);
      navigate({
        pathname: location.pathname,
        search: params.toString(),
      });
    },

    handleChangeLimit: (limit: number) => {
      params.set("page", `1`);
      params.set("limit", `${limit}`);
      navigate({
        pathname: location.pathname,
        search: params.toString(),
      });
    },
  }));
};

const useGetAllGroupsParamsStore = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return useGroupsSearchParams(location, navigate)();
};

export default useGetAllGroupsParamsStore;
