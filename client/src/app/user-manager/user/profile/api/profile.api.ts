import { getData } from "../../../../../api/methods";
import { UserModel } from "../../../../../shared/types/models/User.model";
import useUserStore from "../../../../../store/user.store";

const useProfileAPIs = () => {
  const setUser = useUserStore((s) => s.setUser);
  // GET Logged User
  async function getLoggedUser() {
    const res = await getData<UserModel>(`/users/logged`);
    if (res.status === 200) {
      setUser(res.data);
    }
    return res.data;
  }

  return { getLoggedUser };
};

export default useProfileAPIs;
