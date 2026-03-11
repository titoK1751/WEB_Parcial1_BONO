import { fetcher } from "@/shared/services/http";


export type Property = {
  propertyName: string;
  city: string;
  price: string; 
  garage: boolean;
  rooms: number;
  baths: number;
  latitute: number; 
  longitude: number;
  fullName: string;
  address: string;
  phone: string;
  email: string;
  floor: number;
};

export async function getProperties(): Promise<Property[]> {
  try {
    const result = await fetcher<Property[]>();
    console.log('[getProperties] Result:', result);
    if (!result) {
      console.warn('[getProperties] fetcher returned undefined, returning empty array');
      return [];
    }
    if (!Array.isArray(result)) {
      console.warn('[getProperties] Result is not an array:', result);
      return [];
    }
    return result;
  } catch (e) {
    console.error('[getProperties] Error:', e);
    throw e;
  }
}

export async function getPropertyById(id: number): Promise<Property | undefined> {
  const properties = await getProperties();
  return properties[id];
}

