FactoryBot.define do
  title_array = %w[Title_1 Title_2 Title_3]
  target_resource_array = %w[telegram twitter]

  factory :announcement do
    title { title_array.sample }
    date { Time.now.utc }
    target_resource { target_resource_array.sample }
  end
end
