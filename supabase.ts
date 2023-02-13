export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
      }
      sentences: {
        Row: {
          correct_text: string | null
          created_at: string | null
          id: number
          incorrect_text: string | null
          index: Json[] | null
          is_checked: boolean
          user_id: string | null
        }
        Insert: {
          correct_text?: string | null
          created_at?: string | null
          id?: number
          incorrect_text?: string | null
          index?: Json[] | null
          is_checked?: boolean
          user_id?: string | null
        }
        Update: {
          correct_text?: string | null
          created_at?: string | null
          id?: number
          incorrect_text?: string | null
          index?: Json[] | null
          is_checked?: boolean
          user_id?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      insert_sentences_from_supabase: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      sen: {
        Args: Record<PropertyKey, never>
        Returns: {
          correct_text: string | null
          created_at: string | null
          id: number
          incorrect_text: string | null
          index: Json[] | null
          is_checked: boolean
          user_id: string | null
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
