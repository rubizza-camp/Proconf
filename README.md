# Proconf
This project is a Web-app for the existing YourTube podcast channel Proconf.
It has an Admin dashboard and the users side. Admin can create announces to have
future podcasts displayed on the site and send notifications to social networks connected. 
Before Youtube broadcasting begins, admin creates podcast itself (on web-site). When the podcast is on,
speakers are marking topics in Trello. Based on this, timecodes are generated automatically.
After the broadcast is over, app downloads the video, takes audio form it, edit it according to the time codes, 
and then uploads an audio to the Soundcloud. Then users can watch, listen and comment the podcast at the web-site.

## Architecture and models

Here are the main tables: Releases, Announcements, Users and Authors (speakers).
Users (we'll use devise) are mostly for the admin purposes, because comments are going to be implemented via Remark 42.
Integration with trello, youtube and soundcloud API's are planned.
Database is postgress, CSS framework is bootstrap. We have React imbedded with webpack.

## Development
For now, app can be ran like an ordinary rails app:

- git clone
- bundle
- rails db:create
- rails db:migrate





