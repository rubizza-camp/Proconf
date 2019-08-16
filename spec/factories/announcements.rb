FactoryBot.define do
  factory :announcement do
    title { 'test title' }
    date { Time.now.utc }
    target_resource { 'telegram' }
  end
end
