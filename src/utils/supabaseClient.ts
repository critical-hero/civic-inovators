import { createClient } from '@supabase/supabase-js';
import { CivicUpdate, User } from '../types';

export const SUPABASE_URL = 'https://gpllirkyqgzwgsndliht.supabase.co';
export const SUPABASE_REST_URL = 'https://gpllirkyqgzwgsndliht.supabase.co/rest/v1';
export const SUPABASE_ANON_KEY = 'sb_publishable_lVj2yjKXigTKW1psHG_GBg_Bnjs_lF9';

// Initialize Supabase Client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export interface OrderRecord {
  id: string;
  order_id?: string;
  customer_name?: string;
  email?: string;
  phone?: string;
  ward?: string;
  city?: string;
  address?: string;
  pincode?: string;
  category?: string;
  description?: string;
  status?: string;
  image_url?: string;
  audio_url?: string;
  department?: string;
  amount?: number;
  items?: Record<string, unknown> | Array<unknown>;
  metadata?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
  [key: string]: unknown;
}

/**
 * Send order/submission record to Supabase
 * Attempts insertion into 'orders', 'civic_orders', and 'submissions' tables
 */
export async function sendOrderToSupabase(orderData: {
  id: string;
  user?: User | null;
  ward: string;
  category: string;
  description: string;
  status: string;
  imageUrl?: string;
  audioUrl?: string;
  amount?: number;
  metadata?: Record<string, unknown>;
}): Promise<{ success: boolean; data?: unknown; error?: string }> {
  const timestamp = new Date().toISOString();

  // Unified payload covering standard order and civic submission schemas
  const payload: OrderRecord = {
    id: orderData.id,
    order_id: orderData.id,
    customer_name: orderData.user?.name || 'Citizen User',
    email: orderData.user?.email || '',
    phone: orderData.user?.phone || '',
    ward: orderData.ward,
    city: orderData.user?.city || 'Bhubaneswar',
    address: orderData.user?.address || '',
    pincode: orderData.user?.pincode || '',
    category: orderData.category,
    description: orderData.description,
    status: orderData.status || 'pending',
    image_url: orderData.imageUrl || null,
    audio_url: orderData.audioUrl || null,
    department: orderData.user?.department || '',
    amount: orderData.amount || 0,
    items: [
      {
        item_id: orderData.id,
        category: orderData.category,
        description: orderData.description,
        ward: orderData.ward,
      },
    ],
    metadata: {
      source: 'civic_innovators_portal',
      submitted_at: timestamp,
      user_role: orderData.user?.role || 'citizen',
      ...orderData.metadata,
    },
    created_at: timestamp,
    updated_at: timestamp,
  };

  const tablesToTry = ['orders', 'civic_orders', 'submissions'];
  let lastError: string | null = null;
  let savedSuccessfully = false;
  let savedData: unknown = null;

  // 1. Try Supabase Client SDK across standard table names
  for (const tableName of tablesToTry) {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .insert([payload])
        .select();

      if (!error) {
        console.log(`[Supabase] Successfully saved order to table '${tableName}':`, data);
        savedSuccessfully = true;
        savedData = data;
        break;
      } else {
        lastError = error.message;
        console.warn(`[Supabase] Note on table '${tableName}':`, error.message);
      }
    } catch (e: unknown) {
      lastError = e instanceof Error ? e.message : String(e);
    }
  }

  // 2. Direct REST API POST fallback to ensure REST/v1 endpoint receives payload
  if (!savedSuccessfully) {
    for (const tableName of tablesToTry) {
      try {
        const restResponse = await fetch(`${SUPABASE_REST_URL}/${tableName}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            Prefer: 'return=representation',
          },
          body: JSON.stringify(payload),
        });

        if (restResponse.ok) {
          const responseJson = await restResponse.json();
          console.log(`[Supabase REST] Sent to ${tableName}:`, responseJson);
          savedSuccessfully = true;
          savedData = responseJson;
          break;
        } else {
          const errorText = await restResponse.text();
          console.warn(`[Supabase REST] ${tableName} status ${restResponse.status}:`, errorText);
          lastError = errorText || `HTTP ${restResponse.status}`;
        }
      } catch (err) {
        console.warn(`[Supabase REST fetch error on ${tableName}]:`, err);
      }
    }
  }

  return {
    success: savedSuccessfully,
    data: savedData,
    error: savedSuccessfully ? undefined : lastError || undefined,
  };
}

/**
 * Fetch orders/submissions from Supabase
 */
export async function fetchOrdersFromSupabase(): Promise<CivicUpdate[]> {
  const tablesToTry = ['orders', 'civic_orders', 'submissions'];

  for (const tableName of tablesToTry) {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && Array.isArray(data) && data.length > 0) {
        return data.map((item: Record<string, unknown>) => ({
          id: String(item.id || item.order_id || `ORD-${Date.now()}`),
          ward: String(item.ward || 'Ward 1'),
          category: String(item.category || 'General'),
          description: String(item.description || ''),
          timestamp: item.created_at ? new Date(String(item.created_at)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recently',
          status: (item.status as CivicUpdate['status']) || 'pending',
          likes: typeof item.likes === 'number' ? item.likes : 0,
          authorName: String(item.customer_name || item.author_name || 'Citizen'),
          imageUrl: typeof item.image_url === 'string' ? item.image_url : undefined,
          audioUrl: typeof item.audio_url === 'string' ? item.audio_url : undefined,
        }));
      }
    } catch {
      // Continue to next table
    }
  }

  return [];
}
