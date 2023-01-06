// Set the refresh interval for the widget
const refreshInterval = 60
const cache_file_location = files.joinPath(files.documentsDirectory(), "cached_distance")

const widget = await createWidget()

// Show the widget
Script.setWidget(widget)
Script.complete()

async function createWidget(items) {
  try {
    const data = await refresh()
    cache_data(data)
  } catch (e) {
    console.log(e.message)
    data = get_cached_data()
  }
  const list = new ListWidget()
  let title = list.addText('<3')
  title.centerAlignText()
  title.font = Font.semiBoldSystemFont(15)
  let distance_text = list.addText(parseFloat(data).toFixed(0)+' km')
  distance_text.centerAlignText()
  distance_text.minimumScaleFactor = 0.5
  distance_text.lineLimit = 1
  list.refreshAfterDate = new Date(Date.now() + refreshInterval)

  return list
}

function cache_data(data) {
  files.writeString(cache_file_location, data)
}

function get_cached_data(data) {
  return files.readString(cache_file_location)
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