declare module "react-simple-maps" {
  import { CSSProperties, ReactNode } from "react";

  export interface GeographyFeature {
    rsmKey: string;
    properties: Record<string, unknown>;
    geometry: unknown;
  }

  export interface ComposableMapProps {
    projection?: string;
    projectionConfig?: Record<string, number | [number, number]>;
    width?: number;
    height?: number;
    style?: CSSProperties;
    children?: ReactNode;
  }

  export interface GeographiesProps {
    geography: string | object;
    children: (args: { geographies: GeographyFeature[] }) => ReactNode;
  }

  export interface GeographyProps {
    geography: GeographyFeature;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    style?: {
      default?: CSSProperties;
      hover?: CSSProperties;
      pressed?: CSSProperties;
    };
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    onClick?: () => void;
  }

  export const ComposableMap: React.FC<ComposableMapProps>;
  export const Geographies: React.FC<GeographiesProps>;
  export const Geography: React.FC<GeographyProps>;
}
