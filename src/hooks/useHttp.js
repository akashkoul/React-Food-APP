import { useCallback, useEffect } from "react";
import { useState } from "react";

async function sendHttpReq(url, config) {
  const resp = await fetch(url, config);
  const resData = await resp.json();

  if (!resp.ok) {
    throw new Error(resData.message || "Something Wrong");
  }

  return resData;
}

export default function useHttp(url, config, intialData) {
  const [data, setData] = useState(intialData);
  const [err, setErr] = useState();
  const [loading, setLoading] = useState(false);
  function clearData() {
    setData(intialData);
  }
  const sendReq = useCallback(
    async function sendReq(data) {
      setLoading(true);
      try {
        const resData = await sendHttpReq(url, { ...config, body: data });
        setData(resData);
      } catch (error) {
        setErr(error.message || "Something went wrong");
      }
      setLoading(false);
    },
    [url, config],
  );

  useEffect(() => {
    console.log("configconfig", config);
    if (!config || (config && (!config.method || config.method === "GET")))
      sendReq();
  }, [sendReq, config]);

  return {
    data,
    err,
    loading,
    sendReq,
    clearData
  };
}
