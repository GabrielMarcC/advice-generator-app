import { useEffect, useState, useCallback } from "react";
import { postService } from "./service/post";
import dataIcon from "./images/icon-dice.svg";
import dividerIcon from "./images/pattern-divider-desktop.svg";
import dividerIconMobile from "./images/pattern-divider-mobile.svg";
import "./App.css";

export type Data = {
  slip: {
    id: number;
    advice: string;
  };
};

function App() {
  const [data, setData] = useState<Data>({} as Data);

  useEffect(() => {
    const asyncAction = async () => {
      const response = await postService.get();
      setData(response);
    };

    asyncAction();
  }, []);

  const handleRequest = useCallback(async () => {
    const Request: Data = await postService.get();

    if (!adviceAlreadyExists(Request)) {
      setData(Request);
    }
  }, [data]);

  const adviceAlreadyExists = (receiveData: Data) => {
    const alreadyExists = receiveData.slip.id === data.slip.id;
    alreadyExists && handleRequest();
    return alreadyExists;
  };

  const verifyData = (d: Data) => {
    if (data && !data?.slip?.advice) {
      return <p>Loading...</p>;
    }

    return d.slip.advice;
  };

  return (
    <div className="App">
      <main className="Main">
        <div className="Card">
          <div className="ContainerContent">
            <h2>ADVICE # {data?.slip?.id}</h2>
            <p>"{verifyData(data)}"</p>
          </div>
          <div className="divider">
            <picture>
              <source media="(max-width: 670px)" srcSet={dividerIconMobile} />
              <img
                className="dividerImg"
                src={dividerIcon}
                alt="divider icon"
              />
            </picture>
          </div>
          <div className="ButtonStyle">
            <button className="CardButton" onClick={handleRequest}>
              <img src={dataIcon} alt="data icon" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
