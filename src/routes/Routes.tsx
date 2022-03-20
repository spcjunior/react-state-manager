import { Route, Routes } from "react-router-dom";
import { ContextApi } from "../app/chatMessage-context-api";
import { PropDrilling } from "../app/chatMessage-props-drilling";
import { PropDrilling as PropDrillingOptimized } from "../app/chatMessage-props-drilling-optimized";
import { ReduxToolkit } from "../app/chatMessage-redux-toolkit";
import { Zustand } from "../app/chatMessage-zustand";
import LifeCycle from "../app/lifecycle";
import Home from "../app/pages/Home";
import Layout from "../layout";

export enum RoutesEnum {
  Home = "/",
  PropsDrilling = "/props-drilling",
  ContextApi = "/context-api",
  Zustand = "/zustand-state-manager",
  ReduxToolkit = "/reduxtoolkit-state-manager",
  OptimizingRender = "/props-drilling-optimized",
  Lifecycle = "/lifecycle",
}

export interface IRoute {
  key: string;
  value: string;
}

export const RoutesList: IRoute[] = Object.entries(RoutesEnum).map(
  ([key, value]) => ({ key, value })
);

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={RoutesEnum.PropsDrilling} element={<PropDrilling />} />
        <Route path={RoutesEnum.ContextApi} element={<ContextApi />} />
        <Route path={RoutesEnum.Zustand} element={<Zustand />} />
        <Route path={RoutesEnum.ReduxToolkit} element={<ReduxToolkit />} />
        <Route
          path={RoutesEnum.OptimizingRender}
          element={<PropDrillingOptimized />}
        />
        <Route path={RoutesEnum.Lifecycle} element={<LifeCycle />} />
      </Route>
      <Route path="*" element={<div>NotFound!</div>} />
    </Routes>
  );
}
