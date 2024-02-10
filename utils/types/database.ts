export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          edit_count: number
          email: string | null
          full_name: string | null
          id: string
          is_admin: boolean
          updated_at: string | null
        }
        Insert: {
          edit_count?: number
          email?: string | null
          full_name?: string | null
          id: string
          is_admin?: boolean
          updated_at?: string | null
        }
        Update: {
          edit_count?: number
          email?: string | null
          full_name?: string | null
          id?: string
          is_admin?: boolean
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      sentences: {
        Row: {
          correct_text: string | null
          created_at: string | null
          email: string | null
          id: number
          incorrect_text: string | null
          index: Json[] | null
          is_checked: boolean
        }
        Insert: {
          correct_text?: string | null
          created_at?: string | null
          email?: string | null
          id?: number
          incorrect_text?: string | null
          index?: Json[] | null
          is_checked?: boolean
        }
        Update: {
          correct_text?: string | null
          created_at?: string | null
          email?: string | null
          id?: number
          incorrect_text?: string | null
          index?: Json[] | null
          is_checked?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "sentences_email_fkey"
            columns: ["email"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["email"]
          }
        ]
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
      select_random: {
        Args: Record<PropertyKey, never>
        Returns: {
          correct_text: string | null
          created_at: string | null
          email: string | null
          id: number
          incorrect_text: string | null
          index: Json[] | null
          is_checked: boolean
        }[]
      }
      sen: {
        Args: Record<PropertyKey, never>
        Returns: {
          correct_text: string | null
          created_at: string | null
          email: string | null
          id: number
          incorrect_text: string | null
          index: Json[] | null
          is_checked: boolean
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
