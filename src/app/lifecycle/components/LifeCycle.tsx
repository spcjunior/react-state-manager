import React, { useEffect, useState } from "react";
import { useStyles } from "../../../hooks/useStyles";

const LifeCycle: React.FC = () => {
  const classes = useStyles({});
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    console.log("DidMount");
    return () => {
      console.log("Unmount");
    };
  }, []);

  useEffect(() => {
    console.log(`${count} Updated`);
  }, [count]);

  return (
    <div className={classes.lifecycle}>
      <label>Lifecycle</label>
      <div>
        <button onClick={() => setCount(count - 1)}> {` < `}</button>
        <label>{count}</label>
        <button onClick={() => setCount(count + 1)}> {` > `}</button>
      </div>
      {count > 10 && <span>Warning!!!</span>}
    </div>
  );
};

export default LifeCycle;
