export interface RowData {
  city: string;
  country: string;
  id: string;
  postalCode: string;
  streetName: string;
  type: string;
}

export interface ProcessedAddress {
  city?: string;
  country: string;
  id?: string;
  postalCode?: string;
  streetName?: string;
  defaultBilling?: boolean;
  defaultShipping?: boolean;
}

export interface DefaultAddresses {
  billing: boolean;
  shipping: boolean;
}

export interface DefaultAddressesProps {
  id?: string;
  defaultBillingAddressId?: string;
  defaultShippingAddressId?: string;
}

export interface StreetNameParams {
  error: boolean;
  value?: string;
  isValidating?: boolean | undefined;
  isProcessingProps?: boolean | undefined;
  changeReason?: 'debouncedSetEditCellValue' | 'setEditCellValue' | undefined;
}
