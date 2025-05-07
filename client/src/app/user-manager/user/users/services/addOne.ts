import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UseFormSetError } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import catchErrors from "../../../../../api/catchErrors";
import { ResponseErrorsI } from "../../../../../api/types/response.types";
import useUsersAPIs from "../api";
import useGetAllUsersParamsStore from "../store/useGetAllUsersParams.store";
import { AddUserFormData } from "../validations/addUser.validations";

export default function useAddUser(setError: UseFormSetError<AddUserFormData>) {
  const { addUser } = useUsersAPIs();
  const queryClient = useQueryClient();
  const { pagination, search, sort, status, type } =
    useGetAllUsersParamsStore();

  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: FormData) => addUser(data),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [
          "users",
          {
            fields: "id,email,username,type,status,phone,created_at,updated_at",
          },
          { page: pagination.page },
          { limit: pagination.limit },
          { search },
          { sort },
          { status },
          { type },
        ],
      });

      // Navigate To Users Page
      navigate("/users-management/users");
    },
    onError: (error: AxiosError<ResponseErrorsI<keyof AddUserFormData>>) =>
      catchErrors<AddUserFormData>(error, setError),
  });
}
