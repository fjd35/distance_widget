import math
import time

# Set the amplitude of the sine wave (the number of asterisks to use)
amplitude = 100

# Set the period of the sine wave (the number of values between each peak)
period = 100

# Set the speed of the sine wave (the delay between each value, in seconds)
speed = 0.1

# Initialize the value counter
i = 0

# Print the sine wave indefinitely
while True:
  # Calculate the sine value
  value = amplitude * math.sin(2 * math.pi * i / period)
  
  # Round the value to the nearest integer
  value = round(value)
  
  # Print the asterisks
  print("*" * abs(value))
  
  # Increment the value counter
  i += 1
  
  # Sleep for the specified amount of time
  time.sleep(speed)
