import { AUTH } from "../../../constants";

export const restoreUser = () => {
  const user = localStorage.getItem(AUTH.user);
  let decodedUser = {};
  if (user) {
    decodedUser = JSON.parse(user);
  }
  return decodedUser;
};
