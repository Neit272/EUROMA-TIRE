import type { Schema, Struct } from '@strapi/strapi';

export interface ItemMauMa extends Struct.ComponentSchema {
  collectionName: 'components_item_mau_ma';
  info: {
    displayName: 'M\u1EABu m\u00E3';
    icon: 'dashboard';
  };
  attributes: {
    diameter: Schema.Attribute.String;
    inflationPressure: Schema.Attribute.String;
    ply: Schema.Attribute.String;
    sectionWidth: Schema.Attribute.String;
    size: Schema.Attribute.String;
    sku: Schema.Attribute.String;
    treadCount: Schema.Attribute.String;
    treadDepth: Schema.Attribute.String;
    treadWidth: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'item.mau-ma': ItemMauMa;
    }
  }
}
