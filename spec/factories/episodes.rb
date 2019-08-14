FactoryBot.define do
  factory :episode do
    title { 'test title' }
    date { Time.now.utc }
  end
end
