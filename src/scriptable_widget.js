let widget = new ListWidget()

// Set the refresh interval for the widget
widget.refreshInterval = 600

// Use the Location class to get the current location
let location = await Location.current()

// Use the Request class to create a POST request with the location data
let req = new Request('http://example.com/post-location')
req.method = 'POST'
req.body = {
  lat: location.latitude,
  lng: location.longitude
}

// Send the POST request
await req.loadJSON()

// Use the Request class to create a GET request to retrieve the text to display in the widget
let req = new Request('http://example.com/get-text')
req.method = 'GET'

// Send the GET request and extract the text from the response
let text = await req.loadString()

// Set the text of the widget
widget.title = text

// Show the widget
Script.setWidget(widget)
