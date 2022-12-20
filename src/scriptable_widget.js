// Set the refresh interval for the widget
const refreshInterval = 600

const widget = await createWidget()

// Show the widget
Script.setWidget(widget)
Script.complete()

async function createWidget(items) {
  const data = await refresh()
  const list = new ListWidget()
  list.addText(data)
  list.refreshAfterDate = new Date(Date.now() + refreshInterval)

  return list
}

async function refresh() {
  // Use the Location class to get the current location
  let location = await Location.current()

  // Use the Request class to create a POST request with the location data
  let post_req = new Request('https://fergal.pythonanywhere.com/update_location')
  post_req.method = 'POST'
  post_req.headers = {"Content-Type": "application/json"}
  post_req.body = JSON.stringify({
    "name": "ProfuseGod",
    "latitude": location.latitude,
    "longitude": location.longitude
  })

  // Send the POST request
  let resp = await post_req.loadString()
  console.log(resp)

  // Use the Request class to create a GET request to retrieve the text to display in the widget
  let get_req = new Request('https://fergal.pythonanywhere.com/distance')
  get_req.method = 'GET'

  // Send the GET request and extract the text from the response
  let text = await get_req.loadString()

  return text
}