import React from "react";
import RoamingState from "pages/RoamingState";
import AxiosService from "api";

export const redirectToStatusCheck = async (result, setActivePage) => {
  const axios = new AxiosService();
  const data = result.data;
  const [s, setS] = React.useState(null);
  if (result.data.status === 0) {
    const getStatus = async () => {
      const status = await axios.status(
        data.sender[0].input.id,
        data.request_id
      );

      console.log(1);
      return status.data.text;
    };

    const status = await getStatus();

    if (status) {
      setS(status);
      setActivePage(2);
      console.log(2);
      return <RoamingState status={s} />;
    }

    // .then(res => {
    //   console.log(res);
    //   setActivePage(2);

    //   const text = res.data.text;
    //   console.log(text);
    //   page = <RoamingState status={text} />;
    // });

    // console.log("requestState?.", requestState.get());
    // setTimeout(() => {
    //   return page;
    // }, 2000);
  }
};
