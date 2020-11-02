# FriendInMeow

API List:

Cat Breeds: https://thecatapi.com/
Cat Breed Images: https://thecatapi.com/
Random Cat Images: https://thecatapi.com/
Adoptable Pets: https://www.petfinder.com/
Adoptable Pet Organizations: https://www.petfinder.com/
Google Maps: https://developers.google.com/maps/documentation/javascript/adding-a-google-map
Geocoding API: https://developers.google.com/maps/documentation/geocoding/overview
Reverse Geocoding API: https://developers.google.com/maps/documentation/geocoding/overview

Back-end:
Your project must use a non-trivial Rails backend. Consult the following list for examples of things to include. You do not need to include all of these things, and the final decision of what must be included will be up to your project managers.

[x] Auth
[ ] Tests
[ ] Multiple has_many_through relationships
[ ] Seeds from a complex data set
[x] Custom routes
[x] Custom controller/model methods
[ ] Basic database query optimizations
[ ] Background jobs for slow actions
[ ] Sockets or email integration
[x] One significant refactor
[x] Validation

Front-end
Your product must use a React based frontend. Consult the following list for examples of things to include. You do not need to include all of these things, and the final decision of what must be included will be up to your project manager.

[x] Auth
[ ] Tests
[x] Interacting with a complex API
[x] Redux
[x] Custom CSS
[x] One significant refactor

DB Tables:

/users
/cats

User: {
	username: string
	name: string
	email: string
	password_digest: text
	password_confirmation: text
}

Cat: {
	name: string
	petfinder_id: string
    user_id: integer
}

Client-Side Routes:

/signup
/login
/profile
/breeds
/adoptable
/favorites

User Stories:

Sign up for an account
Log in with your account
Edit account info/credentials
Get information about all cat breeds
See all cat breeds that are available to adopt
Search/Filter cats by certain traits
See all adoptable cats from your chosen breed
See the location/organization of the current cat in your search on a google map
Add/remove cats to your favorites
Infinite scrolling cat image feed



