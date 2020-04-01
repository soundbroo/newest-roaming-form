import { ASTRAL_ID } from "constants";

const setIdPrefix = (value, agent, activePage) => {
  const prefix = value?.slice(0, 3);

  switch (activePage) {
    case 0: {
      if (agent === "sender" && value?.length === 36 && prefix !== ASTRAL_ID)
        return `${ASTRAL_ID}${value}`;
      if (agent === "receiver") return value;
      return value;
    }
    case 1: {
      const operator = localStorage.getItem("operator");
      if (agent === "sender" && value?.length < 44 && prefix !== operator) {
        return `${operator}${value}`;
      }
      if (agent === "receiver") {
        if (value?.length === 36 && prefix !== ASTRAL_ID) {
          return `${ASTRAL_ID}${value}`;
        }
      }
      return value;
    }
  }
};

export default setIdPrefix;
