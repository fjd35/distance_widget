#!/usr/bin/env bash

# Get the current location
location=$(termux-location -p)

# Create a JSON object from the location data
json=$(jq -n --arg loc "$location" '{"location": $loc}')

# Send a POST request with the JSON object
curl -X POST \
  -H "Content-Type: application/json" \
  -d "$json" \
  http://your-server/location
