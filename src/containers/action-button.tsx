import React from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { GET_LAUNCH_DETAILS } from "../pages/launch";
// import Button from "../components/button";
import * as LaunchDetailTypes from "../pages/__generated__/LaunchDetails";

const TOGGLE_CART = gql`
  mutation addOrRemoveFromCart($launchId: ID!) {
    addOrRemoveFromCart(id: $launchId) @client
  }
`;

export const CANCEL_TRIP = gql`
  mutation cancel($launchId: ID!) {
    cancelTrip(launchId: $launchId) {
      success
      message
      launches {
        id
        isBooked
      }
    }
  }
`;

interface ActionButtonProps
  extends Partial<LaunchDetailTypes.LaunchDetails_launch> {}

const ActionButton: React.FC<ActionButtonProps> = ({
  isBooked,
  id,
  isInCart
}) => {
  const [mutate, { loading, error }] = useMutation(
    isBooked ? CANCEL_TRIP : TOGGLE_CART,
    {
      variables: { launchId: id },
      refetchQueries: [
        { query: GET_LAUNCH_DETAILS, variables: { launchId: id } }
      ]
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>An error occurred</p>;

  return (
    <div>
      <button onClick={() => mutate()} data-testid={"action-button"}>
        {isBooked
          ? "Cancel This Trip"
          : isInCart
          ? "Remove from Cart"
          : "Add to cart"}
      </button>
    </div>
  );
};

export default ActionButton;
