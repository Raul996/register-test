import React from "react";
import { RegistareState } from "../redux/reducers/registerReduser";
import { useSelector } from "react-redux";

const useAuth = () => {
  const { user } = useSelector((state: any) => state.registerReduser);

  return user !== undefined && user !== null;
};

export default useAuth;
