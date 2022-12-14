#!/usr/bin/env bash

# Get the current location
location=$(termux-location -p gps)

# Create a JSON object from the location data
json=$(jq -n --arg loc "$location" '{"location": $loc}')

echo $json

# Send a POST request with the JSON object
curl -X POST \
  -H "Content-Type: application/json" \
  -d "$json" \
  http://fergal.pythonanywhere.com/update_location
