import React from "react";
import { Slot, useFocusEffect } from "expo-router";
import { useAppDispatch } from "@/store/hook";
import { userActions } from "@/store/reducers/userReducer";
import { clubActions } from "@/store/reducers/clubReducer";
import { membersActions } from "@/store/reducers/membersReducer";
import { getData } from "@/actions/user";

const MainLayout: React.FC = () => {
  const dispatch = useAppDispatch();

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        const result = await getData();

        if (result.success) {
          dispatch(userActions.setUser({ user: result.user }));
          dispatch(clubActions.setClub({ club: result.club }));
          dispatch(membersActions.setMembers({ members: result.members }));
        }
      })();
    }, [dispatch])
  );

  return <Slot />;
};

export default MainLayout;
