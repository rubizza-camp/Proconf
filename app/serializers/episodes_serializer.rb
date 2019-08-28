class EpisodesSerializer < ActiveModel::Serializer
  attributes :id, :title, :date, :description, :video
  has_many :announcements, embed: :objects
  has_many :timecodes, embed: :objects
end
