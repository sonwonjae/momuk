export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      assembles: {
        Row: {
          createdAt: string;
          id: string;
          title: string;
          updatedAt: string;
        };
        Insert: {
          createdAt?: string;
          id?: string;
          title?: string;
          updatedAt?: string;
        };
        Update: {
          createdAt?: string;
          id?: string;
          title?: string;
          updatedAt?: string;
        };
        Relationships: [];
      };
      auth_tokens: {
        Row: {
          accessToken: string;
          accessTokenExpires: string;
          id: string;
          refreshToken: string;
          refreshTokenExpires: string;
          userId: string;
        };
        Insert: {
          accessToken?: string;
          accessTokenExpires?: string;
          id?: string;
          refreshToken?: string;
          refreshTokenExpires?: string;
          userId: string;
        };
        Update: {
          accessToken?: string;
          accessTokenExpires?: string;
          id?: string;
          refreshToken?: string;
          refreshTokenExpires?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'auth_tokens_userid_fkey';
            columns: ['userId'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      user_assembles: {
        Row: {
          assembleId: string;
          permission: Database['public']['Enums']['permission'];
          userId: string;
        };
        Insert: {
          assembleId?: string;
          permission?: Database['public']['Enums']['permission'];
          userId?: string;
        };
        Update: {
          assembleId?: string;
          permission?: Database['public']['Enums']['permission'];
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'user_assembles_assembleId_fkey';
            columns: ['assembleId'];
            isOneToOne: false;
            referencedRelation: 'assembles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'user_assembles_userId_fkey';
            columns: ['userId'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      users: {
        Row: {
          avatarUrl: string;
          createdAt: string;
          email: string;
          id: string;
          name: string;
          provider: Database['public']['Enums']['provider'] | null;
          providerId: string;
          updatedAt: string;
        };
        Insert: {
          avatarUrl?: string;
          createdAt?: string;
          email?: string;
          id?: string;
          name?: string;
          provider?: Database['public']['Enums']['provider'] | null;
          providerId?: string;
          updatedAt?: string;
        };
        Update: {
          avatarUrl?: string;
          createdAt?: string;
          email?: string;
          id?: string;
          name?: string;
          provider?: Database['public']['Enums']['provider'] | null;
          providerId?: string;
          updatedAt?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      permission: 'owner' | 'member';
      provider: 'kakao';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;
