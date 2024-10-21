# Victoria Plumbing Tech Test

## Tech Stack

 - React-Vite (Typescript)
 - React Query/Tanstack
 - React-Intersection-Observer
 - Framer Motion
 - React Router 
 - Use-Query-Params
 - Zod

## Development process
Having taken a look at the brief and documentation provided, my first thought was to check the provided endpoint for common URL paths that would point me towards a publicly exposed schema file (such as swagger.json etc). 

Unfortunately I wasn't able to find one and ended up running a CURL command to hit the endpoint, and then introspecting the resulting output file with https://quicktype.io/ - which along with some manual restructuring/renaming gave me a TypeScript schema I could work with in my application. 

I decided to use React-Query to handle my interactions with the API, given it's powerful features and configurability, and this in combination with Intersection-Observer allowed me to build infinite scrolling into the product page - leveraging useInfiniteQuery to automatically load new pages as the user is detected to have hit the bottom of the page. I have taken steps to maximise performance here, using react-query's caching features, as well as creating a function to reset the page count when filters change - to reduce the amount of loaded assets.

For state management I chose to store the search parameters in the URL query string rather than internal application state - owing to the advantage it provides in user experience (ie: copying and sharing a refined search page with others), which is especially important in an e-commerce application.

This however presented it's own challenges, as it requires application state - some of which can be rather complex in structure/format to be encoded and subsequently decoded into different formats/shapes for use in both the API request and the UI. I made use of use-query-params and Zod to help with this, and by encapsulating the logic in a custom hook I was able to abstract away most of this complexity and provide a relatively simple interface to the rest of the application to manage state.

To build a pleasing UI/UX experience I used tailwind and framer-motion, leveraging the utility classes of tailwind to build a responsive product page that can scale to varying screen sizes, and the layout animation features of framer-motion to smoothly transition between UI states as the available filters/facets changed.

## Reflection

Having reviewed both the code and the user experience of the application, I can see some clear room for improvement in both aspects. 

In terms of code cleanliness, I think building a component library would significantly cut down on code re-use across components, and perhaps an extension such as tailwind-variants would be best suited, given it's ability to help build modular, configurable components, whilst still maintaining the ease of development and readability that tailwind offers.

Another area I see room for improvement in is the logic surrounding encoding/decoding facets from the query string. In hindsight - given the fact that every facet and option within the API response has a unique identifier, it should be possible to flatten the data into a much more manageable structure for searching/filtering. This would significantly simplify the functions in the hook that assemble the data for the user interface and the query - both of which currently rely on a complex series of nested filter/map/reduce methods to construct their corresponding outputs from the decoded query string. 

In terms of UI/UX - I think performance could still be improved - especially with images, as these make up the bulk of the jarring/unpleasant interactions when using the page. For this using a lazy-loading library for images, or perhaps the React suspense component would be a good solution, so at least a placeholder/skeleton can be displayed until the relevant assets load.
