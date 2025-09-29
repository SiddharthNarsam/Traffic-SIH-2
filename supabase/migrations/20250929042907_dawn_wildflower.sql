/*
  # Role-Based Access Control System for Traffic Management

  1. New Tables
    - Update profiles table with role and assigned intersections
    - Add intersection assignments for traffic officers
    
  2. Security
    - Update RLS policies for role-based access
    - Add policies for intersection assignments
    
  3. Functions
    - Update user creation function to handle roles
*/

-- Update profiles table to include role and intersection assignments
DO $$
BEGIN
  -- Add role column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'role'
  ) THEN
    ALTER TABLE profiles ADD COLUMN role TEXT DEFAULT 'citizen' CHECK (role IN ('admin', 'traffic_officer', 'emergency', 'citizen'));
  END IF;
  
  -- Add assigned_intersections column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'assigned_intersections'
  ) THEN
    ALTER TABLE profiles ADD COLUMN assigned_intersections INTEGER[];
  END IF;
END $$;

-- Update the handle_new_user function to include role from metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data ->> 'role', 'citizen')::TEXT
  );
  RETURN NEW;
END;
$$;

-- Create function to assign intersections to traffic officers
CREATE OR REPLACE FUNCTION public.assign_intersections_to_officer(
  officer_id UUID,
  intersection_ids INTEGER[]
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Only admins can assign intersections
  IF NOT EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() AND role = 'admin'
  ) THEN
    RAISE EXCEPTION 'Only administrators can assign intersections';
  END IF;
  
  -- Update the officer's assigned intersections
  UPDATE profiles 
  SET assigned_intersections = intersection_ids
  WHERE user_id = officer_id AND role = 'traffic_officer';
END;
$$;

-- Add RLS policy for admins to manage all profiles
CREATE POLICY "Admins can manage all profiles"
ON public.profiles
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Add RLS policy for traffic officers to view their assigned data
CREATE POLICY "Traffic officers can view assigned intersection data"
ON public.profiles
FOR SELECT
USING (
  auth.uid() = user_id OR
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() AND role IN ('admin', 'traffic_officer')
  )
);