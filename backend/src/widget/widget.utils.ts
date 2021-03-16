import { WidgetType } from './widget-type.enum';

export const isSplitWidget = (type: WidgetType) =>
  type === WidgetType.SplitHorizontal || type === WidgetType.SplitVertical;
