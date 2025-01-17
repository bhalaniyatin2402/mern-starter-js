import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  useGetUserDetailsQuery,
  useGetUsersListQuery,
  useLogoutMutation,
} from "../redux/services/auth.services";
import { setCredentials } from "../redux/slices/auth.slice";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((store) => store.auth);
  const { isLoading, data, error } = useGetUserDetailsQuery();
  const { isLoading: fetching, data: users } = useGetUsersListQuery()
  const [logout, { isLoading: loading }] = useLogoutMutation();

  if (isLoading && fetching) {
    return <h1>Loading...</h1>;
  }

  if (!isLoggedIn || error) {
    return navigate("/login");
  }

  async function handleLogout() {
    const res = await logout();
    if (res?.data) {
      dispatch(setCredentials({ isLoggedIn: false }));
      return navigate("/login");
    }
    if (res?.error) {
      console.log(res?.error?.data?.message);
    }
  }

  return (
    <>
      <h1 className="text-4xl text-center">{data?.data?.username}</h1>
      <button
        onClick={handleLogout}
        className="bg-red-400 px-4 py-1 mx-5 mb-10 font-bold rounded-lg"
        disabled={loading}
      >
        Logout
      </button>
      {users?.data?.map((user) => (
        <div className="mx-5 my-1" key={user.id}><b>{user.username} : </b>{user.email}</div>
      ))}
    </>
  );
}
