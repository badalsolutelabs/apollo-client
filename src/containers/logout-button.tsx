import React from "react";
import styled from "react-emotion";
import { useApolloClient } from "@apollo/react-hooks";

import { menuItemClassName } from "../components/menu-item";
import { ReactComponent as ExitIcon } from "../assets/icons/exit.svg";

export default function LogoutButton() {
  const client = useApolloClient();

  return (
    <StyledButton
    data-testid="logout-button"
      onClick=
      {() => {
        client.writeData({ data: { isLoggedIn: false } });
        localStorage.clear();
      }}>
      <ExitIcon />
      LOGOUT
    </StyledButton>
  );
}

const StyledButton = styled("button")(menuItemClassName, {
  background: "node",
  border: "none",
  padding: 0
});

// const LogoutButton: React.FC<any> = () => {
//   return <div />;
// };

// export default LogoutButton;