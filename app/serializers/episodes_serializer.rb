class EpisodesSerializer < ActiveModel::Serializer
  attributes :id, :title, :date, :description, :video
end
