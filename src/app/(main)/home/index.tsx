import React from "react";
import { useAppSelector } from "@/store/hook";
import { CommonScreen, MemberScreen, OwnerScreen } from "@/screens/dashboard";
import { Wrapper } from "@/components";
import { isEmpty } from "@/lib/functions";

const Dashbaord: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);

  return (
    <Wrapper>
      {!isEmpty(user?.club) || !isEmpty(user?.clublist) ? (
        user?.role === "owner" ||
        user?.functions?.includes("dashboard-club-status") ||
        user?.functions?.includes("dashboard-club-latest") ||
        user?.functions?.includes("dashboard-club-steps") ? (
          <OwnerScreen />
        ) : (
          <MemberScreen />
        )
      ) : (
        <CommonScreen />
      )}
    </Wrapper>
  );
};

export default Dashbaord;
