## Frontend Technical Test for Connect Group

### Requirements
* [Node.js](https://nodejs.org/en/)(6.x.x)
* Gulp

### Setup Instructions
Clone this repository. Then in command line type.
````
npm install && gulp default

````

Once complete navigation to [http://localhost:9988/](http://localhost:9988/)

### Testing:

In command line type ```` gulp test ````


## Technical test notes:

I made some tweaks to the build/config files:

* Added autoprefixer to the package.json and the SASS task in Gulp, this ensures appropriate browser prefixes are added to CSS (set to previous 2 versions).
* Images were not being served as Express was capturing all requests, added a second static path to the /images directory to allow images to be viewed.
* Since we’re using ES6/Fetch for our getData() method, I added the es6-promise polyfill and isomorphic-fetch to the test file (/test/api.spec.js) in addition to chai-arrays to make testing for arrays/array properties more straightforward. 

Notes on the thinking behind my implementation:

* I’m not entirely clear on how the mobile and desktop designs should be implemented. Mobile seems to use a design with a lot of horizontal space, so instead I have created an extra breakpoint (small > medium > large > xlarge) so on the narrowest mobile devices the content will stack vertically rather than horizontally. On desktop I wasn’t sure if the content should span the width or go wider than the page with a horizontal scroll - I implemented the former, but without documentation, this is the type of question I would usually flag with the designer.
* The data contains a “name” field (under media), I have used this for the vehicle name, however the actual data doesn’t contain vehicle names, just the word “vehicle”. The alternative was to use the ID field, however this doesn’t seem correct, hence my use of the former.
* I’m not sure on the actual fonts and sizes used, therefore I have just used the Google Open Sans font to demonstrate a custom font and guessed at the sizes. Usually I would extract these from the PSD or discuss with the designer in lieu of a style guide, however this information was not available.
* Since the example was setup in React, I have completed the test in the same framework, creating a Vehicle component to display individual vehicle results as children of the VehicleList. Both components make calls to the getData() method, which has been refactored to handle both use cases and to use the Fetch API and promises instead of XMLHttpRequest and callbacks.
* Since CSS transition effects weren’t specified in the creatives, I have added some as examples. Generally this would be something I’d discuss with a designer if there was no written specification.
* Since our getData() method now handles multiple or single vehicle requests in addition to server errors, I have added a test case for each to the test file (/test/api.spec.js).
