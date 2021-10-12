const oil = require("./oil.json");
const water = require("./water.json");

export const TemplatesByName = {
  oil,
  water,
};

export type TemplateName = keyof typeof TemplatesByName;
