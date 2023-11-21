import { User } from '@supabase/supabase-js';
import { Database } from './types/supabase';

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]

type Row<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
type InsertDto<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
type UpdateDto<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];

export type SessionType = Row<'sessions'>
export type SessionInsertDto = InsertDto<'sessions'>
export type SessionUpdateDto = UpdateDto<'sessions'>

export type TicketType = Row<'tickets'>
export type TicketInsertDto = InsertDto<'tickets'>
export type TicketUpdateDto = UpdateDto<'tickets'>

export type UserType = User

export type VoteType = Row<'votes'>
export type VoteInsertDto = InsertDto<'votes'>
export type VoteUpdateDto = UpdateDto<'votes'>

export type ProfileType = Row<'profiles'>
export type ProfileInsertDto = InsertDto<'profiles'>
export type ProfileUpdateDto = UpdateDto<'profiles'>

export type AccountDeletionRequestType = Row<'user_deletion_requests'>
export type AccountDeletionRequestInsertDto = InsertDto<'user_deletion_requests'>
export type AccountDeletionRequestUpdateDto = UpdateDto<'user_deletion_requests'>


