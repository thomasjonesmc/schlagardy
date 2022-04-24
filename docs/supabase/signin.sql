-- Passing Metadata to the signup function using the optional data object
-- https://supabase.com/docs/reference/javascript/auth-signup

-- Creating a trigger to auto insert into profiles on signup
-- https://supabase.com/docs/guides/auth/managing-user-data

-- Where I found you can access metadata JSON keys in the trigger function
-- https://dev.to/sruhleder/creating-user-profiles-on-sign-up-in-supabase-5037


-- update the value of profiles last_sign_in_at to match auth.users
create function public.update_profile_for_user() 
returns trigger 
language plpgsql 
security definer set search_path = public
as $$
begin
    update public.profiles
        set last_sign_in_at = new.last_sign_in_at
        where id = new.id;

    return new;
end;
$$;

-- when the value of last_sign_in_at changes in auth.users, reflect changes in profiles table
create trigger on_auth_user_updated
  after update of last_sign_in_at on auth.users
  for each row execute procedure public.update_profile_for_user();


-- drop the above
DROP TRIGGER on_auth_user_updated ON auth.users;
DROP FUNCTION public.update_profile_for_user;