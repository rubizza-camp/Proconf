module People
  class PeopleSerializer < ActiveModel::Serializer
    attributes :id, :full_name

    def full_name
      [object.name, object.surname].join(' ')
    end
  end
end
