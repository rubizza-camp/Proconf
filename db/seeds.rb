# frozen_string_literal: true

require 'csv'

NAME = 0
SURNAME = 1

CSV.foreach(File.realpath('db/data/authors.csv')) do |row|
  Author.find_or_create_by(name: row[NAME],
                           surname: row[SURNAME])
end

CSV.foreach(File.realpath('db/data/guests.csv')) do |row|
  Guest.find_or_create_by(name: row[NAME],
                          surname: row[SURNAME])
end

CSV.foreach(File.realpath('db/data/sponsors.csv')) do |row|
  Sponsor.find_or_create_by(name: row[NAME])
end

TITLE = 0
DATE = 1
VIDEO = 2
DESCRIPTION = 3
CONFERENCE_LINK = 4

FINISHED = 'finished'

CSV.foreach(File.realpath('db/data/episodes.csv')) do |row|
  Episode.find_or_create_by(title: row[TITLE],
                            date: row[DATE],
                            video: row[VIDEO],
                            description: row[DESCRIPTION],
                            conference_link: row[CONFERENCE_LINK],
                            status: FINISHED,
                            broadcast_begin: Time.parse('12-12-2019 13:05').utc)
end

Episode.all.each { |episode| episode.authors << Author.all }
Episode.all.each { |episode| episode.guests << Guest.all }
Episode.all.each do |episode|
  episode.sponsors << Sponsor.all.sample
end

Episode.all.each do |episode|
  CSV.foreach(File.realpath('db/data/timecodes.csv')) do |row|
    episode.timecodes.find_or_create_by(title: row[TITLE],
                                        time: Time.parse(row[DATE]).utc)
  end
end

Episode.all.each do |episode|
  CSV.foreach(File.realpath('db/data/timecodes.csv')) do |row|
    episode.timecodes.create(title: row[TITLE],
                             date: row[DATE])
  end
end

Role.find_or_create_by(name: 'admin')

User.create(
  email: 'superadmin@gmail.com',
  role: Role.find_or_create_by(name: 'admin'),
  password: ENV['ADMIN_PASSWORD']
)
