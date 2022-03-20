import React from "react";

const Home: React.FC = () => {
  return (
    <div>
      <h1>State Management in React</h1>
      <label>Things you need to know</label>
      <ul>
        <li>
          <a href="https://reactjs.org/docs/hooks-state.html" target="_blank">
            https://reactjs.org/docs/hooks-state.html
          </a>
        </li>
        <li>
          <a
            href="https://reactjs.org/docs/state-and-lifecycle.html"
            target="_blank"
          >
            https://reactjs.org/docs/state-and-lifecycle.html
          </a>
        </li>
        <li>
          <a
            href="https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/"
            target="_blank"
          >
            https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
          </a>
        </li>
      </ul>
      <h1>Technologies</h1>
      <ul>
        <li>
          <a href="https://reactjs.org/docs/context.html" target="_blank">
            React v17 context-api
          </a>
        </li>
        <li>
          <a href="https://zustand.surge.sh/" target="_blank">
            Zustand v3.7 state-manager
          </a>
        </li>
        <li>
          <a href="https://redux-toolkit.js.org/" target="_blank">
            Redux Toolkit v1.8 state-manager
          </a>
        </li>
        <li>
          <a
            href="https://reactrouter.com/docs/en/v6/getting-started/installation"
            target="_blank"
          >
            React Router v6
          </a>
        </li>
        <li>
          <a href="https://vitejs.dev/" target="_blank">
            Vite v2.6
          </a>
        </li>
      </ul>
      <h1>Optimizing render</h1>
      <ul>
        <li>
          <a
            href="https://reactjs.org/docs/hooks-reference.html#usecallback"
            target="_blank"
          >
            useCallback
          </a>
        </li>
        <li>
          <a
            href="https://reactjs.org/docs/hooks-reference.html#usememo"
            target="_blank"
          >
            useMemo
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Home;
