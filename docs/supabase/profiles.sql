-- Passing Metadata to the signup function using the optional data object
-- https://supabase.com/docs/reference/javascript/auth-signup

-- Creating a trigger to auto insert into profiles on signup
-- https://supabase.com/docs/guides/auth/managing-user-data

-- Where I found you can access metadata JSON keys in the trigger function
-- https://dev.to/sruhleder/creating-user-profiles-on-sign-up-in-supabase-5037


-- inserts a row into public.users
create function public.create_profile_for_new_user() 
returns trigger 
language plpgsql 
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, username, display_name)
  values (
        new.id,
        new.raw_user_meta_data ->> 'username',
        new.raw_user_meta_data ->> 'displayName'
    );
  return new;
end;
$$;


-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.create_profile_for_new_user();


-- drop the above
DROP TRIGGER on_auth_user_created ON auth.users;
DROP FUNCTION public.create_profile_for_new_user;