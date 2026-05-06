def generate_deterministic_password(order_number_string: str) -> str:
    # Define character sets designed for readability (avoiding 0/O, 1/L, etc.)
    # C: Consonants (21 chars)
    C = "BCDFGHJKLMNPQRSTVWXYZ"
    # VN: Vowels (A, E, I, O, U) + Readable Numbers (2-9) (13 chars)
    VN = "AEIOU23456789"

    PASSWORD_LENGTH = 8
    password = ""

    # 1. Create a Seed based on all digits (sum of squares for better distribution)
    initial_seed = 0
    for digit in order_number_string:
        initial_seed += int(digit) * int(digit)

    # Pad the order number to ensure we have enough digits to cycle through for the full 8 chars
    padded_order = (order_number_string + order_number_string)[:PASSWORD_LENGTH]

    # Initialize a "seed" that changes with each iteration
    current_seed = initial_seed

    for i in range(PASSWORD_LENGTH):
        # Generate an index based on the current seed, the position (i), and a deterministic offset
        if i % 2 == 0:  # Consonant position
            # Use modulo C.length (21)
            index = (current_seed + i) % len(C)
            password += C[index]
        else:  # Vowel/Number position
            # Use modulo VN.length (13)
            # We add a +1 offset here to ensure C and VN characters are based on slightly different indices
            index = (current_seed + i + 1) % len(VN)
            password += VN[index]

        # Update seed deterministically for the next iteration:
        # 1. Shift by a factor (1664525 is a common PRNG multiplier)
        # 2. Add the next digit from the order number to ensure full dependency on input
        order_digit = int(padded_order[i])
        current_seed = (current_seed * 1664525 + order_digit) % 4294967296

    return password


# Example usage:
if __name__ == "__main__":
    import csv
    
    # Generate passwords for orders from 1000 to 10000
    start_order = 1000
    end_order = 10000
    
    print(f"Generating passwords for orders {start_order} to {end_order}...")
    
    # Write to drowssap.csv
    with open('drowssap.csv', 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        # Write header
        writer.writerow(['Order Number', 'Password'])
        # Write data
        for order_num in range(start_order, end_order + 1):
            order = str(order_num)  # Convert number to string for the password generator
            password = generate_deterministic_password(order)
            writer.writerow([order, password])
            
            # Print progress every 1000 orders
            if order_num % 1000 == 0:
                print(f"Progress: {order_num} orders processed...")
    
    print(f"\nComplete! {end_order - start_order + 1} passwords have been generated")
    print("Results have been saved to drowssap.csv")