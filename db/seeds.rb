# frozen_string_literal: true

require 'csv'

TITLE = 0
DATE = 1
VIDEO = 2
DESCRIPTION = 3

CSV.foreach(File.realpath('db/data/episodes.csv')) do |row|
  Episode.find_or_create_by(title: row[TITLE],
                            date: row[DATE],
                            video: row[VIDEO],
                            description: row[DESCRIPTION],
                            broadcast_begin: Time.parse('12-12-2019 13:05').utc)
end

Episode.all.each do |episode|
  CSV.foreach(File.realpath('db/data/timecodes.csv')) do |row|
    episode.timecodes.find_or_create_by(title: row[TITLE],
                                        time: Time.parse(row[DATE]).utc)
  end
end

Role.create(name: 'admin')

User.create(
  email: 'superadmin@gmail.com',
  role: Role.first,
  password: ENV['ADMIN_PASSWORD']
)
