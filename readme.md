# Sports Venue Finder
### How it looks:
<!-- ![alt text](./images/websitemockup.jpeg) -->
![alt text](data/mockup/laptop.PNG)
![alt text](data/mockup/smartphone.png)

# URL to live website
[https://clever-gingersnap-87da92.netlify.app/](https://clever-gingersnap-87da92.netlify.app/)
# Summary
### Project One-Liner 
This is a map application meant for users to easily find sports facilities and closeby points of interest in a general location. It displays information on mainly ActiveSG and football/futsal facilities.

### Context and Justification
There is no comprehensive place where Singaporeans can find a consolidated display of sports facilities near them. 

For example, the ActiveSG does not have a map integrated into their application nor is there a location search function (there is only a 'near me' function which uses the device location). In addition to this, there are several companies which offer futsal and football facilities in Singapore at the same time having no comprehensive list of all their locations. Hence, at the current moment it is troublesome for Singaporeans to browse and find facilities they may use in a specific region in Singapore. 

This map app aims to fill this gap, allowing users to search and filter ActiveSG and futsal facilities in a specific region, using the map to give them a good idea of what is on offer in that area. 

# 5 Planes of Design 
## Target audience group:
### Singaporeans who want to get into sports but do not know where to start/ find facilities.
**Age:** 13 onwards 

**Fitness level:** Any

**IT Literacy Level:** Able to use smartphone/ computer and basic applications such as Google maps

**Goals:** 
Finding sports facilities and getting information about it easily. 

**Considerations:**
Users need to know basic information such as the facilities on offer, and any links which can be used for booking/ finding more information. 

### Singaporeans who are into football who wish to find facilities around the country
**Age:** 13 onwards

**Fitness level:** Any

**IT Literacy Level:** Able to use smartphone/ computer and basic applications such as Google maps

**Goals:**
Finding futsal/ football facilities which they may have been unaware of previously. 

**Considerations:**
Users need to know what courts are on offer (ie 5 a side, 11 a side) and the booking page of the facility. 

### Singaporeans who wish to find ActiveSG facilities on a map
**Age:** 13 onwards 

**Fitness level:** Any

**IT Literacy Level:** Able to use smartphone/ computer and basic applications such as Google maps

**Goals:**
Finding ActiveSG facilities which they may have been unaware of previously. 

**Considerations:**
Users need to know what facilities each venue offers.

## Content & Features:

### Webpages

- ### Landing Tab
The web app is a single page application with 2 tabs. The landing page contains an input field for the user to enter their address to begin using the app. Upon entering a valid address and submitting, the user will redirected to the map tab.

- ### Map Tab
The map tab contains the functionality of the app. Upon entering the map tab, a house icon will be displayed corresponding with the address entered on the landing tab. 

**Bottom Widget Section**
The bottom section of the screen displays useful information of the vicinity such as nearby points of interest (like supermarkets and the nearest carpark) as well as weather information. 

**Top Navbar and Control Layer**
The top of the tab has a search bar where users can search for locations in Singapore (such as Hougang, Serangoon MRT, etc), the map will jump to the location entered by the user. Below the navbar is the control layer toggle, users can toggle markers on the map on and off (ActiveSG facilities are toggled on by default). Users may use the tab to navigate back to the landing tab to enter a new starting address.

**Map Itself**
Sport facility markers display key information such as the location, postal code, and facilities offered by the venue. Sport facility markers also contain links which lead to the booking page of the facility as well as a directions button. The directions button creates a route from the user's entered home address to the location as well as updates the bottom widget section to the destination location. The map also contains transportation markers showing MRT, LRT, bus stops, and carparks. Carpark markers also contain the directions feature. 

## Design

### Wireframe

No wireframe was used.

### Colors

The choice of color was based on primarily darker shades of green, resembling fields for sports.

### Fonts

Bootstrap standard font was used in the website, save for the title at the landing page. 


### API Endpoints
Map Tile Layer/ Routing Machine/ Geocoder: 

https://api.mapbox.com/

Geocoder (for widget section):

https://api.foursquare.com/v3/places/

Weather:

https://api.openweathermap.org/data/2.5/

Bus Stops (API parsed with postman and datapoints added to JSON file):

http://datamall2.mytransport.sg/ltaodataservice/BusStops/ 

### JSON Files
ActiveSG GeoJson: https://data.gov.sg/dataset/sportsg-sport-facilities?resource_id=df7698b8-ec88-4508-a2de-63b4d19cb13c

HDB Carpark Information JSON (CSV file converted to JSON via an online converter, then run through mapbox to obtain coordinates): https://data.gov.sg/dataset/hdb-carpark-information

Bus Stops JSON (API parsed with postman and datapoints added to JSON file): http://datamall2.mytransport.sg/ltaodataservice/BusStops/

MRT Stations JSON (CSV file converted to JSON via an online converter): https://data.world/hxchua/train-stations-in-singapore/workspace/file?filename=mrtsg.csv/

The Ark JSON (JSON file created by me with information from their website and coordinates from Google maps): https://theark.sg/

Other Futsal JSON (JSON file created by me with information from their respective websites and coordinates from Google maps): https://www.thearenasg.com/, https://www.thecage.com.sg/, https://www.skyparkarena.com/, http://www.ubersports.com.sg/





## Technologies used on the map app
- HTML5
- CSS3
- JavaScript
- Bootstrap v5.0
- Leaflet
- Leaflet Market Clustering
- Leaflet Grouped Overlay
- Leaflet Routing Machine
- Netlify
- Axios

## Technologies used in production
- Gitpod
- Git
- GitHub


# TEST CASES
| #  | Description | Steps | Expected|
| ------------- | ------------- | ------------- | ------------- |
||At Home Tab |At Home Tab|At Home Tab|
| 1 | Home Address entered must not be shorter than 3 characters | Try finding address with  1, and 2 character string | Tab does not switch to map, error message displayed |
| 2 | Postal Code entered must be 6 digit number | Try different number of digits, mix of digits and other characters | Tab does not switch to map, error message displayed |
| 3 | Home Address must be entered | Try finding address with no characters entered  | Tab does not switch to map, error message displayed |
| 4 | Address must be valid and be found on Mapbox | Try finding address with random string of characters | Tab does not switch to map, error message displayed |
| 5 | Must not be able to switch to map tab without first entering an address | Try clicking on map tab button | Tab does not switch to map, error message displayed |
| 6 | Find my address button should read input and bring user to map tab when valid address is entered | Try searching with an address in Singapore | Tab switches to map, home icon pops up, bottom widgets are populated with information |
| 7 | Type of address selector works | Try finding empty or invalid address | Different error message appears with different type selected | 

||On Map|On Map|On Map|
| 1 | Map must load  | Load Site, tab to map and wait for map to appear | Map appears |
| 2 | Map must not be able to pan too far out of Singapore  | Try to pan out of Singapore | Map bounces back within boundaries  |
| 3 | Map must not be able to zoom too far out | Try to zoom very far out  | Zoom capped at certain level |
| 4 | Location search must work | Type in different addresses | map should jump to the general location |
| 5 | Bottom Widgets must work | Check if widgets are populated | widgets are populated |
| 6 | Group Overlay must work | Check if all groups of markers can be toggled on and off, and on simultaneously | Markers should appear and disappear from map  |
| 7 | Routing Machine must work | Check if "Take me there!" on ActiveSG, all football markers, and HDB Carpark markers create a route and update bottom widgets | New route replaces old route, bottom widgets are updated  |
| 8 | Markers must have all information | Check if markers have address, and details, clicking "booking" on markers should take user to booking website | User brought to booking website |
| 9 | Remove Route button works  | Check if remove route button removes existing route from map | Route removed |


# Deployment
Hosted on Netlify free plan, without database. All dependencies are delivered via CDN. 
To deploy, fork this code, link your Github account with netlify, and make this repo a site. 

# Dependencies
- Bootstrap v5.0
- Leaflet
- Leaflet Marker Clustering
- Leaflet Grouped Overlay
- Leaflet Routing Machine
- Axios

# Sources
- MRT General Icon: https://www.businesstraveller.com/business-travel/2018/01/09/changi-airport-mrt-station-experience-disruptions/
- MRT Colored Icons: https://ourhound.com/transportations-tips-travelling-around-singapore/
- LRT Icon: https://iconape.com/singapore-lrt-logo-logo-icon-svg-png.html/
- ActiveSG Icon: https://www.myactivesg.com/
- theArk Icon: https://theark.sg/
- theCage Icon: https://www.thecage.com.sg/
- UberSports Icon: http://www.ubersports.com.sg/
- SkyParkArena Icon: https://www.skyparkarena.com/
- Directions Icon: https://www.freeiconspng.com/img/4698/
- Badge/ Favicon Icon: https://www.freepnglogos.com/images/sport-35492.html/
- Bus Stop Icon: https://icon-library.com/icon/google-maps-bus-icon-14.html/
- Bus Icon: https://www.freeiconspng.com/img/12983/
- Home Icon: https://www.clipartmax.com/middle/m2i8H7G6A0N4m2i8_white-home-5-icon-vector-png-logo-home/
- Weather Icons: https://www.flaticon.com/free-icons/weather/
- Landing Tab Background - https://www.pexels.com/photo/multicolored-soccer-ball-on-green-field-47730/
- Distance Calculator (JS Function) - https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula




# CREDITS AND ACKNOWLEDGMENT
- Gitpod
- Git
- GitHub
- Netlify
- HTML5
- CSS3
- JavaScript
- Bootstrap v5.0
- Leaflet
- Leaflet Marker Clustering
- Leaflet Grouped Overlay
- Axios
- Last but not least, Trent Global College and their excellent teacher, Paul.
