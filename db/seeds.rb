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

CSV.foreach(File.realpath('db/data/episodes.csv')) do |row|
  Episode.find_or_create_by(title: row[TITLE],
                            date: row[DATE],
                            video: row[VIDEO],
                            description: row[DESCRIPTION])
end

Episode.all.each { |episode| episode.authors << Author.all }
Episode.all.each { |episode| episode.guests << Guest.all }
Episode.all.each do |episode|
  episode.sponsor = Sponsor.all.sample
  episode.save
end

Role.create(name: 'admin')

User.create(
  email: 'superadmin@gmail.com',
  role: Role.first,
  password: '123456'
)
