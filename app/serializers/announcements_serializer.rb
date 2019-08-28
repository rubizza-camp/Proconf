class AnnouncementsSerializer < ActiveModel::Serializer
  attributes :id, :title, :date, :image, :video, :target_resource
end
