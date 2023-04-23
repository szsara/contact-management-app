INSERT INTO public.users(
	birthdate, email, mothers_name, name, place_of_birth, ssn, tax_id)
	VALUES ('1990-01-01', 'test@example.com', 'Jane Doe', 'John Doe', 'Budapest', '123-123-123', '123456789');

INSERT INTO public.address(
	building, city, floor, house_number, postal_code, street, user_id)
	VALUES ('A', 'Budapest', 1, 1, '1111', 'Test Street', 1);

INSERT INTO public.user_phone_numbers(
	user_id, phone_numbers)
	VALUES (1, '70-123-4567');