class EpisodesSerializer < ActiveModel::Serializer
  attributes :id, :title, :date, :description, :video, :status, :actual_start, :actual_finish
  has_many :announcements, serializer: AnnouncementsSerializer, embed: :objects
  has_many :timecodes, serializer: TimecodesSerializer, embed: :objects
  has_many :authors, serializer: People::AuthorsSerializer, embed: :objects
  has_many :guests, serializer: People::GuestsSerializer, embed: :objects
  has_many :sponsors, serializer: SponsorsSerializer, embed: :objects
end
