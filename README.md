# DirectoryAndMovieTask

Clone this Repo into your local device.

For Directory Listing:
1) cd into `DirectoryTask` from your editor
2) `node DirectoryTask.js`
3) Provide a valid directory path to see the subdirectories and files inside it in order.

For Movies Calendar:
1) `cd` into `MovieTask`
2) `cd` into `server`
3) `npm install`
4) `npm start`
5) check `localhost:5000/api/shows` from your browser to view the api response containing movies' nowshowing infos.
6) `cd` into `frontend`
7) `npm install`
8) `npm start`
9) go to `localhost:3000/shows` from your browser to view the movies calendar; `react-big-calendar` is used for this purpose.
Thank you for your time!

#P.S.: The provided `api` only had start time of the movie and no duration or end time and the `react-big-calendar` requires an `end time` for the `event` as well. So, I had to make some approximations (movie duration as 3 hrs) when the `end time` of a movie couldn’t be set as `start time` of the next movie.
