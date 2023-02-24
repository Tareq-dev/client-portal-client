import { useEffect, useState } from "react";

const useClient = () => {
  const [client, setClients] = useState([]);

  useEffect(() => {
    fetch("https://client-portal-xi.vercel.app/client")
      .then((res) => res.json())
      .then((data) => setClients(data));
  }, [client._id]);

  return [client];
};
export default useClient;
