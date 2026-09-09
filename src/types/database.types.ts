/**
 * Tipos do schema do Postgres (Supabase).
 *
 * Este arquivo espelha as migrations em `supabase/migrations/`. O ideal é
 * gerá-lo automaticamente quando houver acesso ao projeto:
 *
 *   npm run db:types      # supabase gen types typescript --linked
 *
 * (requer `supabase login` + `supabase link`, ou Docker para `--local`.)
 * Enquanto isso não está configurado, mantenha-o em sincronia com o SQL à mão.
 */

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
          id: string
          name: string
          email: string
        }
        Insert: {
          id: string
          name: string
          email: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
        }
        Relationships: [
          {
            foreignKeyName: 'profiles_id_fkey'
            columns: ['id']
            isOneToOne: true
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      babies: {
        Row: {
          id: string
          user_id: string
          name: string
          nickname: string | null
          birth_date: string
          photo_url: string | null
          shared_with: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          nickname?: string | null
          birth_date: string
          photo_url?: string | null
          shared_with?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          nickname?: string | null
          birth_date?: string
          photo_url?: string | null
          shared_with?: string[]
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'babies_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      baby_milestones: {
        Row: {
          id: string
          baby_id: string
          title: string
          description: string | null
          event_date: string | null
          is_hidden: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          baby_id: string
          title: string
          description?: string | null
          event_date?: string | null
          is_hidden?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          baby_id?: string
          title?: string
          description?: string | null
          event_date?: string | null
          is_hidden?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'baby_milestones_baby_id_fkey'
            columns: ['baby_id']
            isOneToOne: false
            referencedRelation: 'babies'
            referencedColumns: ['id']
          },
        ]
      }
      photos: {
        Row: {
          id: string
          milestone_id: string
          storage_path: string
          tags: string[]
          media_type: string
          poster_path: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          milestone_id: string
          storage_path: string
          tags?: string[]
          media_type?: string
          poster_path?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          milestone_id?: string
          storage_path?: string
          tags?: string[]
          media_type?: string
          poster_path?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'photos_milestone_id_fkey'
            columns: ['milestone_id']
            isOneToOne: false
            referencedRelation: 'baby_milestones'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_public_baby: {
        Args: { p_baby_id: string }
        Returns: Database['public']['Tables']['babies']['Row'][]
      }
      get_public_milestones: {
        Args: { p_baby_id: string }
        Returns: Database['public']['Tables']['baby_milestones']['Row'][]
      }
      get_public_photos: {
        Args: { p_milestone_ids: string[] }
        Returns: Database['public']['Tables']['photos']['Row'][]
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
