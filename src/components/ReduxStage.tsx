import * as React from "react";
import { Stage } from "react-konva";
import { Provider, ReactReduxContext } from "react-redux";

type StageProps = typeof Stage extends React.ComponentType<infer P> ? P : never;

export type ReduxStageProps = StageProps & {
  children: React.ReactNode;
};

const ReduxStage = ({ children, ...props }: ReduxStageProps) => (
  <ReactReduxContext.Consumer>
    {({ store }) => (
      <Stage {...props}>
        <Provider store={store}>{children}</Provider>
      </Stage>
    )}
  </ReactReduxContext.Consumer>
);

export default ReduxStage;
