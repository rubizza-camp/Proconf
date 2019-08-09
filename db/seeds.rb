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
                            description: row[DESCRIPTION])
end
