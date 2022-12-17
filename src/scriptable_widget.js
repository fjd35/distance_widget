let widget = new ListWidget()

// Set the refresh interval for the widget
widget.refreshInterval = 600

// Use the Location class to get the current location
let location = await Location.current()

// Use the Request class to create a POST request with the location data
let post_req = new Request('https://fergal.pythonanywhere.com/update_location')
post_req.method = 'POST'
post_req.body = {
  name: "ProfuseGod",
  latitude: location.latitude,
  longitude: location.longitude
}

// Send the POST request
await post_req.loadJSON()

// Use the Request class to create a GET request to retrieve the text to display in the widget
let get_req = new Request('https://fergal.pythonanywhere.com/distance')
get_req.method = 'GET'

// Send the GET request and extract the text from the response
let text = await get_req.loadString()

// Set the text of the widget
widget.title = text

// Show the widget
Script.setWidget(widget)
