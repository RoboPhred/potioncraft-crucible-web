import * as React from "react";

import { EntityPrototype } from "../types";

import styles from "../EntitiesWindow.module.css";

import DraggableEntity from "./DraggableEntity";

export interface EntityCategoryProps {
  categoryName: string;
  entities: EntityPrototype[];
}

const EntityCategory = ({ categoryName, entities }: EntityCategoryProps) => {
  return (
    <>
      <li className={styles["entity-category"]}>{categoryName}</li>
      {entities.map((entity, i) => (
        <DraggableEntity key={i} entity={entity} />
      ))}
    </>
  );
};

export default EntityCategory;
